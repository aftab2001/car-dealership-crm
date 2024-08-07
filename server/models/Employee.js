const mongoose = require('mongoose')
const Schema = mongoose.Schema


const employeeSchema =  new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
    },
    email:{type:String,require:true,unique:true},
    password:String,
    roles:[{
        type:String,
        enum:['isAgent','isManager','isInventoryManager','isFinanceManager',
            'isAdmin'
        ],
        required:true
    }],
    manager:{
        type:Schema.Types.ObjectId,
        ref:'Employee'
    },
    financeManager:{
        type:Schema.Types.ObjectId,
        ref:'Employee'

    },
    sales:[{
        type:Schema.Types.ObjectId,
        ref:'Inventory'
    }],
    active:{
        type:Boolean,
        default:true
    },
    assignedCustomers:[{
        type:Schema.Types.ObjectId,
        ref:'Customer'
    }]
})



module.exports = mongoose.model('Employee',employeeSchema)