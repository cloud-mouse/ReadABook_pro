// 引入 mongoose 
const mongoose = require('mongoose')

// 连接数据库，自动新建 ExpressAuth 库
mongoose.connect('mongodb://localhost:27017/ExpressAuth', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})

module.exports = mongoose