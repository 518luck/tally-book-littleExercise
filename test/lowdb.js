const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
// 获取db对象
const db = low(adapter)

// 初始化数据
// db.defaults({ posts: [], user: {} }).write()

// 写入数据
// db.get('posts').push({ id: 2, title: 'lowdb is awesome' }).write()

// 获取单条数据
// console.log(db.get('posts').find({ id: 2 }).value())

// 获取数据
// console.log(db.get('posts').value())

// 删除数据
// db.get('posts').remove({ id: 3 }).write()

// 更新数据
// db.get('posts').find({ id: 1 }).assign({ title: '更新数据' }).write()
