import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		description: {
			type: String,
		},
		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Category",
		},
		thumbnail: { type: String },
		isHidden: {
			type: Boolean,
			default: false,
		},
		stock: {
			type: Number,
			default: 0,
		},
		rate: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

export default mongoose.model("Product", productSchema);
