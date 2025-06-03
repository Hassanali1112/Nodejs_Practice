const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.get('/' , (req,res)=>{
  res.send("this get route")
})

app.post("/upload_files", (req, res) => {
  console.log(req.body);
  res.send("this is post route", req.body)
});

app.listen(process.env.port, ()=>{
  console.log(`server is at port : ${process.env.port}`)
})