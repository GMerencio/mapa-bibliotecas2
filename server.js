const path = require('path');
const express = require('express');

const iesRoute = require("./api/ies");
 
const app = express();
 
app.use(express.static(path.join(__dirname, 'build')));
app.set('port', process.env.PORT || 5000);

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.use("/api/ies", iesRoute);
 
const server = app.listen(app.get('port'), function() {
  console.log('listening on port ', server.address().port);
});