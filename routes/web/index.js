const express = require('express')
// 导入moment
const moment = require('moment')
const AccountModel = require('../../models/AccountModebl')
// 导入中间件检测登录
const checkLoginMiddleware = require('../../middlewares/checkLoginMiddleware')
// 创建路由对象
const router = express.Router()

// 添加首页路由规则
router.get('/', (req, res) => {
  // 重定向 / account
  res.redirect('/account')
})

// 记账本的列表
router.get('/account', checkLoginMiddleware, async function (req, res, next) {
  // 修正：去掉重复的函数名"async"
  try {
    // 使用 await 直接获取查询结果（无需再调用 exec().then()）
    const accounts = await AccountModel.find().sort({ time: -1 })
    // 直接渲染数据
    res.render('list', { accounts, moment: moment })
  } catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
})

// 添加记录
router.get('/account/create', checkLoginMiddleware, function (req, res, next) {
  res.render('create')
})

//新增记录
router.post('/account', checkLoginMiddleware, async (req, res) => {
  const data = await AccountModel.create({
    ...req.body,
    // 时间
    time: moment(req.body.time).toDate(),
  }).catch((err) => {
    // 跳转到错误页面
    res.render('error', { msg: err })
    return
  })
  res.render('success', { msg: '新增成功', url: '/account' })
})

// 删除记录
router.get('/account/:id', checkLoginMiddleware, (req, res) => {
  // 获取id
  let id = req.params.id
  AccountModel.deleteOne({ _id: id })
    .then((data) => {
      res.render('success', { msg: '删除成功', url: '/account' })
    })
    .catch((err) => {
      res.render('error', { msg: err })
    })
})

module.exports = router
