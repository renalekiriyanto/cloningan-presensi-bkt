import {AUTH_ERROR, LOGIN_FAILED, LOGIN_SUCCESS, USER_LOADED} from "../actions/types";

const initialState = {
    token: localStorage.token,
    isAuthenticated: null,
    isLoading: null,
    user: null
}

export default function (state = initialState, action){
    const {type, payload} = action
    switch (type){
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: payload
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token)
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
            }
        case LOGIN_FAILED:
        case AUTH_ERROR:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                isLoading: false,
                user: null
            }
        default:
            return state
    }
}