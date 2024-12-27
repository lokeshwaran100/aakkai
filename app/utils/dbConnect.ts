import mongoose from "mongoose";

const dbConnect = async () => {
  if (mongoose.connections[0].readyState) {
    // If already connected, return
    return;
  }

  try {
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    throw new Error("Failed to connect to database");
  }
};

export default dbConnect;
