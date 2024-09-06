const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const userController = require('./controllers/userControllers.js');
const connectDb = require('./config/db');
const PROTO_PATH = './proto/user.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});

const UserProto = grpc.loadPackageDefinition(packageDefinition).user;
const server = new grpc.Server();

server.addService(UserProto.userService.service, {
    getUser: userController.getUser,
    createUser: userController.createUser,
    updateUser:userController.updateUser,
    deleteUser:userController.deleteUser
});

const PORT = 50052;

server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(), async (error, port) => {
    if (error) {
        return console.error('Server error:', error);
    }

    await connectDb();

    console.log(`gRPC server running at http://localhost:${port}`);
});
