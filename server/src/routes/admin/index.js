var express = require('express');
var router = express.Router();
var usersRouter = require('./users');
var libraryClass = require('./libraryClass');
var library = require('./library');
var chapter = require('./chapter');
// 用户路由
router.use('/users', usersRouter);
// 书库分类
router.use('/library_class', libraryClass);
// 书库列表
router.use('/library', library);
// 章节
router.use('/chapter', chapter);

module.exports = router;
