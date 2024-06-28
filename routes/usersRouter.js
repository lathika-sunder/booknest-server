const express=require('express')
const router=express.Router()
const {
    loginUser,
    logoutUser,
    addUser,
    removeUser,
    getUser,
    getUsers
} = require('../controllers/usersController');

//for users
router.post('/loginUser',loginUser)
router.post('/logoutUser',logoutUser)


//for admins
router.post('/addUser',addUser)
router.delete('/removeUser',removeUser)
router.get('/getUser/:userId',getUser)
router.post('/getUsers',getUsers)



module.exports=router