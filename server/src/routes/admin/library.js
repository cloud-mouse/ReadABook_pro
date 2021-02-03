var express = require('express');
var router = express.Router();
const Library = require('../../model/Library')
const checkToken = require('../../middleware/checkToken')

// 获取用户列表
router.get('/', checkToken, async(req, res, next)=>{
  let { currentPage, pageSize, keywords, _id} = req.query
  const reg = new RegExp(keywords, 'i') //不区分大小写
  let query = {
    $or : [{name : {$regex : reg}},{auth : {$regex : reg}}],
  }
  // 查询书本详情
  if(_id){
    const data = await Library.findById(_id).populate('classId')
    if(data){
      res.send({
        code: 200,
        msg: '获取成功',
        data: data
      })
    }
  }else {
    // 查询书本列表
    const list = await Library.find(query).populate('classId').skip((currentPage - 1) * pageSize).sort({sort:-1}).limit(pageSize * 1)  // 分页查询
    const count = await Library.countDocuments(query)  // 计数
    res.send({
      code: 200,
      msg: '获取成功',
      data: {
        list: list,
        currentPage: currentPage,
        pageSize: pageSize,
        count: count
      }
    })
  }
})

// 更新书本
router.put('/', checkToken, async (req, res, next) => {
  let data = req.body
  let updateTime = new Date()
  data.updateTime =  updateTime
  try {
     await Library.findByIdAndUpdate(data._id, data) 
  } catch (error) {
    res.send({
      code: error.code,
      msg: error.codeName==='DuplicateKey'?'书名重复': '更新失败'
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
  let result = await Library.findOneAndDelete({ _id: id })
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

// 修改
router.patch('/', checkToken, async (req, res, next) => {
  let data = req.body
  let updateTime = new Date()
  data.updateTime =  updateTime
  try {
     await Library.findByIdAndUpdate(data._id, data) 
  } catch (error) {
    res.send({
      code: error.code,
      msg: error.codeName
    }) 
    return
  }
  res.send({
    code: 200,
    msg: '更新成功',
  })
})

// 新增书本
router.post('/', checkToken, async(req, res, next)=>{
  let data = req.body
  let result = await Library.create(data)
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
