const mongoose = require('mongoose');

// MongoDB Database Configuration
class MongoDatabase {
  constructor() {
    this.User = null;
    this.connectDB();
  }

  async connectDB() {
    try {
      const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/travelbuddy';
      await mongoose.connect(mongoUri);
      
      // Initialize User model after connection
      this.User = require('../Modules/userSchema');
      
      console.log('✅ MongoDB connected successfully');
    } catch (error) {
      console.error('❌ MongoDB connection error:', error);
      throw error;
    }
  }

  // User operations - same interface as localDatabase.js
  async getAllUsers() {
    try {
      return await this.User.find().select('-password');
    } catch (error) {
      console.error('Error getting users:', error);
      return [];
    }
  }

  async getUserById(id) {
    try {
      return await this.User.findById(id).select('-password');
    } catch (error) {
      console.error('Error getting user by ID:', error);
      return null;
    }
  }

  async getUserByEmail(email) {
    try {
      return await this.User.findOne({ email });
    } catch (error) {
      console.error('Error getting user by email:', error);
      return null;
    }
  }

  async createUser(userData) {
    try {
      // Check if user already exists
      const existingUser = await this.User.findOne({ email: userData.email });
      if (existingUser) {
        return { success: false, error: 'User already exists' };
      }

      const newUser = new this.User(userData);
      const savedUser = await newUser.save();
      
      return { 
        success: true, 
        user: {
          id: savedUser._id,
          name: savedUser.name,
          email: savedUser.email,
          createdAt: savedUser.createdAt,
          updatedAt: savedUser.updatedAt
        }
      };
    } catch (error) {
      console.error('Error creating user:', error);
      return { success: false, error: 'Database error' };
    }
  }

  async updateUser(id, updateData) {
    try {
      const updatedUser = await this.User.findByIdAndUpdate(
        id, 
        { ...updateData, updatedAt: new Date() },
        { new: true }
      ).select('-password');

      if (!updatedUser) {
        return { success: false, error: 'User not found' };
      }

      return { 
        success: true, 
        user: {
          id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          createdAt: updatedUser.createdAt,
          updatedAt: updatedUser.updatedAt
        }
      };
    } catch (error) {
      console.error('Error updating user:', error);
      return { success: false, error: 'Database error' };
    }
  }

  async deleteUser(id) {
    try {
      const result = await this.User.findByIdAndDelete(id);
      
      if (!result) {
        return { success: false, error: 'User not found' };
      }

      return { success: true };
    } catch (error) {
      console.error('Error deleting user:', error);
      return { success: false, error: 'Database error' };
    }
  }
}

module.exports = new MongoDatabase();
