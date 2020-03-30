const express = require('express')
const router = express.Router()

// 渲染登录页面
router.get('/login', require('./admin/loginPage'))

// 实现登录功能
router.post('/login', require('./admin/login'))

// 实现退出功能
router.get('/logout', require('./admin/logout'))

// 渲染用户列表页面
router.get('/user', require('./admin/userPage'))

// 渲染编辑用户页面
router.get('/user-edit', require('./admin/userEdit'))

// 实现添加用户功能
router.post('/user-add',require('./admin/userEditFn'))

// 实现用户修改功能
router.post('/user-modify', require('./admin/userModify'))

// 渲染文章列表页面
router.get('/article', require('./admin/articlePage'))

// 渲染编辑文章页面
router.get('/article-edit', require('./admin/articleEdit'))

module.exports = router
