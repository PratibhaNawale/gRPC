const userService = require('../service/userService.js');
const grpc = require('@grpc/grpc-js');

// Create User
exports.createUser = async (call, callback) => {
    try {
        const userData = call.request;

        if (!userData.name || !userData.email || !userData.password) {
            return callback({
                code: grpc.status.INVALID_ARGUMENT,
                message: 'Name, email, and password are required fields',
            });
        }

        const user = await userService.createUser(userData);

        if (user) {
            callback(null, { user });
        } else {
            callback({
                code: grpc.status.INTERNAL,
                message: 'Failed to create user',
            });
        }
    } catch (error) {
        console.error('Error in createUser:', error); 
        callback({
            code: grpc.status.INTERNAL,
            message: 'An error occurred while creating the user',
        });
    }
};

// Get All Users
exports.getUser = async (call, callback) => {
    try {
        const users = await userService.getUser();

        if (users && users.length > 0) {
            const userList = users.map(user => ({
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                password: user.password
            }));

            callback(null, { users: userList });
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                message: 'No users found',
            });
        }
    } catch (error) {
        console.error('Error in getUser:', error); 
        callback({
            code: grpc.status.INTERNAL,
            message: 'An error occurred while fetching users',
        });
    }
};

//delete user
exports.deleteUser = async (call, callback) => {
    try {
        const userId = call.request.id;

        if (!userId) {
            return callback({
                code: grpc.status.INVALID_ARGUMENT,
                message: 'User ID is required',
            });
        }

        const deletedUser = await userService.deleteUser(userId);

        if (deletedUser) {
            callback(null, { message: 'User deleted successfully' });
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                message: 'User not found',
            });
        }
    } catch (error) {
        console.error('Error in deleteUser:', error);
        callback({
            code: grpc.status.INTERNAL,
            message: 'An error occurred while deleting the user',
        });
    }
};

//update user
exports.updateUser = async (call, callback) => {
    try {
        const userData = call.request;

        if (!userData.id || !userData.name || !userData.email || !userData.password) {
            return callback({
                code: grpc.status.INVALID_ARGUMENT,
                message: 'ID, name, email, and password are required fields',
            });
        }

        const updatedUser = await userService.updateUser(userData.id, userData);

        if (updatedUser) {
            callback(null, { user: updatedUser });
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                message: 'User not found',
            });
        }
    } catch (error) {
        console.error('Error in updateUser:', error);
        callback({
            code: grpc.status.INTERNAL,
            message: 'An error occurred while updating the user',
        });
    }
};
