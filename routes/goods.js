var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var Goods = require('../models/goods')
mongoose.connect('mongodb://59.110.143.210:27017/shop')

mongoose.connection.on('connected', function () {
  console.log('mongondb connected success')
})

mongoose.connection.on('error', function (err) {
  console.log(err)
  console.log('mongondb connected fail')
})

mongoose.connection.on('disconnected', function () {
  console.log('mongondb connected disconnected')
})

// 当数据库关闭连接的时候触发
mongoose.connection.on('disconnected', function () {
  console.log('Mongodb connected disconnected')
})

router.get('/list', function (req, res, next) {
  let skip = Math.floor(Math.random() * 1000 + 1)
  console.log(skip)
  let goodModel = Goods.find({}).limit(8).skip(skip)
  goodModel.exec({}, function (err, doc) {
    if (err) {
      res.json({
        status: 1,
        result: err.message
      })
    } else {
      res.json({
        status: 0,
        result: doc
      })
    }
  })
})

module.exports = router
