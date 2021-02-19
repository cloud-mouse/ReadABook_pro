var express = require('express');
var router = express.Router();
// 书库分类模型
const LibraryClass = require('../../model/LibraryClass')
// token校验
const checkToken = require('../../middleware/checkToken')

// 获取书库分类列表
router.get('/', checkToken, async (req, res, next) => {
  let { currentPage, pageSize } = req.query
  const libraryClass = await LibraryClass.find().skip((currentPage - 1) * pageSize).limit(pageSize * 1)  // 分页查询
  const count = await LibraryClass.countDocuments()  // 计数
  res.send({
    code: 200,
    msg: '获取成功',
    data: {
      list: libraryClass,
      currentPage: currentPage,
      pageSize: pageSize,
      count: count
    }
  })
})

// 添加书库分类
router.post('/', checkToken, async (req, res, next) => {
  let data = req.body
  let result = await LibraryClass.create(data)
  if(!result) {
    res.send({
      code: 400,
      msg: '新增失败',
      data: result
    })
    return
  }
  res.send({
    code: 200,
    msg: '新增成功',
  })
})

// 更新书库分类
router.put('/', checkToken, async (req, res, next) => {
  let data = req.body
  let updateTime = new Date()
  data.updateTime =  updateTime
  try {
     await LibraryClass.findByIdAndUpdate(data._id, data) 
  } catch (error) {
    res.send({
      code: error.code,
      msg: error.codeName==='DuplicateKey'?'分类名称重复': '更新失败'
    }) 
    return
  }
  res.send({
    code: 200,
    msg: '更新成功',
  })
})

// 删除分类
router.delete('/', checkToken, async (req, res, next) => {
  let id = req.query.class_id
  let result = await LibraryClass.findOneAndDelete({ _id: id })
  if (!result) {
    res.send({
      code: 400,
      msg: '删除失败',
      data: result
    })
    return
  }  
  res.send({
    code: 200,
    msg: '删除成功'
  })
})

module.exports = router;
