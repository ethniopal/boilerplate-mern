const mongoose = require('mongoose')
const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true
		},
		password: {
			type: String,
			required: true
		},
		permission: {
			type: String,
			default: 'user'
		},
		status: {
			type: String,
			defautl: 'active'
		}
	},
	{
		timestamps: {
			createdAt: true,
			updatedAt: true
		}
	}
)

mongoose.model('User', userSchema)
