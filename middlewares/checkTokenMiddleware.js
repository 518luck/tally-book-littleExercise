const jwt = require('jsonwebtoken')
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

  jwt.verify(token, 'itguigu', async (err, data) => {
    // 检测token是否正确
    if (err) {
      return res.json({
        code: '2004',
        msg: 'token错误',
        data: null,
      })
    }

    // token校验成功
    next()
  })
}
