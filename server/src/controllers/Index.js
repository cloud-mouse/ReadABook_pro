// 引入书库和书库分类模型
var Library = require('../model/Library')
var LibraryClass = require('../model/LibraryClass')

// 定义首页控制器
const IndexController = {
  // 请求首页数据
  async getIndex(req, res) {
    try {
      let classList = await LibraryClass.find().lean()
      for (let i = 0; i < classList.length; i++) {
        classList[i].bookList = await Library.find({classId: classList[i]._id})
      }
      res.send({
        code: 200,
        msg: '请求成功',
        data: classList
      })  
    } catch (error) {
      res.send({
        code: 400,
        msg: '请求失败',
        data: error
      })
    }
  }
}

module.exports = IndexController