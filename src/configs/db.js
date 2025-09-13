import mongoose from "mongoose";

export default async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Database connected successfully.");
    } catch (error) {
        console.error("Error connecting to database.", error);
        process.exit(1);
    }
}