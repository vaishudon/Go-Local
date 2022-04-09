from flask import Flask, render_template
from flask import jsonify
from flask import request

from bs4 import BeautifulSoup
import requests


app = Flask(__name__)

# Display your index page
@app.route("/")
def index():
    return render_template('popup.html')

# A function to add two numbers
@app.route("/retrieve")
def retrieve():
  item = request.args.get('product')

  headers = {'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9'}
  url = 'https://www.etsy.com/search?q=' + item

  response=requests.get(url,headers=headers)
  soup=BeautifulSoup(response.content,'lxml')

  products = {}

  for item in soup.select('.wt-grid__item-xs-6'):
    try:
      key = item.select('h3')[0].get_text().strip()
      price = item.select('.currency-value')[0].get_text().strip()
      rating = item.select('.screen-reader-only')[0].get_text().strip()

      seller = ""
      for text in item.select('.wt-screen-reader-only'):
        parsed_text = text.get_text().strip()
        if "From shop" in parsed_text:
          seller = parsed_text

        link = ""
        for link in item.select("a", href=True):
            link = link['href']
        products[key] = [price, rating, seller, link]

    except Exception as e:
        continue


  return jsonify(products)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80)