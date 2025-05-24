var express = require('express')
var router = express.Router()

// 导入moment
const moment = require('moment')
const AccountModel = require('../../models/AccountModebl')

// 记账本的列表
router.get('/account', async function (req, res, next) {
  // 修正：去掉重复的函数名"async"
  try {
    // 使用 await 直接获取查询结果（无需再调用 exec().then()）
    const accounts = await AccountModel.find().sort({ time: -1 })
    // 响应成功的提示
    res.json({
      // 响应编号
      code: '0000',
      // 响应信息
      msg: '获取成功',
      // 响应数据
      data: accounts,
    })
    // 直接渲染数据
  } catch (err) {
    //  失败的处理
    res.json({
      code: '1001',
      msg: '获取失败',
      data: err,
    })
  }
})

// 添加记录
router.get('/account/create', function (req, res, next) {
  res.render('create')
})

//新增记录
router.post('/account', async (req, res) => {
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
router.get('/account/:id', (req, res) => {
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
