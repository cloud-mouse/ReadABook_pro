var express = require('express');
var router = express.Router();
var libraryClass = require('./libraryClass');
var library = require('./library');
var chapter = require('./chapter');
// 书库分类
router.use('/library_class', libraryClass);
// 书本列表
router.use('/library', library);
// 章节接口
router.use('/chapter', chapter);

module.exports = router;
