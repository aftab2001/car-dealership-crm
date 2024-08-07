const mongoose = require('mongoose')

const connectDB= async()=>{
    return mongoose
    .connect("mongodb://localhost:27017/cargen")
    .then(()=>console.log(`connection established`))
    .catch((err)=>console.log(err))
}

module.exports=connectDB