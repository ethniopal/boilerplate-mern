import React from 'react'
import { Switch, Route } from 'react-router-dom'
// import { DataGrid } from '@material-ui/data-grid';
// https://www.npmjs.com/package/react-data-table-component

//pages
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Customers from './pages/Customers'
import Submissions from './pages/Submissions'
import Surveys from './pages/Surveys'

function App() {
	return (
		<div className="App">
			<Switch>
				<Route path="/" exact>
					<Login />
				</Route>
				<Route path="/register" exact>
					<Register />
				</Route>
				<Route path="/dashboard" exact>
					<Dashboard />
				</Route>
				<Route path="/customers" exact>
					<Customers />
				</Route>
				<Route path="/submissions" exact>
					<Submissions />
				</Route>
				<Route path="/surveys" exact>
					<Surveys />
				</Route>
				<Route path={['/surveys', '/surveys/:id']} exact>
					<Surveys />
				</Route>
			</Switch>
		</div>
	)
}

export default App
