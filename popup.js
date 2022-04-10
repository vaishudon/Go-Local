let locationName = ''; // stores user's city name
var geolocation_api_key = config.GEO_LOCATION_API_KEY;  // Personal API Key to access user's city

document.addEventListener('DOMContentLoaded', function () {

    // gets information about the user's location and current open tab
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {

        // gets user's current amazon tab's search item
        let start = tabs[0].url.indexOf("s?k=") + 4;
        let end = tabs[0].url.indexOf("&");
        let product_name = tabs[0].url.substring(start, end);
        
        // get user's city name
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            const getCityAPILink = 'https://www.mapquestapi.com/geocoding/v1/reverse?key=' + geolocation_api_key + '&location=' + latitude + '%2C' + longitude + '&outFormat=json&thumbMaps=false';

            // getting city from coordinates
            fetch(getCityAPILink).then(r => r.text()).then(result => {
                let addressJSON = JSON.parse([result])
                locationName = addressJSON.results[0].locations[0].adminArea5;
                console.log(locationName);
            }).then(()=>getGeocode(product_name))
        });
      });
}, false);

/**
 * This method gets the geocode name of user's current location using local JSON.
 * 
 * @param product_name the product the user is searching for
 */
function getGeocode(product_name) {
    fetch("./IP2LOCATION-GEONAMEID.json")
    .then(response => { return response.json();})
    .then(jsondata => {return jsondata[locationName][0]["geonameid"];})
    .then((code)=>getProducts(product_name, code));
}

/**
 * This method lists all the products from local businesses that
 * are similar to the user's amazon search.
 * 
 * @param product_name the product the user is searching for
 * @param geocode the geocode is of the user's location
 */
function getProducts(product_name, geocode) {
    console.log(product_name)
    console.log(geocode)
    fetch('http://127.0.0.1:5000/retrieve?product=' + product_name + "&locationQuery=" + geocode)
    .then((response) => response.json())
    .then(displayProducts)
    .catch(console.err);
}

/**
 * This is a helper method that actively displays the products from 
 * local businesses that match the user's current amazon search.
 * 
 * @param response the information about local businesses (name, urls, pricing, etc.)
 */
function displayProducts(response) {

    // represents all product items displayed
    let section = document.querySelector("#items");
    let keys = Object.keys(response);

    // for each product in result
    keys.forEach((product, index) => {

        // only display at max 4 items
        if (index < 4) {

            // local business' url
            let link = response[product][3];

            // represents 1 business' product
            let product_section = document.createElement("div");
            product_section.className = "product-section";

            // when clicked on, new tab to product opens
            product_section.onclick = function(){
                window.open(link, "_blank");
            }

            // add background box to section
            section.appendChild(product_section);

            // business' name
            let seller = document.createElement("h2");
            seller.textContent = response[product][2].substring(10,);
            product_section.appendChild(seller);

            // business' description
            let title = document.createElement("p");
            title.classList.add("description")
            title.textContent = product;
            product_section.appendChild(title);

            // price
            let price_display = document.createElement("section");
            price_display.classList.add("price")
            let price_heading = document.createElement("p");
            price_heading.textContent = "Price: ";
            price_heading.classList.add("bolded");
            price_display.appendChild(price_heading);
            let price = document.createElement("p");
            price.textContent = response[product][0];
            price_display.appendChild(price);
            product_section.appendChild(price_display);

            // rating and stars displayed
            let rating_display = document.createElement("section");
            rating_display.classList = "stars";
            let rating = document.createElement("p");
            rating.textContent = "Rating: ";
            rating.classList.add("bolded");
            rating_display.appendChild(rating);

            for (let i = 0; i < parseInt(response[product][1]); i++) {
                let star = document.createElement("img");
                star.src = "img/star.png";
                rating_display.appendChild(star);
            }
            if ((response[product][1]).includes(".5")) {
                let half_star = document.createElement("img");
                half_star.src = "img/half-star.png";
                rating_display.appendChild(half_star);
            }

            product_section.appendChild(rating_display);
        }
    });
}