require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');

// Test users data
const USERS = [
  {
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@univent.com',
    password: 'Admin@123456',
    college: 'System Administrator',
    role: 'admin'
  },
  {
    firstName: 'Event',
    lastName: 'Organizer',
    email: 'organizer@univent.com',
    password: 'Organizer@123456',
    college: 'Sample College',
    role: 'organizer'
  },
  {
    firstName: 'Test',
    lastName: 'Participant',
    email: 'participant@univent.com',
    password: 'Participant@123456',
    college: 'Sample College',
    role: 'participant'
  }
];

const seedUsers = async () => {
  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected\n');

    for (const userData of USERS) {
      // Check if user already exists
      const existingUser = await User.findOne({ email: userData.email });
      
      if (existingUser) {
        console.log(`⚠️  User already exists: ${userData.email} (${userData.role})`);
      } else {
        // Create user
        const user = await User.create(userData);
        console.log(`✅ Created ${userData.role}: ${user.email}`);
      }
    }

    console.log('\n📋 All Test Users:');
    console.log('==========================================');
    console.log('Admin:');
    console.log('  Email: admin@univent.com');
    console.log('  Password: Admin@123456');
    console.log('');
    console.log('Organizer:');
    console.log('  Email: organizer@univent.com');
    console.log('  Password: Organizer@123456');
    console.log('');
    console.log('Participant:');
    console.log('  Email: participant@univent.com');
    console.log('  Password: Participant@123456');
    console.log('==========================================');
    console.log('\n⚠️  Please change passwords after first login!');
    
    // List all users in database
    console.log('\n📊 Current users in database:');
    const allUsers = await User.find({}).select('email role college');
    allUsers.forEach(user => {
      console.log(`  - ${user.email} (${user.role}) - ${user.college}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

seedUsers();
