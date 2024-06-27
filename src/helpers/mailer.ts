import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
	try {
		const hashedToken = await bcryptjs.hash(userId.toString(), 10);

		if (emailType === "VERIFY") {
			await User.findByIdAndUpdate(userId, {
				$set: {
					verifyToken: hashedToken,
					verifyTokenExpiry: Date.now() + 3600000,
				},
			});
		} else if (emailType === "RESET") {
			await User.findByIdAndUpdate(userId, {
				$set: {
					forgotPasswordToken: hashedToken,
					forgotPasswordTokenExpiry: Date.now() + 3600000,
				},
			});
		}

		var transporter = nodemailer.createTransport({
			host: "sandbox.smtp.mailtrap.io",
			port: 2525,
			auth: {
				user: "b2b9f154179f92",
				pass: "9a304036c3b3b8",
			},
		});

		const mailOptions = {
			from: '"yash@gmail.com>',
			to: email,
			subject:
				emailType === "VERIFY" ? "Verify your email" : "Reset your password",
			html: `<p> Click <a href="${
				process.env.DOMAIN
			}/verifyemail?token=${hashedToken}">here</a> to ${
				emailType === "VERIFY" ? "verify your email" : "Reset your password"
			} or copy and paste the link given below in your browser
			<br /> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
		</p>`,
		};

		const mailResponse = await transporter.sendMail(mailOptions);
		return mailResponse;
	} catch (error: any) {
		throw new Error(error.message);
	}
};
