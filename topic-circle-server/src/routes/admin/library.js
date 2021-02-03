var express = require('express');
var router = express.Router();
const Library = require('../../model/Library')

const checkToken = require('../../middleware/checkToken')

// 获取用户列表
router.get('/list', checkToken, async(req, res, next)=>{
  const list = await Library.find()
  res.send({
    code: 200,
    msg: '获取成功',
    data: list
  })
})

module.exports = router;
