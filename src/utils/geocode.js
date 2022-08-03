const request = require("request");

// const url2 =
//     "https://api.mapbox.com/geocoding/v5/mapbox.places/Patna.json?access_token=pk.eyJ1IjoicmlyYW5hIiwiYSI6ImNsNjNjczd2ZjBjanczanA0OTVvZWdhNHMifQ.aKn4WHbjY_jht9mE-xzABg&limit=1";

// request({ url: url2, json: true }, (error, response) => {
//     if (error) {
//         console.log("Unable to connect to weather service!!");
//     } else if (
//         response.body.features === undefined ||
//         response.body.features.length === 0
//     ) {
//         console.log("Some error encountered!!");
//     } else {
//         const lat = response.body.features[0].center[1];
//         const long = response.body.features[0].center[0];
//         console.log(lat, long);
//     }
// });

const geocodeF = (address, callback) => {
    const url2 =
        "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        encodeURIComponent(address) +
        ".json?access_token=pk.eyJ1IjoicmlyYW5hIiwiYSI6ImNsNjNjczd2ZjBjanczanA0OTVvZWdhNHMifQ.aKn4WHbjY_jht9mE-xzABg&limit=1";
    request({ url: url2, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect!!", undefined);
        } else if (body.features === undefined || body.features.length === 0) {
            callback("unable to find location", undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name,
            });
        }
    });
};

// geocodeF("Noida", (error, data) => {
//   console.log("Error: ", error);
//   console.log("Data: ", data);
// });

module.exports = {
    geocodeF: geocodeF,
};