var express = require('express');
var router = express.Router();
const Chapter = require('../../model/Chapter')
const checkToken = require('../../middleware/checkToken')
var { upload_file } = require('../../middleware/common')

// 获取小说章节列表
router.get('/', checkToken, async (req, res, next) => {
  let { currentPage, pageSize, id } = req.query
  const chapterList = await Chapter.find({libraryId: id}).sort({"chapter_index": 1}).skip((currentPage - 1) * pageSize).limit(pageSize * 1)  // 分页查询
  const count = await Chapter.countDocuments({libraryId: id})  // 查询总数
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
})

// 更新章节
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

// 删除章节  这里是批量删除  
router.delete('/', checkToken, async (req, res, next) => {
  let { libraryId, _id } = req.query
  console.log(libraryId);
  let result = await Chapter.deleteMany({libraryId:libraryId })
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
  let id = data.id
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
    msg: '新增成功'
  })
})

// 章节导入
router.post('/imporChapter', checkToken, upload_file, async(req, res, next)=>{
  let {data, id} = req.result
  for (var i = 0, len = data.length; i < len; i++) {
    var is_has = await Chapter.find({chapter_name: data[i].chapter_name});
    if (is_has.length){
      res.send({
        code: 400,
        msg: '文件中含有非本书的章节，或章节已在其他书库存在'
      })
    }else {
      data[i].libraryId = id
      await Chapter.create(data[i])
    }
  }
  res.send({
    code: 200,
    msg: '章节导入成功'
  })
})

module.exports = router;
