var express = require('express');
var router = express.Router();
var usersRouter = require('./users');
var libraryClass = require('./libraryClass');
var library = require('./library');
// 用户路由
router.use('/users', usersRouter);
// 书库分类
router.use('/library_class', libraryClass);
// 书库列表
router.use('/library', library);

module.exports = router;
