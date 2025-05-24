const jwt = require('jsonwebtoken')
const { secret } = require('../config/config')
// 声明中间件token验证
module.exports = (req, res, next) => {
  // 获取token
  let token = req.get('token')

  if (!token) {
    return res.json({
      code: '2003',
      msg: 'token缺失',
      data: null,
    })
  }

  jwt.verify(token, secret, async (err, data) => {
    // 检测token是否正确
    if (err) {
      return res.json({
        code: '2004',
        msg: 'token错误',
        data: null,
      })
    }

    // 保存用户信息
    req.user = data
    // token校验成功
    next()
  })
}
