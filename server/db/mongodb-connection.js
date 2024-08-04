import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log("Connected to MongoDb");
    } catch (error) {
        console.log("Error conneciton to MongoDB: ", error.message);
    }
}

export default connectDB;