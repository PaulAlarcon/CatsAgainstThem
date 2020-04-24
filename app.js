var express = require('express');
var pool = require('./database');
var morgan = require('morgan');
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan('short'));

var port = process.env.PORT || 8080;

app.use(express.static('./public'));

app.get("/", function(req, res){
    res.render("gamemenu")
})

//singleton
var username ;

app.listen(port, function(){
    console.log("App running on port" , port);
});


app.get("/username", function(req,res){
    res.send([username])
})

app.post("/create_user", function(req, res){
    var user = req.body.reg_username.toLowerCase();
    var password = req.body.reg_password.toLowerCase();
    var email = req.body.reg_email.toLowerCase();
    var first_name = req.body.reg_firstname.toLowerCase();
    var last_name = req.body.reg_lastname.toLowerCase();

    const queryCheck = "SELECT * FROM USER WHERE username = ? ";

    pool.query(queryCheck, user , function(err, results, fields){
        if(err){
            console.log("Failed to login", err);
            res.sendStatus(500);
            return;
        }

        if(results.length > 0){            
            res.send("USER ALREADY EXITS")
            return;
        }
        else{
            const queryString = "INSERT INTO USER (username, user_first, user_last, password, user_email) VALUES (?,?,?,?,?)"
            pool.query(queryString, [user, first_name, last_name, password, email ], function(err, results, fields){
                if(err){
                    console.log("Failed to insert user");
                    res.sendStatus(500);
                    return;
                }
                else{
                    username = user;
                    res.redirect("/gamemenu.html")
                }
            });
        }
    })


})

app.post("/login", function(req, res){
    var user = req.body.lg_username.toLowerCase();
    var pass = req.body.lg_password.toLowerCase();    

    const queryString = "SELECT * FROM USER WHERE username = ? AND password = ? ";

    pool.query(queryString, [user, pass], function(err, results, fields){
        if(err){
            console.log("Failed to login", err);
            res.sendStatus(500);
            return;
        }

        if(results.length > 0){            
            username = user;
            
            console.log("Logged in, Welcome");     
            res.redirect("/gamemenu.html") 
        }
        else{
            res.send("Not USER found")
            res.sendStatus(500);
            return;
        }
    })

})

app.get("/leaderboard", function(req, res){
    const queryString = "SELECT * FROM LOGS WHERE username = ? "
    pool.query(queryString, username, function(err, results, fields){
        if(err){
            console.log("Failed to fetch", err);
            res.sendStatus(500);
            return;
        }
            res.json(results)

    })
})


app.get("/leaderboardpublic", function(req, res){
    const queryString = "SELECT username, score FROM logs ORDER BY score DESC; "
    pool.query(queryString, username, function(err, results, fields){
        if(err){
            console.log("Failed to fetch", err);
            res.sendStatus(500);
            return;
        }
            res.json(results)

    })
})

app.post("/store_log", function(req, res){
    var score = req.body.player_score;
    const queryString = "INSERT INTO LOGS (username, score, logtime) VALUES (?,?,now())"
    pool.query(queryString, [username, score], function(err, results, fields){
        if(err){
            console.log("Failed to record logs", err);
            res.sendStatus(500);
            return;
        }
        console.log("Sucessfuly added log");
    })
})


