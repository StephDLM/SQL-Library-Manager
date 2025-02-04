const Sequelize =require('./models/index.js').sequelize;
var createError = require('http-errors');
const server = require("http").createServer(app)
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var booksRouter = require('./routes/books');
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//using a static route AND express.static method to serve static public files
app.use("/static", express.static("public"));

app.use('/', indexRouter);
app.use('/books', booksRouter);

  // async IIFE: (Immediately Invoked Function Expression)
  (async () => {
    try {
      await Sequelize.sync();
      await Sequelize.authenticate();
      console.log('Connection to the database successful!');
    } catch (error) {
      console.error('Error connecting to the database: ', error);
    }
    
  })();
  
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// render error page 404 by sending response to the client, setting up the response status to 404, and render not-found view
app.use ((req,res, next) => {
    const err = new Error('page-not-found');
    err.status = 404;
    err.message = "This web page can't be located";
    console.log("This web page can't be located", err);
    next(err);
});

// render global error handler
app.use((err, req, res, next) => {
    // setting locals with error property
    if (err){
        if (err.status === 404){
            res.status(404).render('page-not-found', { err });
                } else {
            err.status = 500;
            err.message = "Oops! Something went wrong with the server.";
            console.log('Global error handler called',err)
            res.status(err.status || 500).render('error', {err} )
        }
    }
  });

//start server
app.listen(3001, () => {
    console.log('The application is running on localhost:3001!')
});

module.exports = app;


