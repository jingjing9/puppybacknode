var mysql=require('mysql');
var db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'puppyshop'
});
var sxModel={
    clientList:function (page,fn) {
        var sql="SELECT  user_id AS cliId,user_name AS cliName,u_user AS cliTel FROM t_user;";
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    clientOrder:function (fn) {
        var sql='SELECT *,SUM(order_buynum*now_price) AS total\n' +
            'FROM t_orderdet\n' +
            'LEFT JOIN t_goods\n' +
            'USING(goods_id)\n' +
            'GROUP BY user_id;';
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    checkPurc:function (num,fn) {
        var sql='SELECT order_day,order_time,order_num,now_price,goods_name\n' +
            'FROM t_order\n' +
            'LEFT JOIN t_orderdet\n' +
            'USING (order_id)\n' +
            'LEFT JOIN t_goods\n' +
            'USING(goods_id)\n' +
            'WHERE user_id="'+num+'" AND order_num!=\'\';';
        db.query(sql,function (err,data) {
            console.log(sql);
            fn(err,data);
        })
    },
    purcList:function (page,fn) {
        var sql='SELECT * FROM t_buy ORDER BY purcTime DESC;';
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    getcpage:function (fn) {
        var sql='SELECT COUNT(*) AS total FROM t_user;';
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    getPpage:function (fn) {
        var sql='SELECT COUNT(*) AS total FROM t_buy;';
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    addPurc:function (name,size,price,num,total,person,tel,time,fn) {
        var sql='INSERT INTO t_buy VALUES(NULL,"'+name+'","'+size+'","￥'+price+'",'+num+',"￥'+total+'","'+time+'","'+person+'","'+tel+'");\n';
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    }
};
module.exports=sxModel;