import { Router } from "express";
import { createProduct, deleteProduct, getAllProduct, getProductById, updateProduct } from "../controllers/product.js";
import { checkIsAdmin } from "../middlewares/checkIsAdmin.js";
import { validBodyRequest } from "../middlewares/validBodyRequest.js";
import { checkAuth } from "../utils/jwt.js";
import { productSchema } from "../validSchema/product.js";

const routerProduct = Router();
routerProduct.get("/", getAllProduct);
routerProduct.get("/:id", getProductById);

routerProduct.use(checkAuth, checkIsAdmin); // middleware
routerProduct.delete("/delete/:id", deleteProduct);

routerProduct.use(validBodyRequest(productSchema)); // middleware
routerProduct.post("/", createProduct);
routerProduct.put("/:id", updateProduct);
export default routerProduct;
