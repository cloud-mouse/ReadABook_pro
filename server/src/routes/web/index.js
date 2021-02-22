var express = require('express');
var router = express.Router();
var libraryClass = require('./libraryClass');
var library = require('./library');
var chapter = require('./chapter');

// 引入首页控制器
var IndexController = require('../../controllers/Index')

// 书库分类
router.use('/library_class', libraryClass);
// 书本列表
router.use('/library', library);
// 章节接口
router.use('/chapter', chapter);

// 获取首页数据
router.get('/getIndex', IndexController.getIndex)

module.exports = router;
