import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

import UserModel from '../models/userModel.js';

const secret = "test";

export const signUp = async (req, res) =>
{
	const { email, password, firstName, lastName } = req.body;

	try
	{
		const oldUser = await UserModel.findOne({ email })

		if (oldUser)
		{
			return res.status(400).json({
				errorCode: -1,
				errorMessage: " Người dùng tồn tại ",
				errorData: []
			})
		} else
		{
			let salt = bcrypt.genSaltSync(12);
			const hashedPassword = bcrypt.hashSync(password, salt);

			const result = await UserModel.create({
				email,
				password: hashedPassword,
				name: `${firstName} ${lastName}`
			});
			if (result)
			{
				const token = jwt.sign({ email: result.email, id: result._id }, secret, {
					expiresIn: "1h"
				})
				res.status(201).json({
					errorCode: 1,
					errorMessage: "thanh cong",
					errorData: [{
						result: result,
						token: token
					}]
				})
			}
		}
	} catch (error)
	{
		console.error(error);
		res.status(500).json({
			errorCode: 0,
			errorMessage: " loi server, vui long cho mot chut ",
			errorData: []
		})
	}
};

export const signIn = async (req, res) =>
{
	const { email, password } = req.body;

	try
	{
		const oldUser = await UserModel.findOne({ email }).select('+password');

		if (!oldUser)
		{
			return res.status(404).json({
				errorCode: -1,
				errorMessage: " Người dùng không tồn tại ",
				errorData: []
			})
		} else
		{
			const isPasswordCorrect = bcrypt.compareSync(password, oldUser.password);

			if (!isPasswordCorrect)
			{
				return res.status(400).json({
					errorCode: -1,
					errorMessage: " thông tin không hợp lệ ",
					errorData: []
				})
			} else
			{
				const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });

				res.status(200).json({
					errorCode: 1,
					errorMessage: "thanh cong",
					errorData: [{
						email: oldUser.email,
						id: oldUser._id,
						token: token
					}]
				})
			}
		}
	} catch (error)
	{
		console.error(error);
		res.status(500).json({
			errorCode: 0,
			errorMessage: " loi server, vui long cho mot chut ",
			errorData: []
		})
	}
}

