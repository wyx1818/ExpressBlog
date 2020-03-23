// 创建用户集合
// 引入mongoose第三方模块
const mongoose = require('mongoose')
// 导入加密模块
const utility = require('utility')

// 创建用户集合规则
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    minlength: 2,
    maxlength: 20
  },
  email: {
    type: String,
    // 保证邮箱地址不重复
    unique: true,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  // admin 超级管理员
  // normal 普通用户
  role: {
    type: String,
    require: true
  },
  // 0启用状态
  // 1禁用状态
  state: {
    type: Number,
    default: 0
  }
})

// 创建集合
const User = mongoose.model('User', userSchema)

// const Salt = 'zuiyu'
// const pwdShaValue = utility.sha1('123456' + Salt)

// User.create({
//   username: 'zui',
//   email: '456@qq.com',
//   password: pwdShaValue,
//   role: 'admin',
//   state: 0
// }).then(() => console.log('用户创建成功')).catch((error) => {
//   console.log(error)
// })

// 将用户集合做为模块成员导出
module.exports = {
  User
}