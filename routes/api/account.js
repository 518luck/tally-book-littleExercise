var express = require('express')
var router = express.Router()
// 导入moment
const moment = require('moment')
const AccountModel = require('../../models/AccountModebl')
const checkTokenMiddleware = require('../../middlewares/checkTokenMiddleware')

// 记账本的列表
router.get('/account', checkTokenMiddleware, async function (req, res, next) {
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
  } catch (err) {
    //  失败的处理
    res.json({
      code: '1001',
      msg: '获取失败',
      data: err,
    })
  }
})

//新增记录
router.post('/account', checkTokenMiddleware, async (req, res) => {
  const data = await AccountModel.create({
    ...req.body,
    // 时间
    time: moment(req.body.time).toDate(),
  }).catch((err) => {
    // 跳转到错误页面
    res.json({
      code: '1002',
      msg: '创建失败',
      data: null,
    })
    return
  })
  res.json({
    code: '0000',
    msg: '新增成功',
    data: data,
  })
})

// 删除记录
router.delete('/account/:id', checkTokenMiddleware, (req, res) => {
  // 获取id
  let id = req.params.id
  AccountModel.deleteOne({ _id: id })
    .then((data) => {
      res.json({
        code: '0000',
        msg: '删除成功',
        data: {},
      })
    })
    .catch((err) => {
      res.json({
        code: '1003',
        msg: '删除失败',
        data: null,
      })
    })
})

// 获取单个账单信息
router.get('/account/:id', checkTokenMiddleware, async (request, response) => {
  // 获取id参数
  let { id } = request.params
  // 查询数据库
  const data = await AccountModel.findById({ _id: id })
    .then((data) => {
      response.json({
        code: '0000',
        msg: '获取成功',
        data: data,
      })
    })
    .catch((err) => {
      response.json({
        code: '1004',
        msg: '获取失败',
        data: null,
      })
    })
})

// 更新单个账单信息
router.patch(
  '/account/:id',
  checkTokenMiddleware,
  async (request, response) => {
    // 获取id参数
    let { id } = request.params
    // 更新数据库
    const data = await AccountModel.updateOne({ _id: id }, { ...request.body })
    // 再次查询数据库,获取单挑数据
    AccountModel.findById({ _id: id }).then((data) => {
      response
        .json({
          code: '0000',
          msg: '更新成功',
          data: data,
        })
        .catch(() => {
          response.json({
            code: '1005',
            msg: '更新失败',
            data: null,
          })
        })
    })
  }
)

module.exports = router
