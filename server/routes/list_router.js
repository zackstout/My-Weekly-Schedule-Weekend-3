
//dependencies:
var express = require('express');
var router = express.Router();
var pg = require('pg');
var thisWeek = require('../modules/moment.js');

var tasks = [];
var config = {
  database: 'deneb',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000
};

var pool = new pg.Pool(config);

var week = thisWeek();
var endOfWeek = week[6];
var startOfWeek = week[0];


//CALENDAR ROUTES:
router.get('/calendar', function(req, res){
  res.send(week);
}); // END GET ROUTE

router.get('/week', function(req, res) {
  pool.connect(function(errorConnectingToDb, db, done) {
    if(errorConnectingToDb) {
      console.log('Error connecting', errorConnectingToDb);
      res.sendStatus(500);
    } else {
      //we connected to DB
      var queryText = 'SELECT * FROM "taskstodo" WHERE ("due" >= $1 AND "due" <= $2 AND "complete"=false);';
      db.query(queryText, [startOfWeek, endOfWeek], function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Error making query', errorMakingQuery);
          res.sendStatus(500);
        } else {
          res.send(result.rows);
        }
      });
    }
  });
}); //END GET ROUTE


//TYPES ROUTES:
router.post('/types', function(req, res){
  var x = req.body;
  // console.log(x);
  // res.sendStatus(200);
  pool.connect(function(errorConnectingToDb, db, done) {
    if(errorConnectingToDb) {
      console.log('Error connecting', errorConnectingToDb);
      res.sendStatus(500);
    } else {
      //we connected to DB
      var queryText = 'INSERT INTO "typesoftasks" ("blue", "green", "red", "yellow") VALUES ($1, $2, $3, $4);';
      db.query(queryText, [x.blue, x.green, x.red, x.yellow], function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Error making query', errorMakingQuery);
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      });
    }
  });
}); //END POST ROUTE

router.get('/types', function(req, res) {
  pool.connect(function(errorConnectingToDb, db, done) {
    if(errorConnectingToDb) {
      console.log('Error connecting', errorConnectingToDb);
      res.sendStatus(500);
    } else {
      //we connected to DB
      var queryText = 'SELECT * FROM "typesoftasks" ORDER BY "id" DESC limit 1;';
      db.query(queryText, function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Error making query', errorMakingQuery);
          res.sendStatus(500);
        } else {
          res.send(result.rows);
        }
      });
    }
  });
}); //END GET ROUTE


//MAIN ROUTES:
router.get('/', function(req, res){
  pool.connect(function(errorConnectingToDb, db, done) {
    if(errorConnectingToDb) {
      console.log('Error connecting', errorConnectingToDb);
      res.sendStatus(500);
    } else {
      //we connected to DB
      var queryText = 'SELECT * FROM "taskstodo" ORDER BY "complete", "due";';
      db.query(queryText, function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Error making query', errorMakingQuery);
          res.sendStatus(500);
        } else {
          res.send(result.rows);
        }
      });
    }
  });
}); // END GET ROUTE

router.get('/:id', function(req, res){
  var color = req.params.id;
  console.log(req.params.id);
  pool.connect(function(errorConnectingToDb, db, done) {
    if(errorConnectingToDb) {
      console.log('Error connecting', errorConnectingToDb);
      res.sendStatus(500);
    } else {
      //we connected to DB
      var queryText = 'SELECT * FROM "taskstodo" WHERE "typecolor"=$1 ORDER BY "complete", "due";';

      if (color == '0' || color == 'alpha') {
        queryText = 'SELECT * FROM "taskstodo" WHERE ("typecolor"=$1 OR "typecolor" <> $1) ORDER BY "complete", "due";';
      }
      db.query(queryText, [color], function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Error making query', errorMakingQuery);
          res.sendStatus(500);
        } else {
          res.send(result.rows);
        }
      });
    }
  });
}); // END GET ROUTE

router.post('/', function(req, res){
  var task = req.body;
  console.log(task);
  pool.connect(function (errorConnectingToDb, db, done) {
    if (errorConnectingToDb) {
      console.log('Error connecting', errorConnectingToDb);
      res.sendStatus(500);
    } else {
      //wait it's really weird that in "task.x" x has to match column name and not object name............
      var queryText = 'INSERT INTO "taskstodo" ("name", "type", "description", "due", "complete", "typecolor") VALUES ($1, $2, $3, $4, $5, $6);';
      db.query(queryText, [task.name, task.type, task.description, task.due, task.complete, task.typecolor], function (errorMakingQuery, result) {
        done(); // pool +1
        if (errorMakingQuery) {
          console.log('Error making query', errorMakingQuery);
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      });
    }
  });
}); //END POST ROUTE


//EXTRA BUTTONS ROUTES:
router.delete('/:id', function(req, res){
  var taskId = req.params.id;
  console.log(taskId);
  // res.sendStatus(200);
  pool.connect(function (errorConnectingToDb, db, done) {
    if (errorConnectingToDb) {
      console.log('Error connecting', errorConnectingToDb);
      res.sendStatus(500);
    } else {
      // We connected to the db!!!!! pool -1
      var queryText = 'DELETE FROM "taskstodo" WHERE "id"=$1;';
      db.query(queryText, [taskId], function (errorMakingQuery, result) {
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
}); //END DELETE ROUTE

router.put('/:id', function(req,res){
  var taskId = req.params.id;
  console.log(taskId);
  //res.sendStatus(200);
  pool.connect(function (errorConnectingToDb, db, done) {
    if (errorConnectingToDb) {
      console.log('Error connecting', errorConnectingToDb);
      res.sendStatus(500);
    } else {
      // We connected to the db!!!!! pool -1
      var queryText = 'UPDATE "taskstodo" SET "complete" = true WHERE "id" = $1;';
      db.query(queryText, [taskId], function (errorMakingQuery, result) {
        // We have received an error or result at this point
        done(); // pool +1
        if (errorMakingQuery) {
          console.log('Error making query', errorMakingQuery);
          res.sendStatus(500);
        } else {
          // Send back success!
          res.sendStatus(201);
        }
      }); // END QUERY
    }
  }); // END POOL
}); //END PUT ROUTE

router.put('/:id', function(req, res){
  var taskId = req.params.id;
  var task = req.body;
  pool.connect(function (errorConnectingToDb, db, done) {
    if (errorConnectingToDb) {
      console.log('Error connecting', errorConnectingToDb);
      res.sendStatus(500);
    } else {
      // We connected to the db!!!!! pool -1
      var queryText = 'UPDATE "taskstodo" SET "name" = $1, "type" = $2, "description" = $3, "due" = $4 WHERE "id" = $5;';
      db.query(queryText, [task.name, task.type, task.description, task.due, taskId], function (errorMakingQuery, result) {
        // We have received an error or result at this point
        done(); // pool +1
        if (errorMakingQuery) {
          console.log('Error making query', errorMakingQuery);
          res.sendStatus(500);
        } else {
          // Send back success!
          res.sendStatus(201);
        }
      }); // END QUERY
    }
  }); // END POOL
});

module.exports = router;
