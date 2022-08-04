const request = require("request");

// const url =
//     "http://api.weatherstack.com/current?access_key=c591128c187f0690dc04528760472c06&query=28.701,77.1025";

// request({ url: url }, (error, response) => {
//     const data = JSON.parse(response.body);
//     console.log(data.current);
// });

// request({ url: url, json: true }, (error, response) => {
//json: true will automatically parse the dresponse data.

//     if (error) {
//         console.log(error);
//     } else if (response.body.error) {
//         console.log("Some error encountered!!");
//     } else {
// console.log(response.body.current);

//         console.log(
//             "the temperature today is " +
//             response.body.current.temperature +
//             " ^C But it feels like  " +
//             response.body.current.feelslike +
//             " C out !!"
//         );
//     }
// });

const forecast = (latitude, longitude, callback) => {
    const url =
        "http://api.weatherstack.com/current?access_key=c591128c187f0690dc04528760472c06&query=" +
        latitude +
        "," +
        longitude +
        "";

    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect!!", undefined);
        } else if (body.error) {
            callback("Some error encountered!!", undefined);
        } else {
            callback(
                undefined,
                "Its " +
                body.current.weather_descriptions[0] +
                " Today and The Temperature is " +
                body.current.temperature +
                " C and " +
                " Wind Speed is " +
                body.current.wind_speed +
                "km/hr "
            );
        }
    });
};

// forecast(-75.7088, 44.1545, (error, data) => {
//   console.log("Error", error);
//   console.log("Data", data);
// });

module.exports = {
    forecast: forecast,
};