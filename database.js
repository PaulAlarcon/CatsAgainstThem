var mysql = require('mysql')
var pool = mysql.createPool({
    connectionLimit: 10,
    host : "us-cdbr-iron-east-01.cleardb.net",
    user : "bbf106d35ccfbc",
    password : "83d58a81",
    database : "heroku_105e5ae47a070e8"
})

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
    }    if (connection) connection.release()    
    return
})

module.exports = pool