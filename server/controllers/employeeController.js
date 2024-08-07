const Employee = require('../models/Employee')
const Customer = require('../models/Customer')


exports.createEmployee = async(req,res)=>{
    const {firstName,email,password}=req.body;
    const employee = new Employee({firstName,email,password,role:'isAgent'});
    try {
        const newEmployee = await employee.save();
        res.status(201).json(newEmployee)
    } catch (err) {
        res.status(400).json({message:err.message})
    }
}

exports.getAllCustomers = async(req,res)=>{
    try {
        
        const agentId=req.params.agentId;
        const customers = await Customer.find({assignedAgent:agentId});
        res.status(200);
        return customers;
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
function generateVehicleId(brand,model,makeYear,sequenceNumber){
    const baseId= `${brand}-${model}-${makeYear}-${sequenceNumber.toString().padStart(3,'0')}`;
    return baseId;
}
const getPreviousSequenceNumber = async (brand, model, makeYear) => {
    try {
        const vehicle = await Inventory.findOne({ make: brand, model, makeYear })
            .sort({ vehicleId: -1 })
            .exec();
        if (vehicle) {
            const parts = vehicle.vehicleId.split('-');
            return parseInt(parts[3], 10);
        }
        return 0;
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching previous sequence number');
    }
};


exports.addVehicle = async(req,res)=>{
    try {
        
        const {make,model,makeYear,regYear,vIN}=req.body;
        const vehicleId=generateVehicleId(brand,model,makeYear,getPreviousSequenceNumber(brand,model,makeYear))
        const newVehicle = new Inventory({
            vehicleId,
            make,
            model,
            makeYear,
            regYear,
            vIn,
    
    
        })
        const result= await newVehicle.save();
        res.status(201).json(result)
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
    
}