var express = require('express');
var router = express.Router();
// 书库分类模型
const LibraryClass = require('../../model/LibraryClass')
// 获取书库分类列表
router.get('/', async (req, res, next) => {
  const libraryClass = await LibraryClass.find()
  res.send({
    code: 200,
    msg: '获取成功',
    data: libraryClass
  })
})

module.exports = router