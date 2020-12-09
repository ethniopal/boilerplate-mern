import React from 'react'
import Layout from '../components/Layout'
import { useLocation } from 'react-router-dom'

const Surveys = () => {
	const location = useLocation()
	const pathId = location.pathname.split('/')[2]

	return (
		<Layout>
			Surveys
			{pathId && <>Popup</>}
		</Layout>
	)
}

export default Surveys
