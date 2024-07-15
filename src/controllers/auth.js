import { errorMessages, successMessages } from "../constants/message.js";
import User from "../models/User.js";
import { generateToken } from "../utils/jwt.js";
import { comparePassword, hashPassword } from "../utils/password.js";

export const register = async (req, res, next) => {
	try {
		const { email, password, username } = req.body;
		console.log({ email, password, username });
		// const useExists = await User.findOne({ email });

		// if (useExists) {
		// 	return res.status(400).json({
		// 		message: errorMessages.EMAIL_EXIST || "Email already exists!",
		// 	});
		// }

		const hassPass = hashPassword(password);
		if (!hassPass) {
			return res.status(400).json({
				message: errorMessages.HASH_PASSWORD_ERROR,
			});
		}
		const user = {
			email,
			password: hassPass,
			username,
		};

		const data = await User.create(user);
		if (!data) {
			return res.status(400).json({
				message: errorMessages.REGISTER_FAIL,
			});
		}
		data.password = undefined;
		return res.status(200).json({
			message: successMessages.REGISTER_SUCCESS,
			data,
		});
	} catch (error) {
		next(error);
	}
};

export const login = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const userExists = await User.findOne({ email });
		// console.log(userExists);
		if (!userExists) {
			return res.status(400).json({
				message: errorMessages.USER_NOT_FOUND,
			});
		}

		console.log({ password, hashPass: userExists.password });

		const comparePass = await comparePassword(password, userExists.password);
		console.log(comparePass);
		if (!comparePass) {
			return res.status(400).json({
				message: errorMessages.PASSWORD_NOT_MATCH,
			});
		}

		const token = generateToken({ _id: userExists._id }, "1000d");

		userExists.password = undefined;
		return res.status(201).json({
			message: successMessages.LOGIN_SUCCESS,
			token,
			user: userExists,
		});
	} catch (error) {
		next(error);
	}
};
