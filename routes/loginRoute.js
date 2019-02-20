//引入
var express=require('express');
var loginController=require('./../controller/loginController.js');
//定义的模块
var myRouter=express.Router();

myRouter.route('/login').get(loginController.login);

// myRouter.route('/register').post(loginController.register);


myRouter.route('/pageone').get(loginController.pageone);


myRouter.route('/a').get(loginController.a);

myRouter.route('/clear_session').get(loginController.clear_session);


// myRouter.route('/costume').get(loginController.getCostume);

myRouter.route('/pageone').get(loginController.pageone);


myRouter.route('/a').get(loginController.a);

myRouter.route('/clear_session').get(loginController.clear_session);

//首页
myRouter.route('/picIndex').get(loginController.picIndex);


myRouter.route('/test').get(function () {
    console.log('haha')
});

myRouter.route('/S_list').get(loginController.S_list);

myRouter.route('/x_user').get(loginController.x_user);
myRouter.route('/b').get(loginController.b);

myRouter.route('/c').get(loginController.c);
myRouter.route('/d').get(loginController.d);


myRouter.route('/x_list').get(loginController.x_list);



// myRouter.route('/costume').get(loginController.getCostume);
//导出模块
module.exports=myRouter;
