//导入 mongoose
const mongoose = require('mongoose')
//创建文档的结构对象
//设置集合中文档的属性以及属性值的类型
// id不需要写,mogodb会自动生成id
let AccountSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, //必须有
    unique: true, //唯一的
  },
  time: Date,
  type: {
    type: Number, //收入/支出
    default: -1, //默认值
    enum: [1, -1], //枚举
  },
  account: {
    type: Number,
    required: true,
  },
  remarks: String,
})

//创建模型对象  对文档操作的封装对象
let AccountModel = mongoose.model('accounts', AccountSchema)

//暴露模型对象
module.exports = AccountModel
