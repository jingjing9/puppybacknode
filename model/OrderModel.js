var mysql=require('mysql');

var db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'puppyshop'
});

var OrderModel={
    returner:function (fn) {
        var sql = 'SELECT order_id,order_state,order_return,goods_id,now_price,order_buynum,order_reson,order_rnum,order_rcom\n' +
            'FROM t_order \n' +
            'LEFT JOIN t_orderdet\n' +
            'USING (order_id)\n' +
            'LEFT JOIN t_goods\n' +
            'USING (goods_id)\n' +
            'WHERE order_state IN (2,3)';
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    returnGetPage:function (fn) {
        var sql = `SELECT order_id,order_state,order_return,goods_id,now_price,order_buynum,order_return,order_reson
                    FROM t_order 
                    LEFT JOIN t_orderdet
                    USING (order_id)
                    LEFT JOIN t_goods
                    USING (goods_id)
                    WHERE order_state IN (2,3)`;
        db.query(sql,function (err,data) {
            fn(err,data)
        })
    },
    auditing:function (order_id,order_return,fn) {
        var sql = `UPDATE t_order SET order_return=${order_return}
WHERE order_id = ${order_id}`;
        db.query(sql,function (err,data) {
            fn(err,data)
        })
    },
    returnSuccess:function (order_id,fn) {
        var sql = `UPDATE t_order SET order_return=5
WHERE order_id = ${order_id}`;
        db.query(sql,function (err,data) {
            fn(err,data)
        })
    },
    searchReturn:function(ser,val,fn){
     if( val != 6){
         var sql = `SELECT order_id,order_state,order_return,goods_id,now_price,order_buynum,order_reson,order_rnum,order_rcom
            FROM t_order
            LEFT JOIN t_orderdet
            USING (order_id)
            LEFT JOIN t_goods
            USING (goods_id)
            WHERE ${ser}=${val}`;
     }else {
         var sql = `SELECT order_id,order_state,order_return,goods_id,now_price,order_buynum,order_reson,order_rnum,order_rcom
            FROM t_order
            LEFT JOIN t_orderdet
            USING (order_id)
            LEFT JOIN t_goods
            USING (goods_id)
            WHERE ${ser}!=1`;
     }
        db.query(sql,function (err,data) {
            fn(err,data)
        })
    },
    searchOrder:function(ser,val,fn){
       if(val==7){
           var sql = `SELECT order_id,order_state,order_day,order_time,order_num,order_com,add_person,add_tel,a_address,goods_id,now_price,order_buynum,order_say,goods_name
            FROM t_orderdet
            LEFT JOIN t_order
            USING(order_id)
            LEFT JOIN t_goods
            USING (goods_id)
            LEFT JOIN t_address
            USING (add_id)
            WHERE order_num IS NULL`
       }else if(val==8){
           var sql = `SELECT order_id,order_state,order_day,order_time,order_num,order_com,add_person,add_tel,a_address,goods_id,now_price,order_buynum,order_say,goods_name
            FROM t_orderdet
            LEFT JOIN t_order
            USING(order_id)
            LEFT JOIN t_goods
            USING (goods_id)
            LEFT JOIN t_address
            USING (add_id)
            WHERE order_num IS NOT NULL`
       } else{
           var sql = `SELECT order_id,order_state,order_day,order_time,order_num,order_com,add_person,add_tel,a_address,goods_id,now_price,order_buynum,order_say,goods_name
            FROM t_orderdet
            LEFT JOIN t_order
            USING(order_id)
            LEFT JOIN t_goods
            USING (goods_id)
            LEFT JOIN t_address
            USING (add_id)
            WHERE ${ser}=${val}`;
       }
        db.query(sql,function (err,data) {
            fn(err,data)
        })
    },
    orderGetPage:function (fn) {
    var sql = `SELECT order_id,order_state,order_day,order_time,order_num,order_com,add_person,add_tel,a_address,goods_id,now_price,order_buynum,order_say,goods_name
            FROM t_orderdet
            LEFT JOIN t_order
            USING(order_id)
            LEFT JOIN t_goods
            USING (goods_id)
            LEFT JOIN t_address
            USING (add_id)
            ORDER BY order_id`;
        db.query(sql,function (err,data) {
            fn(err,data)
        })
},
    editAddress:function (order_com,order_num,order_id,fn) {
        var sql = `UPDATE t_order SET order_com='${order_com}',order_num='${order_num}' 
            WHERE order_id=${order_id}`;
        db.query(sql,function (err,data) {
            fn(err,data)
        })
    },
    editAddr1:function (order_id,fn) {
        var sql = `SELECT DISTINCT order_id,user_id
            FROM t_orderdet
            LEFT JOIN t_order
            USING(order_id)
            WHERE order_id=${order_id};`;
        db.query(sql,function (err,data) {
            fn(err,data)
        })
    },
    editAddr2:function (user_id,add_person,add_tel,a_address,fn) {
        var sql = `SELECT add_id
FROM t_address
WHERE add_person='${add_person}'AND add_tel='${add_tel}' AND a_address='${a_address}' AND user_id=${user_id};`;
        db.query(sql,function (err,data) {
            fn(err,data)
        })
    },
    editAddr3:function (user_id,add_person,add_tel,a_address,fn) {
        var sql = `INSERT INTO t_address VALUES (NULL,'${add_person}','${add_tel}','${a_address}',0,${user_id})`;
        console.log(sql)
        db.query(sql,function (err,data) {
            fn(err,data)
        })
    },
    editAddr4:function (add_id,order_id,fn) {
        var sql = `UPDATE t_order SET add_id=${add_id}
WHERE order_id=${order_id}`;
        db.query(sql,function (err,data) {
            fn(err,data)
        })
    },
    editAddr5:function (fn) {
        var sql = `SELECT MAX(add_id) add_id FROM t_address;`;
        db.query(sql,function (err,data) {
            fn(err,data)
        })
    }
};

module.exports=OrderModel;
