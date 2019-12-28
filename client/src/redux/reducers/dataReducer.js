import {SET_SCREAMS, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM, DELETE_SCREAM, POST_SCREAM,SET_SCREAM, SUBMIT_COMMENT} from '../types'

const initialState = {
	screams: [], 
	loading : false,
	scream : {}
}

export default function(state = initialState, action){
	switch(action.type){
		case SET_SCREAMS:
			return {
				...state ,
				screams : action.payload,
				loading:false
			}
		case SET_SCREAM :

			return {
				...state, 
				scream : action.payload
			}	
		case LOADING_DATA :
			return {
				...state, loading:true
			}
		case LIKE_SCREAM :
		case UNLIKE_SCREAM :
			let index = state.screams.findIndex(scream => scream.screamId === action.payload.screamId)	
			state.screams[index] = action.payload	
			if(state.scream.screamId === action.payload.screamId){
				state.scream = action.payload
			}
				return {
					...state
				}
		case DELETE_SCREAM :
			let i = state.screams.findIndex(scream => scream.screamId === action.payload)	
			state.screams.splice(i,1)
			return {
				...state
			}	
		case POST_SCREAM:
			return {
				...state, 
				screams :[action.payload, ...state.screams]
			}	
			case SUBMIT_COMMENT:
				let indexOfState = state.screams.findIndex(scream => scream.screamId === action.payload.screamId);
				state.scream.comments.push(action.payload) 
				state.scream.commentCount += 1;
				state.screams[indexOfState] = state.scream

				return state
		default:
			return state
	}
} 