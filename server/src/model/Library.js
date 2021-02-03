const mongoose = require('../db/mongodb')
const bcrypt = require('bcrypt')
// 建立书本表
const LibrarySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    // 作者
    author: {
      type: String,
      required: true
    },
    // 封面
    cover: {
      type: String
    },
    // 排序
    sort: {
      type: Number
    },
    // 浏览量
    pv: {
      type: Number,
      default: 0
    },
    // 描述
    description: {
      type: String
    },
    // 分类id
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'LibraryClass'
    },
    // 状态 1表示上架 0表示下架 2 表示审核
    status: {
      type: Number,
      default: 1
    },
    createTime: {
      type: Date,
      default: Date.now
    },
    updateTime: {
      type: Date,
      default: Date.now
    }
})

// 建立书库数据库模型
const Library = mongoose.model('Library', LibrarySchema)

module.exports = Library