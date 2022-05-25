const express = require("express");

let iesRoute = express();

iesRoute.route("/")
    .get((req, res) => {
    	res.setHeader('Content-Type', 'application/json');
    	res.send(JSON.stringify({ content: 'Bom dia!' }));
    });

module.exports = iesRoute;