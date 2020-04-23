var express = require('express');
var mysql = require('mysql');
var morgan = require('morgan');
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.urlencoded({extended:false}))

app.use(morgan('short'));

var port = process.env.PORT || 8080;

app.use(express.static('./public'));

app.get("/", function(req, res){
    res.render(index)
})

function getConnection(){
    return mysql.createConnection({
        host : "us-cdbr-iron-east-01.cleardb.net",
        user : "bbf106d35ccfbc",
        password : "83d58a81",
        database : "heroku_105e5ae47a070e8"
    });
}

app.get("/users", function(req, res){
    var user = {
        userid : 222,
        username : "paul",
        lastname : "alarcon"
    }
    res.json(user)
})

app.listen(port, function(){
    console.log("App running on port" , port);
});

app.get("/db", function(req, res){

    var queryStr = "SELECT * FROM USER";
    
    connection.query(queryStr,  (err, rows, fields) => {
        if(err) {
            console.log("Error when running query", err);
            res.sendStatus(500)
            return
        }
        
        console.log("Sucessful");

        const username = rows.map((row) => {
            return row.username
        })

        res.send(username)
    });

})

app.post("/create_user", function(req, res){
    var username = req.body.reg_username;
    var password = req.body.reg_password;
    var email = req.body.reg_email;
    var first_name = req.body.reg_firstname;
    var last_name = req.body.reg_lastname;
    const queryString = "INSERT INTO .USER (username, user_first, user_last, password, user_email) VALUES (?,?,?,?,?)"
    getConnection().query(queryString, [username, password, email, first_name, last_name], function(err, results, fields){
        if(err){
            console.log("Failed to insert user");
            res.sendStatus(500);
            return;
        }
    });
    res.end();
})


//const queryString = "SELECT * FROM users WHERE id = ?"
//method.call(queryString, [userId], () = >{
// 
// })