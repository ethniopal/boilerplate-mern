import React from 'react'
import Layout from '../components/Layout'
import LoginForm from '../components/LoginForm'
import styled from 'styled-components'

const Login = () => {
	return (
		<PlaceCenter>
			<LoginForm />
		</PlaceCenter>
	)
}

const PlaceCenter = styled.div`
	display: grid;
	place-content: center center;
	min-height: 90vh;
`

export default Login
