var express = require('express')
var router = express.Router()
// 导入 用户的模型
const UserModel = require('../../models/UserModel')
const md5 = require('md5')

// 注册
router.get('/reg', (req, res) => {
  // 表单验证
  // 插入数据库
  // 响应HTML 内容
  res.render('auth/reg')
})

// 注册用户
router.post('/reg', (req, res) => {
  // 响应HTML 内容
  UserModel.create({ ...req.body, password: md5(req.body.password) })
    .then((data) => {
      res.render('success', { msg: '注册成功', url: '/login' })
    })
    .catch((err) => {
      res.status(500).send('注册失败')
    })
})

// 登录页面
router.get('/login', (req, res) => {
  res.render('auth/login')
})

// 登录操作
router.post('/login', (req, res) => {
  // 获取用户名和密码
  let { username, password } = req.body
  //查询数据库
  UserModel.findOne({ username: username, password: md5(password) }).then(
    (user) => {
      // 登录成功
      if (!user) {
        return res.send('登录失败')
      }
      // 写入session
      req.session.username = user.username
      req.session._id = user._id

      res.render('success', { msg: '登录成功', url: '/account' })
    }
  )
})

module.exports = router
