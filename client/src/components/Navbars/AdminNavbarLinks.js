import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import classNames from 'classnames'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Hidden from '@material-ui/core/Hidden'
import Poppers from '@material-ui/core/Popper'
import Divider from '@material-ui/core/Divider'
// @material-ui/icons
import Person from '@material-ui/icons/Person'
import Notifications from '@material-ui/icons/Notifications'

// core components
import Button from 'components/CustomButtons/Button.js'

import styles from 'assets/jss/material-dashboard-react/components/headerLinksStyle.js'

const useStyles = makeStyles(styles)

export default function AdminNavbarLinks() {
	const classes = useStyles()

	const [openNotification, setOpenNotification] = useState(null)
	const [openProfile, setOpenProfile] = useState(null)

	const handleClickNotification = event => {
		setOpenProfile(null)
		setOpenNotification(openNotification ? null : event.currentTarget)
	}

	const handleClickProfile = event => {
		setOpenNotification(null)
		if (openProfile && openProfile.contains(event.target)) {
			setOpenProfile(null)
		} else {
			setOpenProfile(event.currentTarget)
		}
	}

	const handleLogoutButton = async () => {
		handleClosePoppers()
		const controller = new AbortController()
		const { signal } = controller
		const token = localStorage.getItem('jwt')

		const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/logout`, {
			...signal,
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: 'application/json',
				'Content-type': 'application/json; charset=UTF-8'
			}
		})
		const data = await res.json()

		if (data.success) {
			localStorage.clear()
		}
		window.location.href = `/login`
	}

	const handleClosePoppers = () => {
		setOpenNotification(null)
		setOpenProfile(null)
	}

	return (
		<ClickAwayListener onClickAway={handleClosePoppers}>
			<div>
				{/* <div className={classes.manager}>
					<Button
						color={window.innerWidth > 959 ? 'transparent' : 'white'}
						justIcon={window.innerWidth > 959}
						simple={!(window.innerWidth > 959)}
						aria-owns={openNotification ? 'notification-menu-list-grow' : null}
						aria-haspopup="true"
						onClick={handleClickNotification}
						className={classes.buttonLink}
					>
						<Notifications className={classes.icons} />
						<span className={classes.notifications}>5</span>
						<Hidden mdUp implementation="css">
							<p onClick={handleClosePoppers} className={classes.linkText}>
								Notification
							</p>
						</Hidden>
					</Button>
					<Poppers
						open={Boolean(openNotification)}
						anchorEl={openNotification}
						transition
						disablePortal
						className={classNames({ [classes.popperClose]: !openNotification }) + ' ' + classes.popperNav}
					>
						{({ TransitionProps, placement }) => {
							return (
								<Grow
									{...TransitionProps}
									id="notification-menu-list-grow"
									style={{
										transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'
									}}
								>
									<Paper className="dropdown-popover">
										<MenuList role="menu">
											<MenuItem onClick={handleClosePoppers} className={classes.dropdownItem}>
												Mike John responded to your email
											</MenuItem>
											<MenuItem onClick={handleClosePoppers} className={classes.dropdownItem}>
												You have 5 new tasks
											</MenuItem>
											<MenuItem onClick={handleClosePoppers} className={classes.dropdownItem}>
												You{"'"}re now friend with Andrew
											</MenuItem>
											<MenuItem onClick={handleClosePoppers} className={classes.dropdownItem}>
												Another Notification
											</MenuItem>
											<MenuItem onClick={handleClosePoppers} className={classes.dropdownItem}>
												Another One
											</MenuItem>
										</MenuList>
									</Paper>
								</Grow>
							)
						}}
					</Poppers>
				</div> */}

				<div className={classes.manager}>
					<Button
						color={window.innerWidth > 959 ? 'transparent' : 'white'}
						justIcon={window.innerWidth > 959}
						simple={!(window.innerWidth > 959)}
						aria-owns={openProfile ? 'profile-menu-list-grow' : null}
						aria-haspopup="true"
						onClick={handleClickProfile}
						className={classes.buttonLink}
					>
						<Person className={classes.icons} />
						<Hidden mdUp implementation="css">
							<p className={classes.linkText}>Profile</p>
						</Hidden>
					</Button>
					<Poppers
						open={Boolean(openProfile)}
						anchorEl={openProfile}
						transition
						disablePortal
						className={classNames({ [classes.popperClose]: !openProfile }) + ' ' + classes.popperNav}
					>
						{({ TransitionProps, placement }) => (
							<Grow
								{...TransitionProps}
								id="profile-menu-list-grow"
								style={{
									transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'
								}}
								className="dropdown-popover"
							>
								<Paper>
									<MenuList role="menu">
										<Link to={`/admin/users/profile`}>
											<MenuItem onClick={handleClosePoppers} className={classes.dropdownItem}>
												Profile
											</MenuItem>
										</Link>
										{/* <MenuItem onClick={handleClosePoppers} className={classes.dropdownItem}>
											Settings
										</MenuItem> */}
										<Divider light />
										<MenuItem onClick={handleLogoutButton} className={classes.dropdownItem}>
											Logout
										</MenuItem>
									</MenuList>
								</Paper>
							</Grow>
						)}
					</Poppers>
				</div>
			</div>
		</ClickAwayListener>
	)
}
