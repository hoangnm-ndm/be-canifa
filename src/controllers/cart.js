import { Request, Response } from "express";
import { Cart } from "../models/Cart";
import { Product } from "../models/Product";

export const addToCart = async (req, res) => {
	const userId = req.userId; // Assuming userId is available from authentication middleware
	const { productId, quantity } = req.body;
	const product = await Product.findById(productId);
	if (!product) return res.status(404).json({ message: "Product not found" });

	let cart = await Cart.findOne({ userId });
	if (!cart) cart = new Cart({ userId, products: [], totalPrice: 0 });

	const existingProductIndex = cart.products.findIndex((p) => p.product.toString() === productId);
	if (existingProductIndex >= 0) {
		cart.products[existingProductIndex].quantity += quantity;
	} else {
		cart.products.push({ product: productId, quantity });
	}

	cart.totalPrice += product.price * quantity;
	await cart.save();
	res.status(200).json(cart);
};

export const getCart = async (req, res) => {
	const userId = req.userId; // Assuming userId is available from authentication middleware
	const cart = await Cart.findOne({ userId }).populate("products.product");
	res.json(cart);
};

export const checkout = async (req, res) => {
	const userId = req.userId; // Assuming userId is available from authentication middleware
	const cart = await Cart.findOne({ userId }).populate("products.product");
	if (!cart) return res.status(400).json({ message: "Cart is empty" });

	// Handle payment process here...

	// Clear the cart after successful checkout
	cart.products = [];
	cart.totalPrice = 0;
	await cart.save();
	res.status(200).json({ message: "Checkout successful" });
};
