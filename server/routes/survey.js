const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model('User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../keys')
const { requireLogin } = require('../middlewares/requireLogin')

const {
	getAllSurveysController,
	getSurveyController,
	deleteSurveyController,
	updateSurveyController
} = require('../controllers/surveyController')
const {
	createQuestionController,
	deleteSurveyController,
	deleteQuestionController,
	updateQuestionController
} = require('../controllers/surveyController')

router.get('/surveys/', requireLogin, getAllSurveysController)

router.get('/surveys/:idSurvey', requireLogin, getSurveyController)
router.get('/surveys/:idSurvey/question/', requireLogin, getQuestionController)
router.get('/surveys/:idSurvey/question/create', requireLogin, createQuestionController)

router.delete('/surveys/:idSurvey/delete', requireLogin, deleteSurveyController)
router.delete('/surveys/:idSurvey/question/:idQuestion/delete', requireLogin, deleteQuestionController)

router.patch('/surveys/:idSurvey/update', requireLogin, updateSurveyController)
router.patch('/surveys/:idSurvey/question/:idQuestion/update', requireLogin, updateQuestionController)

module.exports = router
