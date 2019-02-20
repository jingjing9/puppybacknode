/**
 * Created by 91275 on 2019/1/3.
 */
var OrderModel = require('./../model/OrderModel.js');
var OrderController = {
    returner:function (req,res) {
                OrderModel.returner(function (err,data) {
                    if(err){
                        console.log('渲染退货页面数据库报错')
                    }else {
                        var iNow = 0;
                        var arr=data;
                        var arr1 = [];
                        arr1[0]=[];
                        arr1[0].push(arr[0]);
                        var currentValue = arr[0];
                        for (var i = 1; i < arr.length ; i++)
                        {
                            if (currentValue.order_id == arr[i].order_id){
                                arr1[iNow].push(arr[i])
                            }else{
                                currentValue = arr[i];
                                iNow++;
                                arr1[iNow] = [];
                                arr1[iNow].push(arr[i])
                            }
                        }
                        var arr=arr1.slice(( req.query.nowPage-1)*5,5*req.query.nowPage);
                        var num = Math.ceil(arr1.length/5);
                        res.send({error:0,data:arr,page1:num})
                    }
                });
    },
    returnGetPage:function (req,res) {
        OrderModel.returnGetPage(function (err,data1) {
            if(err){
                console.log('获取页数失败')
            }else {
                var iNow = 0;
                var arr=data1;
                var arr1 = [];
                arr1[0]=[];
                arr1[0].push(arr[0]);
                var currentValue = arr[0];
                for (var i = 1; i < arr.length ; i++)
                {
                    if (currentValue.order_id == arr[i].order_id){
                        arr1[iNow].push(arr[i])
                    }else{
                        currentValue = arr[i];
                        iNow++;
                        arr1[iNow] = [];
                        arr1[iNow].push(arr[i])
                    }
                }
                var num = Math.ceil(arr1.length/2);
                res.send({error:0,page1:num})
            }
        });
    },
    auditing:function (req,res) {
        OrderModel.auditing(req.query.order_id,req.query.order_return,function (err,data1) {
                res.send({err:0})
        })
    },
    returnSuccess:function (req,res) {

        OrderModel.returnSuccess(req.body.order_id,function (err,data1) {
            res.send({err:0})
        })
    },
    searchReturn:function(req,res){
        var searchType = parseInt(req.query.searchType);
        var str = req.query.str;
        var ser='';
        var val;
            if(searchType==1){
                ser='order_id';//按订单号查询
                val = parseInt(str);

            }else {
                if(searchType==2){
                    ser='order_return';
                    switch (str) {
                        case '买家已提交退货物流': val=3;break;
                        case '已寄回': val=3;break;
                        case '买家已填写物流': val=3;break;
                        case '待审核': val=1;break;
                        case '未审核': val=1;break;
                        case '等待退款': val=4;break;
                        case '同意买家寄回': val=2;break;
                        case '同意退货申请': val=2;break;
                        case '已退款': val=5;break;
                    }
                }else {
                    ser='order_return';
                    switch (str) {
                        case '未审核': val=1;break;
                        case '已审核': val=6;break;
                        case '待审核': val=1;break;
                        case '审核通过': val=6;break;
                    }

                }
            }
            OrderModel.searchReturn(ser,val,function (err,data) {
                if(err){
                    console.log('搜索失败')
                }else {
                    console.log('搜索成功');
                    if(data.length!=0){
                        var iNow = 0;
                        var arr=data;
                        var arr1 = [];
                        arr1[0]=[];
                        arr1[0].push(arr[0]);
                        var currentValue = arr[0];
                        for (var i = 1; i < arr.length ; i++)
                        {
                            if (currentValue.order_id == arr[i].order_id){
                                arr1[iNow].push(arr[i])
                            }else{
                                currentValue = arr[i];
                                iNow++;
                                arr1[iNow] = [];
                                arr1[iNow].push(arr[i])
                            }
                        }
                        var arr=arr1.slice(( req.query.nowPage-1)*5,5*req.query.nowPage);
                        var num = Math.ceil(arr1.length/5);
                        res.send({error:0,data:arr,page1:num})
                    }else {
                        res.send({error:1})
                    }
                }
            });
    },
    searchOrder:function(req,res){
        var searchType = parseInt(req.query.searchType);
        var str = req.query.str;
        var ser='';
        var val;
        if(searchType==2){//按发货状态查询
               ser='order_num';
            switch (str) {
                case '未发货': val=7;break;
                case '没发货': val=7;break;
                case '已发货': val=8;break;
                case '发货': val=8;break;
            }
        }else {
            if(searchType==3){//订单状态查询
                ser='order_state';
                switch (str) {
                    case '待付款': val=1;break;
                    case '已付款': val=4;break;
                    case '退货退款': val=2;break;
                    case '退款': val=2;break;
                    case '仅退款': val=3;break;
                    case '已确认收货': val=5;break;
                    case '确认收货': val=5;break;
                }
            }else {
                    ser = 'order_id';
                    val = parseInt(str);
            }

        }
        OrderModel.searchOrder(ser,val,function (err,data) {
            if(err){
                console.log('搜索失败')
            }else {
                console.log('搜索成功');
                if(data.length!=0){
                    var iNow = 0;
                    var arr=data;
                    var arr1 = [];
                    arr1[0]=[];
                    arr1[0].push(arr[0]);
                    var currentValue = arr[0];
                    for (var i = 1; i < arr.length ; i++)
                    {
                        if (currentValue.order_id == arr[i].order_id){
                            arr1[iNow].push(arr[i])
                        }else{
                            currentValue = arr[i];
                            iNow++;
                            arr1[iNow] = [];
                            arr1[iNow].push(arr[i])
                        }
                    }
                    var arr=arr1.slice(( req.query.nowPage-1)*5,5*req.query.nowPage);
                    var num = Math.ceil(arr1.length/5);
                    res.send({error:0,data:arr,page1:num})
                }else {
                    res.send({error:1})
                }
            }
        });
    },
    orderGetPage:function (req,res) {
        OrderModel.orderGetPage(function (err,data1) {
            var iNow = 0;
            var arr=data1;
            var arr1 = [];
            arr1[0]=[];
            arr1[0].push(arr[0]);
            var currentValue = arr[0];
            for (var i = 1; i < arr.length ; i++)
            {
                if (currentValue.order_id == arr[i].order_id){
                    arr1[iNow].push(arr[i])
                }else{
                    currentValue = arr[i];
                    iNow++;
                    arr1[iNow] = [];
                    arr1[iNow].push(arr[i])
                }
            }
              var num = Math.ceil(arr1.length/5);
         res.send({error:0,page1:num})
        })

    },
    order:function (req,res) {
        OrderModel.orderGetPage(function (err,data) {
            if(err){
                console.log('渲染订单页面数据库报错')
            }else {
                var iNow = 0;
                var arr=data;
                var arr1 = [];
                arr1[0]=[];
                arr1[0].push(arr[0]);
                var currentValue = arr[0];
                for (var i = 1; i < arr.length ; i++)
                {
                    if (currentValue.order_id == arr[i].order_id){
                        arr1[iNow].push(arr[i])
                    }else{
                        currentValue = arr[i];
                        iNow++;
                        arr1[iNow] = [];
                        arr1[iNow].push(arr[i])
                    }
                }
                var arr=arr1.slice(( req.query.nowPage-1)*5,5*req.query.nowPage);
                var num = Math.ceil(arr1.length/5);
                res.send({error:0,data:arr,page1:num})
            }
        });
    },
    editAddress:function (req,res) {
        OrderModel.editAddress(req.query.order_com,req.query.order_num,req.query.order_id,function (err,data) {
            if(err){
                console.log('编辑物流信息出错')
            }else {
                console.log('编辑物流信息成功');
                res.send({error:0})
            }
        })
    },
    editAddr1:function (req,res) {
        OrderModel.editAddr1(req.body.order_id,function (err,data) {
            if(err){
                console.log('查询user_id出错')
            }else {
                console.log('查询user_id成功');
                res.send({data:data})
            }
        })
    },
    editAddr2:function (req,res) {
        OrderModel.editAddr2(req.body.user_id,req.body.add_person,req.body.add_tel,req.body.a_address,function (err,data) {
            if(err){
                console.log('查询add_id出错')
            }else {
                console.log('查询add_id成功');
                res.send({data:data})
            }
        })
    },
    editAddr3:function (req,res) {
        OrderModel.editAddr3(parseInt(req.body.user_id),req.body.add_person,req.body.add_tel,req.body.a_address,function (err,data) {
            if(err){
                console.log('插入t_address表出错')
            }else {
                console.log('插入t_address表成功');
                res.send({data:data})
            }
        })
    },
    editAddr4:function (req,res) {
        OrderModel.editAddr4(parseInt(req.body.add_id),parseInt(req.body.order_id),function (err,data) {
            if(err){
                console.log('更改add_id出错')
            }else {
                console.log('更改add_id成功');
                res.send({data:data})
            }
        })
    },
    editAddr5:function (req,res) {
        OrderModel.editAddr5(function (err,data) {
            if(err){
                console.log('查找当前最大add_id出错')
            }else {
                console.log('查找当前最大add_id成功');
                res.send({data:data})
            }
        })
    }
};
//导出模块
module.exports = OrderController;