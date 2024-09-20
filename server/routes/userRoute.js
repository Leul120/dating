const express=require('express')
const { registerUser } = require('../controllers/authControllers')
const router=express.Router()

router.route('/submit-form').post(registerUser)
router.route('').post((req,res)=>{
    res.send({
        message:"hello "
    })
})
module.exports=router