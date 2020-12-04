const mongoose = require('mongoose')
const { ObjectID } = mongoose.Schema.Types

const customerSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		contacts: [
			{
				type: ObjectID,
				ref: 'Contact'
			}
		],
		surveys: [
			{
				survey: {
					type: ObjectID,
					ref: 'Survey'
				},
				answers: [
					{
						type: String
					}
				],
				status: {
					type: String
				}
			}
		],
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
		},
		users: {
			type: ObjectID,
			ref: 'User'
		},
		status: {
			type: String,
			default: 'prospect'
		}
	},
	{
		timestamps: {
			createdAt: true,
			updatedAt: true
		}
	}
)

mongoose.model('Customer', customerSchema)
