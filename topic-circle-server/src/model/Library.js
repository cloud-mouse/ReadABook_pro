const mongoose = require('../db/mongodb')
const bcrypt = require('bcrypt')
// 建立书本表
const LibrarySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    cover: {
      type: String
    },
    description: {
      type: String
    },
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'LibraryClass'
    },
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