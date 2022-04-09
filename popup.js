let locationName = ''
var geolocation_api_key = config.GEO_LOCATION_API_KEY;

document.addEventListener('DOMContentLoaded', function () {
    fetch('http://127.0.0.1:5000/retrieve')
        .then((response) => response.json())
        .then(console.log)
        .catch(console.err);

    navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        const getCityAPILink = 'https://www.mapquestapi.com/geocoding/v1/reverse?key=' + geolocation_api_key + '&location=' + latitude + '%2C' + longitude + '&outFormat=json&thumbMaps=false';

        // getting city from coordinates
        fetch(getCityAPILink).then(r => r.text()).then(result => {
            let addressJSON = JSON.parse([result])
            locationName = addressJSON.results[0].locations[0].adminArea5 + ", " + addressJSON.results[0].locations[0].adminArea3;
        })
        
        chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
            let start = tabs[0].url.indexOf("s?k=") + 4;
            let end = tabs[0].url.indexOf("&");
            console.log(tabs[0].url.substring(start, end));
          });
    });
}, false);
