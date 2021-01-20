var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

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
app.get("/api/eras", (req, res, next) => {
  var sql = "select * from era"
  var params = []
  selectAll(sql, params, res)
});
app.get("/api/eras/dates", (req, res, next) => {
  let rows = []
  let sql = `SELECT type type
            FROM typeeras
            WHERE era = ?`;

  db.each(sql, ['1920s'], (err, row) => {
    if (err) {
      throw err;
    }
    console.log(`${row.type}`);
    rows << row;
  });
  res.json({
    "message":"success",
    "data":rows
  })
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
