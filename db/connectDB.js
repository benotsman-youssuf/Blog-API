import mongoose from "mongoose";

const connectDb = async(DB_URL) =>{
  try {
    await mongoose.connect(DB_URL)
    console.log(`DB connected on ${DB_URL}`)
  } catch (error) {
    console.error(`Error in connectDb: ${error}`)
  }
}
export default connectDb