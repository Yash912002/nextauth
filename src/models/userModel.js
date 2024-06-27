import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
	username: {
		type: String,
		required: [true, "Please provide the username"],
		unique: true,
	},
	email: {
		type: String,
		required: [true, "Please provide an email"],
		unique: true,
	},
	password: {
		type: String,
		required: [true, "Please provide the password"],
	},
	isVerified: {
		type: String,
		default: false,
	},
	isAdmin: {
		type: String,
		default: false,
	},
	forgotPasswordToken: String,
	forgotPasswordTokenExpiry: Date,
	verifyToken: String,
	verifyTokenExpiry: Date,
});

// Check whether "users" model already exist or not
const User = mongoose.models.users || mongoose.model("users", userSchema)

export default User;