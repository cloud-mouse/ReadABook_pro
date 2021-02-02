var express = require('express');
var router = express.Router();
const { User } = require('../../model/User')
const bcrypt = require('bcrypt')

// 引入 jwt
const jwt = require('jsonwebtoken')
// 解析 token 用的密钥
const { JWT_SECRET } = require('../../../config/index')
const checkToken = require('../../middleware/checkToken')

// 用户注册
router.post('/register', async (req, res, next) => {
  const user = await User.create({
    username: req.body.username,
    password: req.body.password
  })
  res.send(user)
});

// 用户登录
router.post('/login', async (req, res, next) => {
  const user = await User.findOne({
    username: req.body.username
  }).select('password')
  if (!user) {
    return res.status(422).send({
      code: 422,
      msg: '用户名不存在'
    })
  }
  // bcrypt.compareSync 解密匹配，返回 boolean 值
  const isPasswordValid = bcrypt.compareSync(
    req.body.password,
    user.password
  )
  if (!isPasswordValid) {
    return res.status(422).send({
      code:422,
      msg: '密码无效'
    })
  }
  /* 
  生成 token
  jwt.sign() 接受两个参数，一个是传入的对象，一个是自定义的密钥
  */
  const token = jwt.sign({ id: String(user._id) }, JWT_SECRET)
  res.send({
    code: 200,
    msg: '登录成功',
    data:{ user_id: user._id, token }
  })
});

// 获取用户信息
router.get('/info',checkToken, async (req, res, next) => {
  const user = await User.findOne({
    _id: req.user_id
  })
  res.send({
    code: 200,
    data: user
  }) 
})

// 获取用户列表
router.get('/list', checkToken, async(req, res, next)=>{
  const user = await User.find()
  res.send({
    code: 200,
    msg: '获取成功',
    data: user
  })
})

module.exports = router;
