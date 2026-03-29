require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');

// Organizer credentials - CHANGE THESE!
const ORGANIZER_DATA = {
  firstName: 'Event',
  lastName: 'Organizer',
  email: 'organizer@univent.com',
  password: 'Organizer@123456',
  college: 'Sample College',
  role: 'organizer'
};

const createOrganizer = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');

    // Check if organizer already exists
    const existingOrganizer = await User.findOne({ email: ORGANIZER_DATA.email });
    
    if (existingOrganizer) {
      console.log('Organizer user already exists!');
      console.log('Email:', existingOrganizer.email);
      console.log('Role:', existingOrganizer.role);
      process.exit(0);
    }

    // Create organizer user
    const organizer = await User.create(ORGANIZER_DATA);
    
    console.log('✅ Organizer user created successfully!');
    console.log('Email:', organizer.email);
    console.log('Password:', ORGANIZER_DATA.password);
    console.log('Role:', organizer.role);
    console.log('\n⚠️  Please change the password after first login!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating organizer:', error.message);
    process.exit(1);
  }
};

createOrganizer();
