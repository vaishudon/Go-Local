let locationName = ''
var geolocation_api_key = config.GEO_LOCATION_API_KEY;

document.addEventListener('DOMContentLoaded', function () {

    navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        const getCityAPILink = 'https://www.mapquestapi.com/geocoding/v1/reverse?key=' + geolocation_api_key + '&location=' + latitude + '%2C' + longitude + '&outFormat=json&thumbMaps=false';

        // getting city from coordinates
        fetch(getCityAPILink).then(r => r.text()).then(result => {
            let addressJSON = JSON.parse([result])
            locationName = addressJSON.results[0].locations[0].adminArea5 + ", " + addressJSON.results[0].locations[0].adminArea3;
         //  console.log(locationName);

        })

        chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
            console.log(tabs[0].url);
            console.log(tabs[0].title);

            fetch('http://127.0.0.1:5000/retrieve?product=' + 'watch')
            .then((response) => response.json())
            .then(displayProducts)
            .catch(console.err);
            let start = tabs[0].url.indexOf("s?k=") + 4;
            let end = tabs[0].url.indexOf("&");
            console.log(tabs[0].url.substring(start, end));
          });
    });
}, false);

function displayProducts(response) {
    let section = document.querySelector("section");
    let keys = Object.keys(response);
    keys.forEach((product, index) => {
        if (index < 4) {
            let newProductSection = document.createElement("article");
            section.appendChild(newProductSection);

            let seller = document.createElement("h2");
            seller.textContent = response[product][2].substring(10,);
            newProductSection.appendChild(seller);

            let title = document.createElement("p");
            title.textContent = product;
            newProductSection.appendChild(title);

            let price = document.createElement("p");
            price.textContent = "Price: $" + response[product][0];
            newProductSection.appendChild(price);

            let rating = document.createElement("p");
            rating.textContent = "Rating: " + response[product][1];
            newProductSection.appendChild(rating);

            let rating_display = document.createElement("section");
            rating_display.classList = "stars";
            for (let i = 0; i < parseInt(response[product][1]); i++) {
                let star = document.createElement("img");
                star.src = "img/star.png";
                rating_display.appendChild(star);
            }
            newProductSection.appendChild(rating_display);
        }
    });
}