const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		phone: {
			phone: {
				type: String,
				required: true
			},
			ext: {
				type: Number
			},
			mobile: {
				type: String
			}
		},
		address: {
			address: {
				type: String
			},
			city: {
				type: String
			},
			province: {
				type: String
			},
			country: {
				type: String
			},
			zip: {
				type: String
			}
		},

		email: {
			type: String,
			required: true
		},
		note: {
			type: String,
			required: true
		}
	},
	{
		timestamps: {
			createdAt: true,
			updatedAt: true
		}
	}
)

mongoose.model('Contact', contactSchema)
