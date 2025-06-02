const express = require("express");
const usersRoutes = require("./routes/users")

const app = express();

const port = 5000;

app.get("/", (req, res) => {
  res.send("server is operational check console");
});

app.get('/users', usersRoutes)
app.use('/users', (req, res)=>{
  res.send("users not found")
} )

app.use((req, res, next)=>{
  req.user = "Hassan Ali"
  next()
})

app.use((req, res, next)=>{
  console.log(req.user)
  next()
})

app.listen(port, () => {
  console.log(`server is operational on port ${port}`);
});
