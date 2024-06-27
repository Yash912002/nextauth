import mongoose from "mongoose";

export async function connectDB() {
	try {
		await mongoose.connect(process.env.MONGODB_URL!);
		const connection = mongoose.connection;

		connection.on("connected", () => {
			console.log("MongoDB connected Successfully");
		});

		connection.on("error", (err) => {
			console.log("MongoDB connection error ", err);
		});

    // process.exit()
	} catch (error) {
		console.log("Something went wrong while connecting to DB, ", error);
	}
}
