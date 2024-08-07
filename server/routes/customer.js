const Lead = require('../models/Lead');
const Customer = require('../models/Lead');
const bcrypt = require('bcrypt')
const router = require('express').Router();


router.post("/login")
router.post("/register",async(req,res)=>{
   
    const {firstName,email,password}=req.body;
    try {
        //check if any missing field
        if(!firstName  || !email || !password) return res.status(400).json({error:`kindly enter all fields`})
        //check if email valid using regex
        const emailReg= /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if(!emailReg.test(email)) return res.status(400).json({msg:"invalid email"})

        //validate password
        if(password.length <=6)
            return res
                .status(400)
                .json({error:"password length must be 6 characters"})
        try {
            const leadExists = await Lead.findOne({email});

            if(leadExists) return res.status(400).json({error:
                `An user with email:${email} already exists login or try another email `
            })


            const hashedPassword = await bcrypt.hash(password,13)
            const newLead = new Lead({firstName,email,password:hashedPassword})

            const result= await newLead.save();
            result._doc.password= "**********"
            return res.status(201).json({...result._doc})
        } catch (error) {
            
        }


    } catch (error) {
        console.log(err);
        return res.status(500).json({msg:err.message})
    }
})



module.exports=router