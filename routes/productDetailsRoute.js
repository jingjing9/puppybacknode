var express = require('express');
var productDetailsControll = require('../controller/productDetailsControll.js')
var productDetailsRouter = express.Router();

productDetailsRouter.route('/ProductDetails').get(productDetailsControll.data);

module.exports= productDetailsRouter;