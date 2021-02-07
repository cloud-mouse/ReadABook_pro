var express = require('express');
var router = express.Router();
const Chapter = require('../../model/Chapter')
const checkToken = require('../../middleware/checkToken')

// 获取小说章节列表
router.get('/', async (req, res, next) => {
  let { currentPage, pageSize, library_id, chapter_id } = req.query
  if(chapter_id) {
    // 查看详情
    const chapter = await Chapter.findById(chapter_id)
    if(chapter){
      res.send({
        code: 200,
        msg: '获取成功',
        data: chapter
      })
    }else {
      res.send({
        code: 200,
        msg: '获取失败',
        data: chapter
      })
    }
  }else {
    const chapterList = await Chapter.find({libraryId: library_id}).sort({"chapter_index": 1}).skip((currentPage - 1) * pageSize).limit(pageSize * 1)  // 分页查询
    const count = await Chapter.countDocuments({libraryId: library_id})  // 查询总数
    res.send({
      code: 200,
      msg: '获取成功',
      data: {
        list: chapterList,
        currentPage: currentPage,
        pageSize: pageSize,
        count: count
      }
    })
  }
})


module.exports = router;
