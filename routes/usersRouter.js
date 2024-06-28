const express=require('express')
const router=express.Router()
const {
    loginUser,
    logoutUser,
    addUser,
    removeUser,
    getUser,
    getUsers,
    addAdmin
} = require('../controllers/usersController');

//for users
router.post('/loginUser',loginUser)
router.get('/logoutUser',logoutUser)


//for admins
router.post('/addUser',addUser)
router.delete('/removeUser/:userId',removeUser)
router.get('/getUser/:userId',getUser)
router.get('/getUsers',getUsers)


//for superadmin
router.post('/addAdmin',addAdmin)


module.exports=router