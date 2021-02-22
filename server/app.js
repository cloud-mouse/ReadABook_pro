var createError = require('http-errors');
var express = require('express');
var  bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors=require("cors");

var indexRouter = require('./src/routes/index');
var usersRouter = require('./src/routes/users');
var adminRouter = require('./src/routes/admin/index'); // 管理系统api
var wxRouter = require('./src/routes/wechat/index'); // 微信小程序api 废弃，因为我小程序要资质不给上架
var webRouter = require('./src/routes/web/index'); // h5 网页api

var app = express();

app.use(cors()); 
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin', express.static(path.join(__dirname, 'views/admin'))) // 后台访问地址

app.use('/', indexRouter);
app.use('/users', usersRouter); // 测试的用户接口
app.use('/admin-api', adminRouter); // 管理后台的接口
app.use('/wx-api', wxRouter); // wx小程序接口
app.use('/web-api', webRouter); // h5接口

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
  res.send(err);
});

module.exports = app;
