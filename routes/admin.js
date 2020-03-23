const express = require('express')
const router = express.Router()

// 渲染登录页面
router.get('/login', require('./admin/loginPage'))

// 实现登录功能
router.post('/login', require('./admin/login'))

// 渲染用户列表页面
router.get('/user', require('./admin/userPage'))

// 实现退出功能
router.get('/logout', require('./admin/logout'))

// 渲染编辑用户页面
router.get('/user-edit', require('./admin/userEdit'))

// 渲染文章列表页面
router.get('/article', require('./admin/articlePage'))

// 渲染编辑文章页面
router.get('/article-edit', require('./admin/articleEdit'))

module.exports = router
