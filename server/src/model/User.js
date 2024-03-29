const mongoose = require('../db/mongodb')
const bcrypt = require('bcrypt')
// 建立用户表
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        set(val){
            return bcrypt.hashSync(val, 10)
        },
        select: false
    },
    phone: {
        type: String
    },
    realname: {
        type: String
    },
    avator: {
        type: String
    },
    status: {
        type: Number,
        default: 0
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
const User = mongoose.model('User', UserSchema)

module.exports = { User }
