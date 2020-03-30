const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
// 引入body-parser，用来处理post请求参数
const bodyParser = require('body-parser')
// 引入express-session模块
const session = require('express-session')

const adminRouter = require('./routes/admin')
const homeRouter = require('./routes/home')

const app = express()

// 连接数据库
require('./model/connect')

// view engine setup
// 设置express框架模板所在位置
app.set('views', path.join(__dirname, 'views'))
// 设置express框架模板的默认后缀
app.set('view engine', 'html')
// 当渲染后缀为html的模板时，使用的模板引擎
app.engine('html', require('express-art-template'))

// 处理post请求
app.use(bodyParser.urlencoded({ extended: false }))
// 配置session
app.use(session({
  secret: 'secret',
  resave: false,//添加这行
  saveUninitialized: true//添加这行
}))

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// 拦截请求，判断用户登录状态
app.use('/admin',require('./middleware/loginGuard'))

// 为路由匹配请求路径
app.use('/admin', adminRouter)
app.use('/home', homeRouter)

// 错误处理中间件
app.use((err, req, res, next) => {
  // 反序列化字符串，将字符串转换为对象类型
  // JSON.parse()
  const result =JSON.parse(err)
  let params = []
  // [ 'message=密码比对失败，不能进行用户信息的修改', 'id=5e818db4ff08f809c421b7ba' ]
  // 遍历错误信息，构建数组结构，便于拼接时加上&分割符
  for (let attr in result) {
    if (attr !== 'path') {
      params.push(attr + '=' + result[attr])
    }
  }
  // 重定向到 /user-edit?message=密码比对失败，不能进行用户信息的修改&id=5e818db4ff08f809c421b7ba
  res.redirect(`${result.path}?${params.join('&')}`)
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
