import { errorMessages, successMessages } from "../constants/message.js";
import Category from "../models/Category.js";
import Product from "../models/Product.js";

export const getAllProduct = async (req, res, next) => {
  try {
    const data = await Product.find({}).populate("category");
    if (!data || data.length === 0) {
      return res.status(400).json({
        message:
          errorMessages?.PRODUCT_NOT_FOUND || "Khong tim thay san pham nao!",
      });
    }

    return res.status(200).json({
      message:
        successMessages?.GET_PRODUCT_SUCCESS || "Lay san pham thanh cong!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await Product.findById(id).populate("category");
    if (!data) {
      return res.status(400).json({
        message:
          errorMessages?.PRODUCT_NOT_FOUND || "Khong tim thay san pham nao!",
      });
    }

    return res.status(200).json({
      message:
        successMessages?.GET_PRODUCT_SUCCESS || "Lay san pham thanh cong!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await Product.findByIdAndDelete(id);
    if (!data) {
      return res.status(400).json({
        message: errorMessages?.DELETE_PRODUCT_FAIL || "Xoa that bai!",
      });
    }

    return res.status(200).json({
      message: successMessages?.DELETE_PRODUCT_SUCCESS || "Xoa thanh cong!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const data = await Product.create(req.body);
    const updateCategory = await Category.findByIdAndUpdate(
      data.category,
      {
        $push: { products: data._id },
      },
      { new: true }
    );
    console.log(updateCategory);
    if (!data || !updateCategory) {
      return res.status(400).json({
        message: errorMessages?.CREATE_PRODUCT_FAIL || "Tao moi that bai!",
      });
    }

    return res.status(200).json({
      message: successMessages?.CREATE_PRODUCT_SUCCESS || "Tao moi thanh cong!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const data = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      {
        new: true,
      }
    );
    if (!data) {
      return res.status(400).json({ message: errorMessages?.UPDATE_FAIL });
    }

    return res.status(200).json({
      message: successMessages?.UPDATE_SUCCESS || "Cap nhat thanh cong!",
      data,
    });
  } catch (error) {
    next(error);
  }
};
