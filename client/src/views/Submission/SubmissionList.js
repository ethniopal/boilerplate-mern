import React from 'react'
import { Link } from 'react-router-dom'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'

import Card from '../../components/Card/Card.js'
import CardHeader from '../../components/Card/CardHeader.js'
import CardBody from '../../components/Card/CardBody.js'

import Button from '../../components/CustomButtons/Button.js'

import SubmissionDataList from '../../components/Submission/SubmissionDataList'

//css
const styles = {
	cardCategoryWhite: {
		color: 'rgba(255,255,255,.62)',
		margin: '0',
		fontSize: '14px',
		marginTop: '0',
		marginBottom: '0'
	},
	cardTitleWhite: {
		color: '#FFFFFF',
		marginTop: '0px',
		minHeight: 'auto',
		fontWeight: '300',
		fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
		marginBottom: '3px',
		textDecoration: 'none'
	}
}

export default function SubmissionList() {
	const useStyles = makeStyles(styles)
	const classes = useStyles()
	return (
		<div>
			<Card>
				<CardHeader color="info">
					<h4 className={classes.cardTitleWhite}>Liste des soumisisons</h4>
					<p className={classes.cardCategoryWhite}>
						Veuillez sélectionner les soumissions que vous désirez voir
					</p>
				</CardHeader>
				<CardBody>
					<SubmissionDataList />
				</CardBody>
			</Card>
		</div>
	)
}
