// 导入用户集合构造函数
const { User } = require('../../model/user')

module.exports = async (req, res) => {
  // 接受客户端传递过来的当前页面参数
  let page = req.query.page || 1
  // 每一页显示的条数
  let pageSize = 10
  // 查询用户的数据总数
  let count = await User.countDocuments({})
  // 总页数，向上取整
  let total = Math.ceil(count / pageSize)
  // 页码开始的位置
  let start = (page -1)*pageSize
  // 将用户信息从数据库中查询出来
  let users = await User.find({}).limit(pageSize).skip(start)
  // res.send(users)
  res.render('admin/user', {
    users, total, page
  })
}
