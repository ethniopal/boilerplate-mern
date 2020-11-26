import axios from 'axios'
import { userURL } from '../api/api'

//Action Creator
export const loadUsers = () => async dispatch => {
	//FETCH AXIOS
	const userData = await axios.get(userURL)
	dispatch({
		type: 'FETCH_GAMES',
		payload: {
			user: userData.data.results
		}
	})
}
