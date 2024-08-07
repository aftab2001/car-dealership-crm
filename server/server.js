const express = require("express");
const morgan=require('morgan')
const app=express();
const customer= require("./routes/customer")
const employee = require('./routes/employee')
const connectDB = require('./config/db')

//middleware
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(morgan("tiny"))
//routes
app.use("/api/customer",customer)
app.use("/api/employee",employee)

app.get("/",(req,res)=>{
    res.send("hello world")
})

// app.post("/","../routes/customer.js")
//server configuration
const PORT =process.env.port || 3000;
app.listen(PORT,async()=>{
    try {
        await connectDB();
    console.log(`listening on port: ${PORT}`);
    } catch (err) {
        console.log(err.error.message)
    }
    
})



