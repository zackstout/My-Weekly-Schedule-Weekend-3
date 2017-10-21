
//dependencies:
var express = require('express');
var router = express.Router();

var tasks = []; // <- Stored on the SERVER

var pg = require('pg');
var config = {
  database: 'deneb', // the name of the database
  host: 'localhost', // where is your database?
  port: 5432, // the port number for you database, 5432 is the default
  max: 10, // how many connections at one time
  idleTimeoutMillis: 30000 // Close idle connections to db after
};

var pool = new pg.Pool(config);

router.get('/', function(req, res){
  pool.connect(function(errorConnectingToDb, db, done) {
    if(errorConnectingToDb) {
      console.log('Error connecting', errorConnectingToDb);
      res.sendStatus(500);
    } else {
      //we connected to DB
      var queryText = 'SELECT * FROM "taskstodo";';
      db.query(queryText, function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Error making query', errorMakingQuery);
          res.sendStatus(500);
        } else {
          res.send(result.rows);
        }
      }); // END QUERY
    }
  }); // END POOL
}); // END GET ROUTE

router.post('/', function(req, res){
  var task = req.body;
  console.log(task);
  pool.connect(function (errorConnectingToDb, db, done) {
    if (errorConnectingToDb) {
      console.log('Error connecting', errorConnectingToDb);
      res.sendStatus(500);
    } else {
      // We connected to the db!!!!! pool -1

      //wait it's really weird that in "task.x" x has to match column name and not object name............
      var queryText = 'INSERT INTO "taskstodo" ("name", "type", "description", "due", "complete", "typecolor") VALUES ($1, $2, $3, $4, $5, $6);';
      db.query(queryText, [task.name, task.type, task.description, task.due, task.complete, task.typecolor], function (errorMakingQuery, result) {
        // We have received an error or result at this point
        done(); // pool +1
        if (errorMakingQuery) {
          console.log('Error making query', errorMakingQuery);
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      }); // END QUERY
    }
  }); // END POOL
});

module.exports = router;
