import {LOADING_UI,CLEAR_ERRORS, SET_ERRORS,STOP_LOADING } from '../types';

const intialState = {
    loading : false,
    errors : {}
}

export default function(state = intialState, action){
    switch(action.type){
        case SET_ERRORS:
            return {
                ...state,
                loading :false,
                errors:action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                loading: false,
                errors: {}
            }  
        case LOADING_UI:
            return {
                ...state,
                loading:true,
                errors: {}
            }   
        case STOP_LOADING:
        return {
            ...state, loading :false
        }     
        default :
            return state
    }   
} 