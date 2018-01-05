const _ = require('lodash'),    keystone = require('keystone');/** * 初始话local * 包含因该在路由控制执行之前初始化的东西 * */exports.initLocals = function (req, res, next) {    const locals = res.locals;    locals.users = res.users;    next()};/** * 初始化错误处理函数到res中 * */exports.initErrorHandles = function (req, res, next) {    // 初始err到res中处理500错误    res.err = function (err, title, message) {        res.status(500).render('errors/500',{            err: err,            errorTitle: title,            errorMsg: message        })    };    // 初始notfound到res中，处理404错误    res.notfound = function (title, message) {        res.status(404).render('errors/404',{            errorTitle: title,            errorMsg: message        })    };    // 在视图渲染之前清理flashMessage    next()};exports.flashMessage = function (req, res, next) {    var flashMessages = {        info: req.flash('info'),        success: req.flash('success'),        warning: req.flash('warning'),        error: req.flash('danger')    };    req.locals.messages = _.some(flashMessages,function (msgs) {return msgs.length})? flashMessages : false;    next()};