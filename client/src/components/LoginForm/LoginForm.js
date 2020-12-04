import React from 'react'
//material-ui
import { Paper, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core'

import { useForm } from 'react-hook-form'
import { regexEmail } from '../../constants/regexPattern'

import styled from 'styled-components'

const LoginForm = ({ ...props }) => {
	//form validation
	const { register, handleSubmit, formState, errors, setError } = useForm({
		mode: 'onTouched'
	})
	const { isSubmitting, isSubmitted, isSubmitSuccessful } = formState

	//gestion du submit
	const onSubmit = data => {
		// console.log(data)
		// setError('username', { message: 'test' })
	}

	//gestion des erreurs
	const validations = {
		username: {
			required: 'Vous devez compléter ce champ',
			pattern: {
				value: regexEmail,
				message: 'Vous devez avoir un courriel valide'
			}
		},
		password: { required: 'Vous devez compléter ce champ' },
		remember: {}
	}

	//si soumis correctement
	if (isSubmitSuccessful) {
		console.log('succes')
	}

	return (
		<LoginFormStyled>
			<Paper className="login-form" elevation={1}>
				<h1 className="title">Connexion</h1>
				<form className="outer-spacing" onSubmit={handleSubmit(onSubmit)}>
					{isSubmitSuccessful && <div className="alert alert-success">Merci pour votre inscription</div>}

					{isSubmitted && errors && (
						<div className="alert alert-error">
							Veuillez corriger tous les erreurs avant de soumettre à nouveau le formulaire
						</div>
					)}
					<div className="form-group">
						<TextField
							id="username"
							name="username"
							label="Courriel"
							type="email"
							inputProps={{ maxLength: 100 }}
							helperText={errors.username && errors.username.message}
							error={Boolean(errors.username)}
							fullWidth
							autoFocus
							required
							inputRef={register(validations.username)}
						/>
					</div>
					<div className="form-group">
						<TextField
							id="password"
							name="password"
							label="Mot de passe"
							type="password"
							inputProps={{
								maxLength: 100,
								autoComplete: 'on'
							}}
							fullWidth
							required
							helperText={errors.password && errors.password.message}
							error={Boolean(errors.password)}
							inputRef={register(validations.password)}
						/>
					</div>
					<div className="form-group flex-between">
						<FormControlLabel
							control={
								<Checkbox color="primary" name="remember" inputRef={register(validations.remember)} />
							}
							label="Se souvenir de moi"
						/>

						<Button
							disableFocusRipple
							disableRipple
							style={{ textTransform: 'none' }}
							variant="text"
							color="primary"
						>
							Mot de passe oublié ?
						</Button>
					</div>

					<Button
						disabled={isSubmitting}
						className="submit-button"
						variant="outlined"
						color="primary"
						type="submit"
						style={{ textTransform: 'none' }}
						onClick={handleSubmit(onSubmit)}
					>
						Login
					</Button>
				</form>
			</Paper>
		</LoginFormStyled>
	)
}

const LoginFormStyled = styled.div`
	max-width: 500px;
	margin: 2rem auto;
	.title {
		text-align: center;
	}
	.login-form {
		padding: 0.5rem;
	}
	.form-group {
		padding: 0.5rem 0;
	}
	.flex-between {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
	}
	.submit-button {
		display: block;
		margin: 0 auto;
	}
`

export default LoginForm
