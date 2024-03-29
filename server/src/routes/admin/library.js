var express = require('express');
var router = express.Router();
const Library = require('../../model/Library')
const Chapter = require('../../model/Chapter')
const checkToken = require('../../middleware/checkToken')
var { upload_file } = require('../../middleware/common')

// 获取书本列表
router.get('/', checkToken, async(req, res, next)=>{
  let { currentPage, pageSize, keywords, id} = req.query
  const reg = new RegExp(keywords, 'i') //不区分大小写
  let query = {
    $or : [{name : {$regex : reg}},{author : {$regex : reg}}],
  }
  // 查询书本详情
  if(id){
    const data = await Library.findById(id).populate('classId')
    if(data){
      res.send({
        code: 200,
        msg: '获取成功',
        data: data
      })
    }else {
      res.send({
        code: 200,
        msg: '获取失败',
        data: data
      })
    }
  }else {
    // 查询书本列表
    const list = await Library.find(query).populate('classId').sort({"sort": -1}).skip((currentPage - 1) * pageSize).sort({sort:-1}).limit(pageSize * 1)  // 分页查询
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
  var chapterDelete = await Chapter.deleteMany({ libraryId: id })
  if(chapterDelete) {
    var result = await Library.findOneAndDelete({ _id: id })
  }else {
    res.send({
      code: 400,
      msg: '小说章节删除失败' +chapterDelete,
      
    })
  }
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
    data: result
  })
})

// 导入图书
router.post('/import-book', checkToken, upload_file, async(req, res, next)=>{
  let {data} = req.result
  let chapter = data.chapter
  let book = await Library.findOne({name: data.name})
  try {
    if(book){
      await Library.findByIdAndUpdate(book._id, data)
      await insertChapter(book._id, chapter)
    }else {
      let result = await Library.create(data)
      await insertChapter(result._id, chapter)
    }
    res.send({
      code: 200,
      msg: '导入成功'
    })
  } catch (error) {
    res.send({
      code: 400,
      msg: error
    })
  }
  
})

// 插入章节方法
let insertChapter = async(libraryId, chapters)=>{
  for (var i = 0, len = chapters.length; i < len; i++) {
    let chapter = await Chapter.find({chapter_name: chapters[i].chapter_name, libraryId: libraryId});
    if (chapter._id){
      chapters[i].libraryId = libraryId
      await Chapter.findByIdAndUpdate(chapter._id, chapters[i])
    }else {
      chapters[i].libraryId = libraryId
      await Chapter.create(chapters[i])
    }
  }
}

module.exports = router;
