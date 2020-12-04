import React from 'react'
import { Link } from 'react-router-dom'

import './Nav.scss'

const Nav = () => {
	return (
		<nav>
			<ul>
				<li>
					<Link to="/">Login</Link>
				</li>
				<li>
					<Link to="/register">Register</Link>
				</li>
				<li>
					<Link to="/dashboard">Dashboard</Link>
				</li>
				<li>
					<Link to="/customers">Customers</Link>
				</li>
				<li>
					<Link to="/submissions">Submissions</Link>
				</li>
				<li>
					<Link to="/surveys">Surveys</Link>
				</li>
			</ul>
		</nav>
	)
}

export default Nav
