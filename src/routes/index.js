import { Router } from "express";
import routerProduct from "./product.js";
import routerAuth from "./auth.js";
import routerCategory from "./category.js";
import routerUser from "./user.js";

const router = Router();

router.use("/products", routerProduct);
router.use("/auth", routerAuth);
router.use("/categories", routerCategory);
router.use("/users", routerUser);

export default router;
