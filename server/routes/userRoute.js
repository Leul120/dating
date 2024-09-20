const express=require('express')
const { registerUser } = require('../controllers/authControllers')
const router=express.Router()

router.route('/submit-form').post(registerUser)

module.exports=router