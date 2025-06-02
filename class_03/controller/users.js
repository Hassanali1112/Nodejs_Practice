let users = [
  {id : 1, name : "Hassan", email : "hassan@mail.com"},
  {id : 2, name : "Farhan", email : "farhan@mail.com"},
]

const getAllUsers = (req, res)=>{
  res.send({ users : users, count : users.length})
}

const createNewUser = (req, res)=>{
  users.push({ id : users.length + 1, ...req.body});
  res.send({ message : "user has been created", user : users[users.length-1]})
}

const deleteUser = (req, res)=>{
  const {id} = req.params;
  console.log(id)
  users = users.filter(user=> user.id !== parseInt(id));
  res.send({message : "user has been deleted", users })
}

const updateUser = (req, res)=>{
  const {id} = req.params;
  console.log(id);

  const {name, email} = req.body;
  const userToUpdate = users.filter(user => user.id == parseInt(id) );
  console.log(userToUpdate)
  if ( userToUpdate.length > 0){

    const user = userToUpdate[0]
    user.email = email;
    user.name = name
    res.send({message : "user updated", user : user })
  } else {
    res.send({message : "User not found"})
  }
}

module.exports = { getAllUsers, deleteUser, updateUser, createNewUser }