/**
 * Created by 86275 on 2018/11/12.
 */
var express = require('express');//引入express框架
var favicon = require('serve-favicon');//引入图标框架
var morgan = require('morgan');//引入日志模块
var bodyParser = require('body-parser');//引入post请求的模块
var ejs = require('ejs');
var app=express();//搭建服务
var cookie = require('cookie-parser');//引入cookie
var session = require('express-session');//引入session
app.use(morgan('dev'));//配日志
//配置静态文件访问地址 方法一
app.use(express.static(__dirname+'/public')); //两个下划线dirname绝对路径
app.use(favicon(__dirname+'/public/favicon.ico'));//配置图标地址
//使用post请求
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
//配置视图路径
app.set('views',__dirname+'/view');
//配置html格式为模板引擎
app.engine('html',ejs.__express);
//设置模板引擎的类型
app.set('view engine','html');
app.use(cookie());
//使用session
app.use(session({
    secret:'aaa',//一个字符串，session的签名
    name:'demo',//返回给客户端cookie的key值
    cookie:{maxAge:300000},//设置失效时间
    rolling:true,//是否更新失效时间
    resave:true//重新保存
}));
//路由拦截
//  app.all('*',function (req,res,next) {
//       if(req.session.msg){
//               next();
//       }else {
//           if(req.url == '/login' || req.headers.referer == ' http://localhost:8080'){
//               next();
//           }else {
//               res.redirect('/login')
//           }
//       }
//   });
//设置允许跨域请求
app.all('*',function(req,res,next){
    // res.header('Access-Control-Allow-Origin',' http://localhost:8080');
    // res.header('Access-Control-Allow-Credentials', true);
    // res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    // res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS');
    // res.header('X-Powered-By','3.2.1');
    // res.header('Content-Type','application/json;charset=utf-8');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",'3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    //设为指定的域
    res.header('Access-Control-Allow-Origin', "http://localhost:8080");
    //设置Access-Control-Allow-Credentials为true
    res.header('Access-Control-Allow-Credentials', true); 
    next();
});
//宋子瑜
var loginRoute = require('./routes/loginRoute.js');
app.use(loginRoute);
//何静
var Order = require('./routes/OrderRouter.js');
app.use(Order);
//唐开峰
var productListRouter = require('./routes/productListRoute.js');
var productDetailsRouter = require('./routes/productDetailsRoute.js');
app.use(productListRouter);
app.use(productDetailsRouter);
//苏建建
var sxRoute=require('./routes/sxRoute.js');
app.use(sxRoute);






app.listen(1235,function () {  //配置端口号
    console.log('项目启动')
});




//----客服聊天----
var ws = require('ws').Server;
//创建服务
var server = new ws({
    host: '172.16.8.86',
    port: 9999
});
//配置服务功能
var arr = new Array(); //存放客户端链接
var ip = ['172.16.8.86']//设置默认本机ip
let newArr = []; //去重后的ip地址
let userName = ['客服']; // 存放发送人的name;
let newUserName = []; //存放区重之后的发送人name
let userNameIp = []; // 存放发送消息人的ip
let newUserNameIp = ['172.16.8.86'] // 存放去重发送消息之后的发送人ip
let index = 0
//当有客户端和我建立连接的时候
server.on('connection', function (ws, req) { //ws是当前链接的对象
    arr.push(ws);
    var ipAdd = req.connection.remoteAddress

    //当这个人发送消息的时候
    ip.push(ipAdd)
    for (let i = 0; i < ip.length; i++) {
        if (newArr.indexOf(ip[i]) == -1) {
            newArr.push(ip[i]);
        }
    }
    console.log('有人进来了',newArr);
    ws.on('message', function (data) { //发送的消息
        let dataName = JSON.parse(data)
        if (typeof (dataName) == 'object') {
            if (ipAdd == '172.16.8.86') {
                for (let i = 0; i < newArr.length; i++) {
                    if (newArr[i] == newUserNameIp[index]) {
                        arr[i].send(data)
                        arr[0].send(data)
                    }
                }
            } else {
                userName.push(dataName.name)
                userNameIp.push(ipAdd)
                for (let i = 0; i < userName.length; i++) {
                    if (newUserName.indexOf(userName[i]) == -1) {
                        newUserName.push(userName[i]);
                    }
                }
                for (let i = 0; i < userNameIp.length; i++) {
                    if (newUserNameIp.indexOf(userNameIp[i]) == -1) {
                        newUserNameIp.push(userNameIp[i]);
                    }
                }
                for (let i = 0; i < newUserNameIp.length; i++) {
                    if (newUserNameIp[i] == ipAdd) {
                        let addIP = newUserNameIp[i]
                        for (let j = 0; j < newArr.length; j++) {
                            if (newArr[j] == addIP) {
                                arr[j].send(data)
                                arr[0].send(data)
                            }
                        }
                    }
                }
            }
        } else {
            console.log('我收到了用户name');
            for (let i = 0; i < newUserName.length; i++) {
                if (`"${newUserName[i]}"` == data) {
                    console.log(newUserNameIp[i]);
                    index = i;
                }
            }
        }
    });
    //当这个人断开链接
    ws.on('close', function () {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == ws) {
                arr.splice(i, 1);
                break;
            }
        }
    })
});
