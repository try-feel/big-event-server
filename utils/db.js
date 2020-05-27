module.exports = (sql,params = null) => {
    const mysql = require('mysql');
    const conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '0000',
        database: 'bigevent'
    });
   
    return new Promise((resolve,reject)=> {
        conn.connect();
        conn.query(sql,params,(err,result) => {
            err ? reject(err):resolve(result);
        });
        conn.end();
    }).catch(err => {
        console.log(err.message);  
    })
}