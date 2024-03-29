const mongoose = require('../db/mongodb')
const bcrypt = require('bcrypt')
// 建立用户表
const ChapterSchema = new mongoose.Schema({
    chapter_name: {
      type: String,
      required: true
    },
    chapter_index: {
      type: Number,
      default: 0
    },
    description: {
      type: String
    },
    libraryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Library'
    },
    content: {
      type: String
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
const Chapter = mongoose.model('Chapter', ChapterSchema)

module.exports =  Chapter 
