const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '../db.json');

class LocalDatabase {
  constructor() {
    this.initDB();
  }

  initDB() {
    try {
      if (!fs.existsSync(DB_PATH)) {
        const initialData = { users: [] };
        fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2));
      }
    } catch (error) {
      console.error('Error initializing database:', error);
    }
  }

  readDB() {
    try {
      const data = fs.readFileSync(DB_PATH, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading database:', error);
      return { users: [] };
    }
  }

  writeDB(data) {
    try {
      fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
      return true;
    } catch (error) {
      console.error('Error writing to database:', error);
      return false;
    }
  }

  // User operations
  getAllUsers() {
    const db = this.readDB();
    return db.users || [];
  }

  getUserById(id) {
    const users = this.getAllUsers();
    return users.find(user => user.id === id);
  }

  getUserByEmail(email) {
    const users = this.getAllUsers();
    return users.find(user => user.email === email);
  }

  createUser(userData) {
    try {
      const db = this.readDB();
      const users = db.users || [];
      
      // Check if user already exists
      const existingUser = users.find(user => user.email === userData.email);
      if (existingUser) {
        return { success: false, error: 'User already exists' };
      }

      // Generate unique ID
      const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
      
      const newUser = {
        id,
        ...userData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      users.push(newUser);
      db.users = users;
      
      const success = this.writeDB(db);
      if (success) {
        return { success: true, user: newUser };
      } else {
        return { success: false, error: 'Failed to save user' };
      }
    } catch (error) {
      console.error('Error creating user:', error);
      return { success: false, error: 'Database error' };
    }
  }

  updateUser(id, updateData) {
    try {
      const db = this.readDB();
      const users = db.users || [];
      
      const userIndex = users.findIndex(user => user.id === id);
      if (userIndex === -1) {
        return { success: false, error: 'User not found' };
      }

      users[userIndex] = {
        ...users[userIndex],
        ...updateData,
        updatedAt: new Date().toISOString()
      };

      db.users = users;
      const success = this.writeDB(db);
      
      if (success) {
        return { success: true, user: users[userIndex] };
      } else {
        return { success: false, error: 'Failed to update user' };
      }
    } catch (error) {
      console.error('Error updating user:', error);
      return { success: false, error: 'Database error' };
    }
  }

  deleteUser(id) {
    try {
      const db = this.readDB();
      const users = db.users || [];
      
      const userIndex = users.findIndex(user => user.id === id);
      if (userIndex === -1) {
        return { success: false, error: 'User not found' };
      }

      users.splice(userIndex, 1);
      db.users = users;
      
      const success = this.writeDB(db);
      return { success };
    } catch (error) {
      console.error('Error deleting user:', error);
      return { success: false, error: 'Database error' };
    }
  }
}

module.exports = new LocalDatabase();
