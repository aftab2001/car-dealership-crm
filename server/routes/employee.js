const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt= require('jsonwebtoken')
const employeeController = require('../controllers/employeeController');
const authMiddleware = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkRole');
const Employee = require('../models/Employee')
//define routes

// router.get('/',employeeController.getAllCustomers());

// router.post('/create-agent',authMiddleware,checkRole(['isManager','isAdmin']),employeeController.createAgentEmployee);

router.post('/login',async(req,res)=>{
    console.log('employee login')
    const {email,password}=req.body;

    if(!email || !password){
        return res.status(400).json({msg:'please enter email and password'})
    }
    try {
        const employee= await Employee.findOne({email})
        if(!employee) 
            return res.status(400).json({msg:'user does not exists'});

        const isMatch = await bcrypt.compare(password,employee.password)
        if(!isMatch)
            return res.status(400).json({message:'wrong password'})

        const token = jwt.sign({_id:employee._id,roles:employee.roles},'JWT_SECRET');
        res.header('Authorization',token).json({token})

    } catch (err) {
        res.status(500).json({msg:err.message})
    }
})


router.post('/create-employee',authMiddleware,checkRole(['isAdmin']),async(req,res)=>{
    try {
        const result = await employeeController.createAgentEmployee(req,res);
        return result;
        res.status(200)
    } catch (error) {
        res.status(500)
    }
})


// router.post('/addvehicle',authMiddleware,checkRole(['isInventoryManager'],async(req,res)=>{
//     try {
//         const res= await employeeController.addVehicle(req,res);
//         res.status(200)
//     } catch (err) {
//         res.status(500)
//     }
// })



// )

module.exports = router