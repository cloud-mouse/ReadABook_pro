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
  try {
    await User.create({
      username: req.body.username,
      password: req.body.password
    })
  } catch (error) {
    res.send({
      code: error.code,
      msg: error.code===11000?'账号重复': '注册失败，请联系管理员'
    }) 
    return
  }
  res.send({
    code: 200,
    msg:'注册成功'
  })
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

// 新增用户
router.post('/', checkToken, async(req, res, next)=>{
  let data = req.body
  try {
   var result = await User.create(data)
  } catch (error) {
    res.send({
      code: error.code,
      msg: error.code===11000?'账号重复': '新增失败'
    }) 
    return
  }
  res.send({
    code: 200,
    msg:'新增成功',
    data: result
  })
})

// 更新书本
router.put('/', checkToken, async (req, res, next) => {
  let data = req.body
  let updateTime = new Date()
  data.updateTime =  updateTime
  try {
    await User.findByIdAndUpdate(data._id, data) 
  } catch (error) {
    res.send({
      code: error.code,
      msg: error.codeName==='DuplicateKey'?'账号重复': '更新失败'
    }) 
    return
  }
  res.send({
    code: 200,
    msg: '更新成功',
  })
})

// 删除用户
router.delete('/', checkToken, async (req, res, next) => {
  let id = req.query._id
  let result = await User.findOneAndDelete({_id: id})
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

// 获取用户列表
router.get('/list', checkToken, async(req, res, next)=>{
  let { currentPage, pageSize, keywords, _id} = req.query
  const reg = new RegExp(keywords, 'i') //不区分大小写
  let query = {
    $or : [
      {username : {$regex : reg}},
      {realname : {$regex : reg}}
    ],
  }
  // 查询用户详情
  if(_id){
    const data = await User.findById(_id)
    if(data){
      res.send({
        code: 200,
        msg: '获取成功',
        data: data
      })
    }
  }else {
    // 查询用户列表
    const list = await User.find(query).skip((currentPage - 1) * pageSize).sort({sort:-1}).limit(pageSize * 1)  // 分页查询
    const count = await User.countDocuments(query)  // 计数
    res.send({
      code: 200,
      msg: '获取成功',
      data: {
        list: list,
        currentPage: currentPage,
        pageSize: pageSize,
        count: count
      }
    })
  }
})

module.exports = router;
