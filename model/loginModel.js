var mysql=require('mysql');

var db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'puppyshop'
});

var loginModel={
    login:function (user,pass,fn) {

        var sql='SELECT * FROM t_admin WHERE admin_user="'+user+'" AND admin_pass="'+pass+'";';

        db.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    // register:function (user,fn) {

    //     var sql1='SELECT * FROM t_user WHERE u_user="'+user+'";';

    //     db.query(sql1,function (err,data) {
    //         fn(err,data)
    //     })
    // },
    add:function (name,user,pass,fn) {
        var sql2 = 'INSERT INTO t_user VALUES(null,"'+name+'",null,null,null,"' + user + '","' + pass + '");';

        db.query(sql2, function (err, data) {
            fn(err, data)
        })
    },
    picIndex:function(fn){
        var sql = "SELECT * FROM food_articles"
        db.query(sql,function(err,data){
            fn(err,data)
        })
    },
    S_list:function(oSearch,fn){
        var sql = `SELECT * , (C.order_buynum*A.pre_price) AS Price  
        FROM t_goods A ,t_order B,t_orderdet C,t_class D
        WHERE A.goods_id = C.goods_id AND B.order_id = C.order_id AND D.class_id = A.class_id
        ORDER BY B.order_day`
        db.query(sql,function(err,data){
            fn(err,data)
           
        })
    },
    S_list:function(fn){
        var sql = `SELECT * , (C.order_buynum*A.pre_price) AS Price  
        FROM t_goods A ,t_order B,t_orderdet C,t_class D
        WHERE A.goods_id = C.goods_id AND B.order_id = C.order_id AND D.class_id = A.class_id
        ORDER BY B.order_day`
        db.query(sql,function(err,data){
            fn(err,data)
           
        })
    },
    x_list:function(oSearch,oData,fn){
         if(oSearch){
            var sql = `SELECT DISTINCT * , (C.order_buynum*A.pre_price) AS Price  
            FROM t_goods A ,t_order B,t_orderdet C,t_class D
            WHERE A.goods_id = C.goods_id AND B.order_id = C.order_id AND D.class_id = 
            A.class_id AND a.goods_id = ${oSearch} 
            ORDER BY B.order_day`
            db.query(sql,function(err,data){
                fn(err,data)
            })
         }else if(oData){
            var sql = `SELECT DISTINCT * , (C.order_buynum*A.pre_price) AS Price  
            FROM t_goods A ,t_order B,t_orderdet C,t_class D
            WHERE A.goods_id = C.goods_id AND B.order_id = C.order_id AND D.class_id = 
            A.class_id AND  b.order_day BETWEEN '${oData[0]}' AND '${oData[1]}'
            ORDER BY B.order_day`
            db.query(sql,function(err,data){
                fn(err,data)
            })
         }else if(oSearch && oData){
            var sql = `SELECT DISTINCT * , (C.order_buynum*A.pre_price) AS Price  
            FROM t_goods A ,t_order B,t_orderdet C,t_class D
            WHERE A.goods_id = C.goods_id AND B.order_id = C.order_id AND D.class_id = 
            A.class_id AND a.goods_id = ${oSearch} AND b.order_day BETWEEN '${oData[0]}' AND '${oData[1]}'
            ORDER BY B.order_day`
            db.query(sql,function(err,data){
                fn(err,data)
            })
         }
    }, 
    b:function (fn){
        var sql = `SELECT * FROM t_address A , t_order B ,t_orderdet C
        WHERE A.add_id = B.add_id AND B.order_id = C.order_id
        ORDER BY order_day`
        db.query(sql,function (err,data){
            fn(err,data);
        })
    },
    c:function (fn){
        var sql = `SELECT *,COUNT(*)AS num FROM t_user`
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    d:function (fn){
        var sql = `SELECT  *  FROM t_buy`
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    }
};
module.exports=loginModel;
