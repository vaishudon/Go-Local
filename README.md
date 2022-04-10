## :convenience_store: Go Local
As larger businesses continue to gain popularity with the advent of social media advertising, local businesses struggle to get attention. Although platforms like TikTok and even Instagram sometimes allow local businesses to share their content, the reach of this content is oftentimes not widespread. Even worse, people will often see these products on social media and forget to follow through to check out their website when time comes around, instead reaching out to more conveninet options like Amazon.

Go Local is a chrome extension intended to remind people about local businesses **exactly** when it matters. When a user persues Amazon to find a product that they wish to purchase, the Go Local extension immediately scrapes the web for similar products being sold by local business owners instead, and displays these on the screen with direct link to the products. This way, users do not have to go out of their way to support local businesses, and are conveniently reminded of these shops when it matters, greatly increasing the attention that local businesses receive. Most importantly, the extension uses the user's location to select local businesses in the near vicinity of the user, truly bolstering the goal of supporting *local* owners. This extension will be tied in with a UI that we built a prototype for, and through this, small business owners will get the freedom to create a custom profile to display their products, and thus view analytics about their product being displayed to users through the extension.

## :gear: Requirements
* Python 3.8
* Flask 1.1.2
* BeautifulSoup4
* Enable your device to provide location services to Google Chrome.

## :technologist: Installation
1. Download the [source code](https://github.com/vaishudon/Go-Local.git).
2. Install libraries:
* `pip install flask`
* `pip install beautifulsoup4`
* `pip install requests soupsieve lxml`
3. Move into the flask folder using the command `cd flask`. Run `python -m flask run` to start up the server.
4. Upload the Chrome extension:
    1. Go to Google Chrome, and click on **Extensions** (chrome://extensions/) from the menu bar. Select **Manage Extensions**.
    2. Once the extensions window opens, click the **Load Unpacked** button from the top left corner.
    3. Then, select the folder containing all the source code. Now, you should see the extension appear in the list of available extensions. 
 
![img](https://user-images.githubusercontent.com/56169756/162602059-fe0dc585-05f4-4b9c-9feb-06a9bd2545ec.png)

## :arrow_forward: Demo
When a user is searching for a product on Amazon, they can use Go Local to see similar products from local businesses.

1. After searching for a product on Amazon, click the Go Local extension
2. A few products made by local sellers will appear. You will see:
    1.  Seller's name
    2. Seller's description
    3. Product pricing
    4. Seller's Rating
3. Click on the desired product to learn more about it! :brain:

![img](https://user-images.githubusercontent.com/56169756/162601661-e5dcf4dc-0602-4a6e-95c0-3461b46ad5bb.png)

## :bulb: Future Updates
In Go Local 1.0, the main feature includes the ability to browse solely products from local businesses on [Etsy](https://www.etsy.com/). Future versions of Go Local will include:
1. Ability to get notified of local products when on any online shopping sites, not just Amazon.
2. Ability to browse local businesses that aren't only on Etsy.
3. Ability for businesses to create profiles and directly engage with Go Local users.

For more information about our vision, please visit our [UI prototype](https://www.figma.com/file/ldub7xdWXKEtFITGymgo3W/go-local-prototype?node-id=0%3A1)! :art:
