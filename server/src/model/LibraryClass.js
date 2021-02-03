const mongoose = require('../db/mongodb')
const bcrypt = require('bcrypt')
// 建立书本表
const LibraryClassSchema = new mongoose.Schema({
    class_name: {
      type: String,
      required: true
    },
    pid: {
      type: Number,
      default: 0
    },
    icon: {
      type: String,
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

// 建立用户数据库模型
const LibraryClass = mongoose.model('LibraryClass', LibraryClassSchema)

module.exports = LibraryClass
