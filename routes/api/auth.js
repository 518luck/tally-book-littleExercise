var express = require('express')
var router = express.Router()
// 导入 用户的模型
const UserModel = require('../../models/UserModel')
const md5 = require('md5')
// 导入jwt
const jwt = require('jsonwebtoken')

// 登录操作
router.post('/login', (req, res) => {
  // 获取用户名和密码
  let { username, password } = req.body
  //查询数据库
  UserModel.findOne({ username: username, password: md5(password) })
    .then((user) => {
      // 登录成功
      if (!user) {
        res.json({
          code: '2002',
          msg: '用户名或者密码错误~~~',
          data: null,
        })
        return
      }

      // 创建当前用户的token
      let token = jwt.sign(
        { username: user.username, _id: user._id },
        'itguigu',
        { expiresIn: 60 * 60 * 24 * 7 }
      )
      // 响应token
      res.json({
        code: '0000',
        msg: '登录成功',
        data: token,
      })

      res.render('success', { msg: '登录成功', url: '/account' })
    })
    .catch((err) => {
      res.json({
        code: '2001',
        msg: '数据库读取失败~~~',
        data: null,
      })
    })
})

// 退出登录
router.post('/logout', (req, res) => {
  // 清除session
  req.session.destroy()
  res.render('success', { msg: '退出成功', url: '/login' })
})

module.exports = router
