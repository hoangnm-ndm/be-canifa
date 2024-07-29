import { Schema, model } from "mongoose";

const cartSchema = new Schema({
	userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
	products: [
		{
			product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
			quantity: { type: Number, required: true, min: 1 },
		},
	],
	totalPrice: { type: Number, required: true },
});

export const Cart = model("Cart", cartSchema);
