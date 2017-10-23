
//dependencies:
var express = require('express');
var router = express.Router();
var pg = require('pg');

//set up DB:
var tasks = [];
var config = {
  database: 'deneb',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000
};
var pool = new pg.Pool(config);

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

module.exports = router;
