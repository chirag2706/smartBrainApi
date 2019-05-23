var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var bcryptNodejs = require('bcrypt-nodejs');
var  mongoose  = require('mongoose');
var bcrypt=require("bcrypt");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
var User = require("./model.js");
mongoose.connect("mongodb://localhost:27017/smartBrain",{useNewUrlParser:true});

//routes
app.get("/",(req,res)=>{
    res.send("Hello");
});

app.post("/signin",(req,res)=>{
    var flag = false;
    
    User.find({},(err,allUsers)=>{
        if(err){
            console.log(err);
            res.status(400).json("error occured");
        }else{
            for(var i=0;i<allUsers.length;i++){
                if (req.body.email == allUsers[i].Email){
                    console.log("happy");
                        
                    if (bcryptNodejs.compareSync(String(req.body.password),allUsers[i].Password) === true){
                        flag = true;
                    }
                    if (flag === false){
                        // console.log("failure");
                        res.status(400).json("error occured");
                        // res.json(allUsers[i]);
                        // break;
                    }else if (flag === true){
                        res.json(allUsers[i]);
                        // break;
                    }
                    break;
                }
            }
        }
    });
});

app.post("/register",(req,res)=>{
    var newUser;
    bcryptNodejs.hash(req.body.password,null,null,(err,hash)=>{
        if (!err){
            newUser = {
                fullName:req.body.fullname,
                Email:req.body.email,
                Password:hash,
                Entries:0
            };
        }else{
            console.log(err);
        }
        
    });
    
    var flag1 = true;
  
    User.find({},(err,allUsers)=>{
        if (!err){
            for(var i=0;i<allUsers.length;i++){
                console.log(String(allUsers[i].Email) === String(req.body.email));
                if (String(allUsers[i].Email) === String(req.body.email)){
                    flag1 = false;
                    console.log("flag1 is");
                    console.log(flag1);
                    break;
                }
            }
            if (flag1 === true){
                var users = new User(newUser);
                users.save((err)=>{
                    if (err){
                        console.log('Error in saving the data');
                        console.log(err)
                    }
                })
                console.log("hello");
                res.json(users);
            }else{
                res.json("failure");
            }
        }else{
            console.log("Error in registering");
            console.log(err);
        }
    });
    
});

// app.get("/profile/:id",(req,res)=>{

// });

app.post("/image",(req,res)=>{
   
    User.find({},(err,allUsers)=>{
        if (err){
            console.log(err);
        }else{
            for(var i=0;i<allUsers.length;i++){
                if (allUsers[i].Email == req.body.email){
                    allUsers[i].Entries++;
                    allUsers[i].save((err)=>{
                        if (err){
                            console.log("Error occured in saving data of entries");
                            console.log(err);
                        }
                    });
                    res.json(allUsers[i]);
                    break;
                }
            }
        }
    });
});



app.listen(3002,process.env.IP,()=>{
    console.log(
        `Server has started with port 3002`
    );
});