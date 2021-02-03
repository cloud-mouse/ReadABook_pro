var express = require('express');
var router = express.Router();
const Chapter = require('../../model/Chapter')
const checkToken = require('../../middleware/checkToken')

// 获取小说章节列表
router.get('/', checkToken, async (req, res, next) => {
  let { currentPage, pageSize, _id } = req.query
  const libraryClass = await Chapter.find(_id).skip((currentPage - 1) * pageSize).limit(pageSize * 1)  // 分页查询
  const count = await Chapter.countDocuments()  // 计数
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

// 更新书本
router.put('/', checkToken, async (req, res, next) => {
  let data = req.body
  let updateTime = new Date()
  data.updateTime =  updateTime
  try {
    await Chapter.findByIdAndUpdate(data._id, data) 
  } catch (error) {
    res.send({
      code: error.code,
      msg: error.codeName==='DuplicateKey'?'章节重复': '更新失败'
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
  let id = req.query.id
  let result = await Chapter.findOneAndDelete({ _id: id })
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

// 新增章节
router.post('/', checkToken, async(req, res, next)=>{
  let data = req.body
  let result = await Chapter.create(data)
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

module.exports = router;
