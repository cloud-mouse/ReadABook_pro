var express = require('express');
var router = express.Router();
var usersRouter = require('./users');
// 用户路由
router.use('/users', usersRouter);

module.exports = router;
