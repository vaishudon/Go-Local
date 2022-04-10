from flask import Flask, render_template
from flask import jsonify
from flask import request

from bs4 import BeautifulSoup
import requests

app = Flask(__name__)

# Display landing page for extension
@app.route("/")
def index():
    return render_template('popup.html')

# Scrapes Etsy to retrieve specific products from sellers that fall in the
# provided geocode region. Although this function currently only searches
# for local business owners on Etsy, ideally we would search the whole web
# with a similar goal in mind. Information retrieved from each product include
# its name, price, seller and rating.
@app.route("/retrieve")
def retrieve():
  # get arguments
  item = request.args.get('product')
  code = request.args.get('locationQuery')

  headers = {'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9'}
  url = 'https://www.etsy.com/search?q=' + item + '&locationQuery=' + code

  # make request to etsy and get back html to parse
  response=requests.get(url,headers=headers)
  soup=BeautifulSoup(response.content,'lxml')

  products = {}

  for item in soup.select('.wt-grid__item-xs-6'):
    try:
      # product name
      key = item.select('h3')[0].get_text().strip()
      # product price
      price = item.select('.currency-value')[0].get_text().strip()
      # product rating
      rating = item.select('.screen-reader-only')[0].get_text().strip()

      # name of seller
      seller = ""
      for text in item.select('.wt-screen-reader-only'):
        parsed_text = text.get_text().strip()
        if "From shop" in parsed_text:
          seller = parsed_text

      # url to product
      link = ""
      for link in item.select("a", href=True):
          link = link['href']
      products[key] = [price, rating, seller, link]

    except Exception as e:
        continue

  # returns a JSON where each product is the key, and the associated data
  #   is stored as an array
  return jsonify(products)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80)