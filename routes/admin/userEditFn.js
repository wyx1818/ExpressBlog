// 引入用户规则
const { User, validateUser } = require('../../model/user')
// 导入加密模块
const bcrypt = require('bcryptjs')

module.exports = async (req, res, next) => {

  // 验证未通过会抛出异常，所以需要使用try catch捕获
  try {
    await validateUser(req.body)
  } catch (e) {
    // 重定向回用户添加页面
    // JSON.stringify() 将对象数据类型转换为字符串数据类型
    return next(JSON.stringify({ path: '/admin/user-edit', message: e.message }))
  }

  // 根据邮箱地址，查询用户是否存在
  let user = await User.findOne({ email: req.body.email })
  // 如果user查询到用户存在，表示邮箱地址以及被占用
  if (user) {
    return next(JSON.stringify({ path: '/admin/user-edit', message: '邮箱地址以及被占用' }))
  }

  // 对密码进行加密处理
  // 生成随机字符串
  const salt = await bcrypt.genSalt(10)
  // 加密
  // 替换密码
  req.body.password = await bcrypt.hash(req.body.password, salt)
  // 将用户信息，添加到数据库中
  await User.create(req.body)
  // 将页面重定向到用户列表页面
  res.redirect('/admin/user')
}
