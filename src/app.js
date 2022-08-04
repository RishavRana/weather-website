const path = require("path"); //path is core node module used for

const request = require("request");

const express = require("express");

const hbs = require("hbs");

const forecast = require("./utils/forecast.js");
const geocode = require("./utils/geocode.js");

const app = express();
const port = process.env.PORT || 3000;

//Define path for Express config and views
const publicDirPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialPath);

//Setup directory to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Andrew",
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
        name: "Mead",
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help Meeeee",
        name: "mead",
    });
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "please provode a address",
        });
    }

    geocode.geocodeF(
        req.query.address,
        (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({
                    error: error,
                });
            }
            forecast.forecast(latitude, longitude, (error, data2) => {
                if (error) {
                    return res.send({
                        error: error,
                    });
                }
                res.send({
                    location: location,
                    forecast: data2,
                });
            });
        }
    );
});

// app.get("/products", (req, res) => {
//     if (!req.query.search) {
//         return res.send({
//             error: "You must provide a search term",
//         });
//     }

//     console.log(req.query.search);
//     res.send({
//         products: [],
//     });
// });

app.get("/help/*", (req, res) => {
    res.render("error", {
        title: "Help 404",
        name: "Mead",
        errorMsg: "Help Page Not Found",
    });
});

app.get("*", (req, res) => {
    res.render("error", {
        title: "Real 404",
        name: "420",
        errorMsg: "Page Not Found",
    });
});

// app.listen(3000, () => {
//     console.log("server in running on port 3000");
// });

app.listen(port, () => {
    console.log("server is up on " + port);
});