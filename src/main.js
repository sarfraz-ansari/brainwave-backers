const express = require('express');
const app = express();

app.use(express.static("src"));
app.use(express.static("node_modules"));




app.use("/css",express.static("./node_modules/bootstrap/dist/css"));
app.use("/js",express.static("./node_modules/bootstrap/dist/js"));
//or
//app.use("/",express.static("./node_modules/bootstrap/dist/"));

app.get('/',function(req,res){
    res.sendFile(__dirname + "/index.html");
   // res.send("Home page of Brainweckers");
})


app.get('/activitytracker',function(req,res){
    res.sendFile(__dirname + "/activitytracker.html");
   // res.send("Home page of Brainweckers");
})

app.get('/remindactivity',function(req,res){
    res.sendFile(__dirname + "/remindactivity.html");
   
})
app.get('/about',function(req,res){
    res.sendFile(__dirname + "/about.html");
   
})

app.get('/remindactivity',function(req,res){
    res.sendFile(__dirname + "/remindactivity.html");
   
})

app.get('/contact',function(req,res){
    res.sendFile(__dirname + "/contact.html");
   
})

app.get('/notification',function(req,res){
    res.sendFile(__dirname + "/notify.html");
   
})

// const spawn = require("child_process").spawn;
// const pythonProcess = spawn('python',["src/h.py", arg1, arg2, ...]);

const getPost = (num) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${num}`)
      .then(response => response.json())
      .then(data => console.log(data));
  };
  
  getPost(5);
  
  



const listener = app.listen(9090, function() {
    console.log("Your app is listening on port " + listener.address().port);
  });

  


 
