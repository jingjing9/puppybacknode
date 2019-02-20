var sxModel=require('./../model/sxModel.js');
var sxController={
    clientList:function (req,res) {
        sxModel.clientList(req.query.page,function(err,data){
            if(err){
                console.log('数据库报错');
            }else{
                for(var i=0;i<data.length;i++){
                    var key='cliTotal'
                    data[i][key]=0;
                }
               sxModel.clientOrder(function(err,data1){
                  if(err){
                      console.log('数据库报错');
                  }else{
                     for(var i=0;i<data1.length;i++){
                         for(var j=0;j<data.length;j++){
                             if(data1[i].user_id==data[j].cliId){
                                 data[j][key]=data1[i].total;
                             }
                         }
                     };

                  }
               });
                setTimeout(function () {
                    var arr=data.slice((req.query.page-1)*6,6*req.query.page);
                    res.send(arr);
                },100)

            }
        })
    },
    checkPurc:function (req,res) {
        sxModel.checkPurc(req.query.id,function (err,data) {
            if(err){
                console.log(err);
            }else{
                for(var i=0;i<data.length;i++){
                    data[i].now_price='￥'+data[i].now_price+'.00';
                }
                res.send(data);
            }
        })
    },
    purcList:function (req,res) {
        sxModel.purcList(req.query.page,function (err,data) {
            if(err){
                console.log(err);
            }else{
                for(var i=0;i<data.length;i++){
                    data[i].purcNum=data.length-data[i].purcNum+1;
                    var oDate=new Date(data[i].purcTime);
                    data[i].purcTime=oDate.toLocaleString();
                }
                var arr=data.slice((req.query.page-1)*6,6*req.query.page);
                res.send(arr);
            }
        })
    },
    getcpage:function (req,res) {
        sxModel.getcpage(function (err,data) {
            if(err){
                console.log(err);
            }else{
                res.send(data);
            }
        })
    },
    getPpage:function (req,res) {
        sxModel.getPpage(function (err,data) {
            if(err){
                console.log(err);
            }else{
                res.send(data);
            }
        })
    },
    addPurc:function (req,res) {
        sxModel.addPurc(req.query.name,req.query.size,req.query.price,req.query.num,req.query.total,req.query.person,req.query.tel,req.query.time,function (err,data) {
            if(err){
                console.log(err);
            }else{
                res.send(data);
            }
        })
    },
    checkList:function (req,res) {
        sxModel.clientList(req.query.str,function (err,data) {
            if(err){
                console.log(err);
            }else{
                let arr=[];
                for(var i=0;i<data.length;i++){
                    if(JSON.stringify(data[i]).indexOf(req.query.str)>-1){
                        arr.push(data[i]);
                    }
                }
                for(var i=0;i<arr.length;i++){
                    var key='cliTotal'
                    arr[i][key]=0;
                }
                sxModel.clientOrder(function(err,data1){
                    if(err){
                        console.log('数据库报错');
                    }else{
                        for(var i=0;i<data1.length;i++){
                            for(var j=0;j<arr.length;j++){
                                if(data1[i].user_id==arr[j].cliId){
                                    arr[j][key]=data1[i].total;
                                }
                            }
                        };
                        console.log(arr);
                        res.send(arr);
                    }
                });



            }
        })
    }

};

module.exports=sxController;