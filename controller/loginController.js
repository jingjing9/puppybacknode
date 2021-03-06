var loginModel=require('./../model/loginModel.js');

var loginController={
    login:function (req,res) {
        loginModel.login(req.query.luser,req.query.lpass,function (err,data) {
            if(err){
                console.log('数据库错误'+err);
            }else{
              
                if(data.length){
                    console.log(data,222222222222222222222222)
                    req.session.msg=data[0];
                    res.send({"state":0,"context":"成功",'data':data});
                }else{
                    res.send({"state":1,"context":"账号名或密码错误"});
                }
            }
        });
    },
    // register:function (req,res) {
    //     loginModel.register(req.body.ruser,function (err,data) {
    //         if(err){
    //             console.log('数据库错误')
    //         }else{
    //             if(data.length){
    //                 res.send({"state":1,"context":"用户名已经存在"})
    //             }else{
    //                 loginModel.add(req.body.rname,req.body.ruser,req.body.rpass,function (err,data) {
    //                     if(err){
    //                         console.log('数据库错误')
    //                     }else{
    //                         // res.send(req.body.rname)
    //                         res.send({"state":0,"context":"成功"})
    //                     }
    //                 });
    //             }
    //         }
    //     });
    // },

    pageone:function(req,res){

        res.render('index.html')

    },
    a:function (req,res) {

        // console.log(req.session)
        if(req.session.msg){
            //  console.log(req.session.msg)
            res.send({error:0,user:req.session.msg.admin_name})
          
        }else {
            res.send({error:1})
        }
    },
    
    clear_session:function (req,res) {
    //    console.log(req.session,111111111111111111)
        req.session.destroy() 
        // console.log(req.session,222222222222222)
    },

    picIndex:function (req,res) {
        loginModel.picIndex(function (err,data) {
            if(err){
                console.log('数据库错误')
            }else {
                res.send(data)
            }
        })
    },
    S_list:function (req,res) {
        loginModel.S_list(function (err,data) {
            if(err){
                console.log('数据库错误'+err);
            }else{
                    res.send({'data':data});
            }
    
        });
    },
    x_list:function (req,res) {
        loginModel.x_list(req.query.oSearch,req.query.oDate,function (err,data) {
            if(err){
                console.log('数据库错误'+err);
            }else{
                    res.send({'data':data});
            }
    
        });
    },


    s_class:function (req,res) {
        loginModel.s_class(function (err,data) {
            
            if(err){
                console.log('数据库错误')
            }else {
                res.send(data)
            }
        })
    },
    x_user:function (req,res) {
        loginModel.x_user(req.query.xuser,function (err,data) {
            if(err){
                console.log('数据库错误'+err);
            }else{
                res.send({'data':data});
              
            }
        });
    },
    b:function (req,res) {
        loginModel.b(function (err,data) {
            if(err){
                console.log('数据库错误'+err);
            }else{
                res.send({'data':data});
               
            }
        });
    },
    c:function (req,res) {
        loginModel.c(function (err,data) {
            if(err){
                console.log('数据库错误'+err);
            }else{
                res.send({'data':data});
              
            }
        });
    },
    d:function (req,res) {
        loginModel.d(function (err,data) {
            if(err){
                console.log('数据库错误'+err);
            }else{
                res.send({'data':data});
              
            }
        });
    },
};

module.exports=loginController;
