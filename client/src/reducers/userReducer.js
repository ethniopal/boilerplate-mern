const initState = {
	user: {}
}

const userReducer = (state = initState, action) => {
	switch (action.type) {
		case 'FETCH_USERS':
			return {
				...state,
				user: action.payload.user
			}
		case 'FETCH_SEARCHED':
			return {
				...state,
				searched: action.payload.searched
			}
		case 'CLEAR_SEARCHED':
			return {
				...state,
				searched: []
			}
		default:
			return { ...state }
	}
}

export default userReducer
