// 引入User模型
const { User } = require('../model/User')
// 引入 jwt
const jwt = require('jsonwebtoken')
// 解析 token 用的密钥
const { JWT_SECRET } = require('../../config/index')
// 验证token
let checkToken = async (req, res, next)=>{
  const token = String(req.headers.authorization.split(' ').pop())
  if(!token){
    res.send({
      code: 401,
      msg: 'token验证失败'
    })
  }
  // 解密 token 获取对应的 id
  jwt.verify(token, JWT_SECRET, (err,decode)=>{
    if(err) {
      res.send({
        code: 401,
        msg: err
      })
      return
    }
    let { id } = decode
    if(!id) {
      res.send({
        code: 401,
        msg: '当前用户信息不存在'
      })
    }else {
      req.user_id = id
      next()
    }
    // console.log(decode);
  })
  
}

module.exports = checkToken