const express = require("express");
const path = require("path");
const hbs = require("hbs");

const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast");

const app = express();

// Defining the path variables
const publicDirectoryPath = path.join(__filename, "../../public");
const viewsDirectoryPath = path.join(__filename, "../../templates/views");
const partialsDirectoryPath = path.join(__filename, "../../templates/partials");

// app.use - used to customize the servers
app.use(express.static(publicDirectoryPath));

// Setting the view engine and view
app.set("view engine", "hbs");
app.set("views", viewsDirectoryPath);
hbs.registerPartials(partialsDirectoryPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Sajith Pradeep",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Andrew J Mead",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "Sajith Pradeep",
    message: "This is the help page",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "Enter a valid search string",
    });
  }
  geocode(req.query.search, (error, data) => {
    if (error) {
      return res.send({
        error: error
      })
    }
    const {
      latitude,
      longitude,
      location
    } = data;

    //calling the weather api
    forecast(latitude, longitude, (error, data) => {
      if (error) {
        return res.send({
          error: error
        })
      }
      res.send({
        weatherinfo: data,
        location: location,
        address: req.query.search
      })
    })
  })
});

// sample product code explaining Query Strings
// app.get("/products", (req, res) => {
//   if (!req.query.search) {
//     return res.send({
//       error: "Please provide a search string",
//     });
//   }
//   res.send({
//     products: [],
//   });
// });

app.get("/help/*", (req, res) => {
  res.render("pagenotfound", {
    pageNotFoundText: "The article you are searching for on help cannot be found",
    name: "Sajith Pradeep",
    title: "Page not found",
  });
});

app.get("*", (req, res) => {
  res.render("pagenotfound", {
    pageNotFoundText: "This page cannot be found",
    name: "Sajith Pradeep",
    title: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("Server started on port:3000");
});