const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Employee = require('./models/Employee'); // Adjust the path as necessary

mongoose.connect('mongodb://localhost:27017/cargen')

const addAdmin = async () => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('securepassword123', salt);

        const admin = new Employee({
            firstName: 'Admin',
            lastName: 'User',
            email: 'admin1@cargen.com',
            password: hashedPassword,
            roles: ['isAdmin'],
            manager: null,
            financeManager: null,
            sales: [],
            active: true,
            assignedCustomers: []
        });

        await admin.save();
        console.log('Admin added successfully');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error adding admin:', error);
        mongoose.connection.close();
    }
};

addAdmin();
