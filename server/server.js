
//dependencies:
var express = require('express');
var bodyParser = require('body-parser');

var listRouter = require('./routes/list_router.js');
//
// var mainRouter = require('./routes/main_router.js');
// var calendarRouter = require('./routes/calendar_router.js');
// var typesRouter = require('./routes/types_router.js');

// var moment = require('moment');

// console.log(moment().add(1, 'days').format('L'));

//set up server:
var app = express();
var port = process.env.PORT || 5050;

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/tasks', listRouter);
// app.use('/tasks', mainRouter);
// app.use('/tasks', calendarRouter);
// app.use('/tasks', typesRouter);


//Listener
app.listen(port, function() {
  console.log('thx for listening on channel', port);
});
