
//dependencies:
var express = require('express');
var bodyParser = require('body-parser');

var listRouter = require('./routes/list_router.js');
var moment = require('moment');

// console.log(moment().add(1, 'days').format('L'));

//set up server:
var app = express();
var port = process.env.PORT || 5050;

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/tasks', listRouter);

//Listener
app.listen(port, function() {
  console.log('thx for listening on channel', port);
});
