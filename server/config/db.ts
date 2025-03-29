import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Database connected Successfully");
  } catch (err) {
    console.log(err);
  }
};
export default connectDb;
