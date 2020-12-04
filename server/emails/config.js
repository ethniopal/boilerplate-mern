const sgMail = require('@sendgrid/mail')
const { SENDGRID_KEY } = require('../keys')

sgMail.setApiKey(SENDGRID_KEY)
const msg = {
	to: 'olivier.lapointe87@gmail.com', // Change to your recipient
	from: 'olivier.lapointe87@gmail.com', // Change to your verified sender
	subject: 'Sending with SendGrid is Fun',
	text: 'and easy to do anywhere, even with Node.js',
	html: '<strong>and easy to do anywhere, even with Node.js</strong>'
}
sgMail
	.send(msg)
	.then(() => {
		console.log('Email sent')
	})
	.catch(error => {
		console.error(error)
	})
