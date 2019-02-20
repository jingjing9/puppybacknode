var mysql = require('mysql');
var pupy = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'puppyshop'
})

var productDetailsModel = {
    productDetails:function(id,fn){
        var sql = `SELECT *FROM t_goods LEFT JOIN goods_det USING (goods_name) LEFT JOIN t_class USING (class_id)`
        pupy.query(sql,function(err,data){
            fn(err,data)
        })
    }
}

module.exports = productDetailsModel;