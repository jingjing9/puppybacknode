//引入
var express=require('express');
var sxController=require('./../controller/sxController.js');

//定义的模块
var myRouter=express.Router();
myRouter.route('/clientList').get(sxController.clientList);
myRouter.route('/checkPurc').get(sxController.checkPurc);
myRouter.route('/purcList').get(sxController.purcList);
myRouter.route('/getcpage').get(sxController.getcpage);
myRouter.route('/addPurc').get(sxController.addPurc);
myRouter.route('/getPpage').get(sxController.addPurc);
myRouter.route('/checkList').get(sxController.checkList);
//导出模块
module.exports=myRouter;