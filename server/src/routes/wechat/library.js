var express = require('express');
var router = express.Router();
const Library = require('../../model/Library')
const Chapter = require('../../model/Chapter')

// 获取书本列表
router.get('/', async(req, res, next)=>{
  let { currentPage, pageSize, keywords, id, class_id} = req.query
  
  const reg = new RegExp(keywords, 'i') //不区分大小写
  let query = {
    $or : [{name : {$regex : reg}},{author : {$regex : reg}}],
  }
  // 查询书本详情  同时拿到章节列表
  if(id){
    const data = await Library.findById(id).populate('classId')
    // 查询章节列表 去掉content字段
    const chapterList = await Chapter.find({libraryId: id}, { content: 0 }).sort({"chapter_index": 1}).skip((currentPage - 1) * pageSize).limit(pageSize * 1)  // 分页查询
    if(data){
      res.send({
        code: 200,
        msg: '获取成功',
        data: {
          bookInfo: data,
          chapterList: chapterList
        }
      })
    }else {
      res.send({
        code: 400,
        msg: '获取失败'
      })
    }
  }else {
    // 查询书本列表
    const list = await Library.find({
      classId: class_id
    }).populate('classId')
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


module.exports = router;
