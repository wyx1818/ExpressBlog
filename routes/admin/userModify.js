// 导入用户信息集合函数
const { User } = require('../../model/user')
// 导入加密模块
const bcrypt = require('bcryptjs')

module.exports = async (req, res, next) => {
  // 即将要修改的用户id
  const id = req.query.id
  // 接受客户端传递过来的请求参数
  const { username, email, role, state, password } = req.body

  // 查询数据库中要修改的用户信息
  let user = await User.findOne({ _id: id })
  // 密码比对
  const isValid = await bcrypt.compare(password, user.password)

  if (isValid) {
    // 密码比对成功
    // 将用户信息更新到数据库中
    await User.updateOne({ _id: id }, {
      username: username,
      email: email,
      role: role,
      state: state
    })
    // 重定向到用户列表页面
    res.redirect('/admin/user')
  } else {
    // 密码比对失败
    let obj = { path: '/admin/user-edit', message: '密码比对失败，不能进行用户信息的修改', id: id }
    next(JSON.stringify(obj))
  }
}
