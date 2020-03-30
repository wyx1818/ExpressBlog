// 导入用户集合构造函数，之前导出的是一个集合，需要解构
const { User } = require('../../model/user')
// 导入加密模块
const bcrypt = require('bcryptjs')

module.exports = async (req, res) => {
  // 接受请求参数，只有前端验证不安全，需要后端进行验证
  const { email, password } = req.body
  // 如果用户没有输入邮件地址
  if (email.trim().length === 0 || password.trim().length === 0) {
    return res.status(400).render('admin/error', { msg: '邮件地址或密码错误' })
  }
  // 根据邮箱地址查询用户信息
  // 如果查询到了用户，user变量的值为对象类型
  // 如果没有查询到用户，user变量为空
  let user = await User.findOne({ email })
  // 查询到了用户
  if (user) {
    // 将客户端传递过来的密码和用户信息中的密码进行比对
    if (bcrypt.compareSync(password, user.password)) {
      // 将用户名存储在请求对象中
      req.session.username = user.username
      req.app.locals.UserInfo = user
      res.redirect('/admin/user')
    } else {
      return res.status(400).render('admin/error', { msg: '邮件地址或密码错误' })
    }
  } else {
    // 没有查询到用户
    return res.status(400).render('admin/error', { msg: '邮件地址或密码错误' })
  }
}

