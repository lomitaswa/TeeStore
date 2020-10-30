const express = require('express');

const app = express();

const port = 8000;

app.get("/", (req, res) => {
    return  res.send("Welcome Home");
});

const isloggedIn = (req, res, next) => {
    console.log("isloggedIn is running...");
    next();
};

const isAdmin = (req, res, next) => {
    console.log("isAdmin running...");
    next();
};

const admin = (req, res) => {
    return res.send("This is admin's dashboard");
};

app.get("/admin", isloggedIn, isAdmin, admin);

app.get("/signin", (req, res) => {
    return  res.send("Hey you are signed in");
});

app.get("/signout", (req, res) => {
    return  res.send("Hey you are signed out.. Keep coming");
});

app.get("/lomitaswa", (req, res) => {
    return  res.send("This is Lomitaswa's page");
});

app.get("/profile", (req, res) => {
    return  res.send("This is my profile");
});
app.listen(port, () => {
    console.log("Server is up and running...");
});