const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const connectDb = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/usergRPC');
        console.log('MongoDb connected successfully!');
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

module.exports = connectDb