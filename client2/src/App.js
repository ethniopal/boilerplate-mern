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
				<Route path={['/', '/login']} exact>
					<Login />
				</Route>
				<Route path="/admin/register" exact>
					<Register />
				</Route>
				<Route path={['/admin', '/admin/dashboard']} exact>
					<Dashboard />
				</Route>
				<Route path="/admin/customers" exact>
					<Customers />
				</Route>
				<Route path="/admin/submissions" exact>
					<Submissions />
				</Route>
				<Route path="/admin/surveys" exact>
					<Surveys />
				</Route>
			</Switch>
		</div>
	)
}

export default App
