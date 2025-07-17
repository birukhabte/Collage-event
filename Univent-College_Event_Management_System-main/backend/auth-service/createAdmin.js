require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');

// Admin credentials - CHANGE THESE!
const ADMIN_DATA = {
  firstName: 'Admin',
  lastName: 'User',
  email: 'admin@univent.com',
  password: 'Admin@123456',
  college: 'System Administrator',
  role: 'admin'
};

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: ADMIN_DATA.email });
    
    if (existingAdmin) {
      console.log('Admin user already exists!');
      console.log('Email:', existingAdmin.email);
      console.log('Role:', existingAdmin.role);
      process.exit(0);
    }

    // Create admin user
    const admin = await User.create(ADMIN_DATA);
    
    console.log('✅ Admin user created successfully!');
    console.log('Email:', admin.email);
    console.log('Password:', ADMIN_DATA.password);
    console.log('Role:', admin.role);
    console.log('\n⚠️  Please change the password after first login!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error.message);
    process.exit(1);
  }
};

createAdmin();

# Update: 1774770509

# Update: 1774770509
