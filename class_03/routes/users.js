const express = require("express")
const { getAllUsers, updateUser, createNewUser, deleteUser } = require("../controller/users")

const router = express.Router()

router.get('/', getAllUsers)
router.post ('/:id', createNewUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

module.exports = router


