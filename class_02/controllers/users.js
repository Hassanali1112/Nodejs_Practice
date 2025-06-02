const getAllUsers = (req, res)=>{
  res.send([{name : 'Hassan ali'}, {name : "Asad abbas"}])
}

module.exports = {getAllUsers}