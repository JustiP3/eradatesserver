var createError = require('http-errors');
var express = require('express');
var cors = require('cors')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(cors())
var db = require("./database.js")

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//DB Request API Routes

app.get("/api/datetypes", (req, res, next) => {
  var sql = "select * from datetype"
  var params = []
  selectAll(sql, params, res)
});
app.post("/api/datetypes", (req, res, next) => {
  const insert = 'INSERT INTO datetype (name, safe) VALUES (?, ?)'
  const dateName = req.body.dateName 
  const safe = req.body.safe 

  db.run(insert, [dateName, safe], (err) => {
    if (err) {
      console.log(err)
      return res.json({status: "failed", error: err})
    } else {
      return res.json({status: "success"})
    }    
  }) 
});
app.get("/api/eras", (req, res, next) => {
  var sql = "select * from typeeras ORDER BY era"
  var params = []
  selectAll(sql, params, res)
});
app.get("/api/eras/:era", (req, res, next) => {

  let sql = `SELECT type type
            FROM typeeras
            WHERE era = ?`;
  let params = [req.params.era]
  selectAll(sql, params, res)
})

app.post("/api/eras/:era/:type", (req, res, next) => {
  const insert = 'INSERT INTO typeeras (era, type) VALUES (?, ?)'
  const era = req.body.era 
  const type = req.body.type 

  db.run(insert, [era, safe], (err) => {
    if (err) {
      console.log(err)
      return res.json({status: "failed", error: err})
    } else {
      return res.json({status: "success"})
    }    
  }) 
});
app.get("/api/eras/:era/safe", (req, res, next) => {

  let sql = `SELECT type FROM typeeras WHERE era = ? AND type = (SELECT name FROM datetype WHERE safe = ?)`;
  let params = [req.params.era, "true"]
  selectAll(sql, params, res)
})

// SQL Helper functions

const selectAll = (sql, params, res) => {
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    res.json({
        "message":"success",
        "data":rows
    })
  });
}


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
