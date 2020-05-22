//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const request = require("request");
// const _ = require("lodash");
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  res.render("signup");
});

app.post("/",function(req,res){
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;

  var data ={
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  var jsonData = JSON.stringify(data);

  var options ={
    url:"https://us18.api.mailchimp.com/3.0/lists/YOUR_LIST_KEY",
    method:"POST",
    headers:{
      "Authorization":"superman YOUR_API_KEY"
    },
    body: jsonData
  }

  request(options,function(error, response, body){
    if(error){
      res.render("failure");
    } else{
      if(response.statusCode === 200){
        res.render("success");
      }else{
        res.render("failure");
      }
    }
  });

});


app.post("/failure",function(req,res){
  res.redirect("/");
})
app.listen(3000, function() {

  console.log("Server started on port 3000");

});
