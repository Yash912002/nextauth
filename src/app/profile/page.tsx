"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
	const router = useRouter();
	const [data, setData] = useState("Nothing");

	const getUserDetails = async () => {
		try {
			const res = await axios.get("/api/users/me");
			// console.log(res.data.data);
			setData(res.data.data._id);
		} catch (error: any) {
			toast.error(error.message);
		}
	};

	useEffect(() => {
		getUserDetails();
	}, []);

	const logout = async () => {
		try {
			await axios.get("/api/users/logout");
			toast.success("Logout successfully");
			router.push("/login");
		} catch (error: any) {
			toast.error(error.message);
			console.log(error.message);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-2">
			<h1 className="text-4xl font-bold">Profile page</h1>
			<hr />
			<h2 className="m-6 text-xl">
				{data === "Nothing" ? (
					"Nothing to show here"
				) : (
					<Link href={`/profile/${data}`}>{data}</Link>
				)}
			</h2>
			<hr />
			<button
				onClick={logout}
				className="p-2 border border-gray-500 rounded-lg mb-4 bg-white text-black"
			>
				Logout
			</button>
		</div>
	);
}
