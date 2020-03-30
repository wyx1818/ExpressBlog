const guard = (req, res, next) => {
  // 判断用户访问的是否是登录页面，以及用户的登录状态
  // 如果用户未登录，将请求重定向到登录页面
  if (req.url !== '/login' && !req.session.username) {
    res.redirect('/admin/login')
  } else {
    // 用户是登录状态将请求放行
    next()
  }
}

module.exports = guard
