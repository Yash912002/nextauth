"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import Link from "next/link";

export default function VerifyEmailPage() {
	const [token, setToken] = useState("");
	const [verified, setVerified] = useState(false);
	const [error, setError] = useState(false);

	// const router = useRouter();

	const verifyUserEmail = async () => {
		try {
			await axios.post("/api/users/verifyemail", { token });
			setVerified(true);  
      setError(false);
		} catch (error: any) {
			setError(true);
			console.log(error.response.data);
			toast.error(error.message);
		}
	};

	useEffect(() => {
		setError(false);
		const urlToken = window.location.search.split("=")[1];
		setToken(urlToken || "");

		// const {query} = router;
		// const urlToken = query.token
		// setToken(urlToken)
	}, []);

	useEffect(() => {
		setError(false);
		if (token.length > 0) {
			verifyUserEmail();
		}
	}, [token]);

	return (
		<div className="flex flex-col justify-center items-center py-2 min-h-screen">
			<h1 className="text-4xl"> Verify Email</h1>
			<h2 className="p-2 bg-blue-500 text-white">
				{token ? `${token}` : "No token"}
			</h2>

			{verified && (
				<div>
					<h2 className="text-green-500">Email Verified successfully</h2>
					<Link href="/login">Login</Link>
				</div>
			)}

			{error && (
				<div>
					<h2>Error</h2>
				</div>
			)}
		</div>
	);
}
