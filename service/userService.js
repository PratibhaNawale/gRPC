const User = require('../models/userModels.js');

// Create User
exports.createUser = async (data) => {
    try {
        const user = new User(data);
        return await user.save();
    } catch (error) {
        throw new Error(`Error creating user: ${error.message}`);
    }
};

// Get Users
exports.getUser = async () => { 
    try {
        return await User.find(); 
    } catch (error) {
        throw new Error(`Error fetching users: ${error.message}`);
    }
};
//Update user
exports.updateUser = async (id, data) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
        return updatedUser;
    } catch (error) {
        throw new Error(`Error updating user: ${error.message}`);
    }
};
//delete user
exports.deleteUser = async (id) => {
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        return deletedUser;
    } catch (error) {
        throw new Error(`Error deleting user: ${error.message}`);
    }
};
