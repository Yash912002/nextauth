"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
	const router = useRouter();

	const [user, setUser] = useState({
		username: "",
		email: "",
		password: "",
	});

	const [buttonDisabled, setButtonDisabled] = useState(true);
	const [loading, setLoading] = useState(false);

	const onSignUp = async () => {
		try {
			setLoading(true);
			const response = await axios.post("/api/users/signup", user);
			console.log("SignUp success ", response.data);
			router.push("/login"); // Navigate to login page
		} catch (error: any) {
			console.log("Signup failed", error);
			toast.error(error.message);
		}
	};

	useEffect(() => {
		if (
			user.email.length > 0 &&
			user.password.length > 0 &&
			user.username.length > 0
		) {
			setButtonDisabled(false);
		} else {
			setButtonDisabled(true);
		}
	}, [user]);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-2">
			<h1 className="m-2">{loading ? "Processing" : "Sign Up"}</h1>
			<hr />
			<label htmlFor="username">UserName</label>
			<input
				className="p-2 border border-gray-200 focus:outline-none focus:border-gray-600 text-black rounded-lg m-4"
				id="username"
				value={user.username}
				onChange={(e) => {
					setUser({ ...user, username: e.target.value });
				}}
				placeholder="UserName"
				type="text"
			/>

			<label htmlFor="email">Email</label>
			<input
				className="p-2 border border-gray-200 focus:outline-none focus:border-gray-600 text-black rounded-lg m-4"
				id="email"
				value={user.email}
				onChange={(e) => {
					setUser({ ...user, email: e.target.value });
				}}
				placeholder="Email"
				type="text"
			/>

			<label htmlFor="password">Password</label>
			<input
				className="p-2 border border-gray-200 focus:outline-none focus:border-gray-600 text-black rounded-lg m-4"
				id="password"
				value={user.password}
				onChange={(e) => {
					setUser({ ...user, password: e.target.value });
				}}
				placeholder="Password"
				type="password"
			/>

			<button
				onClick={onSignUp}
				className="p-2 border border-gray-500 rounded-lg mb-4 bg-white text-black"
			>
				{buttonDisabled ? "No SignUp" : "Sign Up"}
			</button>

			<Link href="/login">Visit Login</Link>
		</div>
	);
}
