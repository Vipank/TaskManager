// var cookieParser = require("cookie-parser");
var express = require("express");
const request = require("request");
const { response } = require("express");
var app = express();
var indexRouter = require("./routes/index");
app.use("/", indexRouter);
app.use(express.json());
const fs = require('fs');


app.post("/saveLocalStorage", (req, res) => {
  const localStorageData = req.body.localStorageData
  fs.writeFile('Data.json', JSON.stringify(localStorageData), 'utf8', ((err,data)=>{
    if(err){
      console.log("error")
      res.send(JSON.stringify({
        success : false
      }))
    }else{
      console.log("success")
      res.send(JSON.stringify({
        success : true
      }))
    }
})
)});

app.post("/getLocalStorage", (req, res) => {
  fs.readFile('Data.json',function(err,content){
    if(err){res.send(JSON.stringify({
      success : false
    }))}
    else{
      var parseJson = JSON.parse(content);
      res.send(JSON.stringify({
        success : true,
        data: parseJson
      }))
    };
  })
});


module.exports = app;
