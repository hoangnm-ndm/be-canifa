import { errorMessages } from "../constants/message.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();
const { JWT_SECRET } = process.env;

export const verifyToken = (token) => {
	return jwt.verify(token, JWT_SECRET);
};

export const generateToken = (payload, expiresIn = "1d") => {
	return jwt.sign(payload, JWT_SECRET, {
		expiresIn: expiresIn,
	});
};

export const checkAuth = async (req, res, next) => {
	try {
		const token = req.headers?.authorization?.split(" ")[1];
		if (!token) {
			return res.status(400).json({
				message: errorMessages.TOKEN_INVALID,
			});
		}
		const decode = verifyToken(token);
		if (!decode) {
			return res.status(400).json({
				message: errorMessages.TOKEN_INVALID,
			});
		}
		const user = await User.findById(decode._id);
		req.user = user;
		next();
	} catch (error) {
		next(error);
	}
};
