/**
 * Created by 91275 on 2019/1/3.
 */

//引入express
var express = require('express');
//创建router对象
var myRouter = express.Router();
//引入自定义的控制层的模块
var OrderController = require('./../controller/OrderControll.js');
//控制路由
// get方法

myRouter.route('/returner').get(OrderController.returner);//退货管理页数据
myRouter.route('/returnGetPage').get(OrderController.returnGetPage);//退货管理页获取页数
myRouter.route('/auditing').get(OrderController.auditing);//审核
myRouter.route('/returnSuccess').post(OrderController.returnSuccess);//立即退款
myRouter.route('/searchReturn').get(OrderController.searchReturn);//搜索结果页面数据



myRouter.route('/orderGetPage').get(OrderController.orderGetPage);//订单管理获取页数
myRouter.route('/order').get(OrderController.order);//订单管理页数据
myRouter.route('/editAddress').get(OrderController.editAddress);//编辑物流信息

myRouter.route('/searchOrder').get(OrderController.searchOrder);//搜索结果页面数据
myRouter.route('/editAddr1').post(OrderController.editAddr1);//查询user_id
myRouter.route('/editAddr2').post(OrderController.editAddr2);//查询该用户是否已有该地址
myRouter.route('/editAddr4').post(OrderController.editAddr4);//查询该用户已有该地址
myRouter.route('/editAddr3').post(OrderController.editAddr3);//该用户没有该地址  将地址信息插入t_address表
myRouter.route('/editAddr5').post(OrderController.editAddr5);//查找当前最大的add_id
//导出模块
module.exports = myRouter;