import { Router } from "express";
import { login, register } from "../controllers/auth.js";
import { validBodyRequest } from "../middlewares/validBodyRequest.js";
import { loginSchema, registerSchema } from "../validSchema/auth.js";
import { forgotPassword } from "../controllers/forgotPassword.js";

const routerAuth = Router();
routerAuth.post("/register", validBodyRequest(registerSchema), register);
routerAuth.post("/login", validBodyRequest(loginSchema), login);
routerAuth.post("/forgot-password", forgotPassword);

export default routerAuth;
