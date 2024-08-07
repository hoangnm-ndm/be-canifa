import Joi from "joi";

export const categorySchema = Joi.object({
	name: Joi.string().required().min(6).max(255).messages({
		"string.base": "Name phải là một chuỗi!",
		"string.empty": "Name không được để trống!",
		"string.min": "Name phải có ít nhất 6 ký tự!",
		"string.max": "Name không được quá 255 ký tự!",
	}),
	description: Joi.string().min(6).messages({
		"string.base": "Desc phải là một chuỗi!",
		"string.empty": "Desc không được để trống!",
		"string.min": "Desc phải có ít nhất 6 ký tự!",
	}),
});
