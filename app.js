var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var homeRouter = require('./routes/home');
var mongoose  =  require('mongoose');
var config    =  require('./config');
//var restrict  =  require('./auth/restrict');
var flash     =  require('connect-flash');
var connectMongo = require('connect-mongo');


//require passport
var passport=require('passport');
var expressSession=require('express-session');
var passportConfig=require('./auth/passport-config');
var MongoStore = connectMongo(expressSession);
passportConfig();

var app = express();
mongoose.connect(config.mongoUri,{ useNewUrlParser: true,useUnifiedTopology:true });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//saveUnintialized - create a session if nothing has been stored in it
//resave - resave  a session that has not been changed yet

app.use(expressSession({
    secret:'private-key',
    saveUninitialized:false,
    resave:false,
    store: new MongoStore({
      mongooseConnection:mongoose.connection
    })
})
);

app.use(flash());
//put it before routes as we can allow/disallow certain routes
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);

app.use('/users', usersRouter);
//app.use(restrict);
app.use('/home',homeRouter);

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
