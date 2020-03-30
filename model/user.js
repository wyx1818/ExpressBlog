// 创建用户集合
// 引入mongoose第三方模块
const mongoose = require('mongoose')
// 导入加密模块
const bcrypt = require('bcryptjs')
// 引入 joi 格式验证模块
const Joi = require('joi')

// 创建用户集合规则
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    minlength: 2,
    maxlength: 12
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

// 设置加密强度
// const salt = bcrypt.genSaltSync(10)
// const hash = bcrypt.hashSync('123456', salt)
//
// User.create({
//   username: 'xsyy',
//   email: '456@qq.com',
//   password: hash,
//   role: 'admin',
//   state: 0
// }).then(() => console.log('用户创建成功')).catch((error) => {
//   console.log(error)
// })

// 验证用户信息
const validateUser = (user) => {
  // 定义验证规则
  const schema = {
    username: Joi.string().min(2).max(12).required().error(new Error('用户名格式不符合要求')),
    email: Joi.string().email().required().error(new Error('邮箱格式不符合要求')),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码格式不符合要求')),
    role: Joi.string().valid('normal', 'admin').required().error(new Error('角色值非法')),
    state: Joi.number().valid(0, 1).required().error(new Error('状态值非法'))
  }
  // 实施验证
  return Joi.validate(user, schema)
}

// 将用户集合做为模块成员导出
module.exports = {
  User,
  validateUser
}
