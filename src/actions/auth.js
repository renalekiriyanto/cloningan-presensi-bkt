import {AUTH_ERROR, LOGIN_FAILED, LOGIN_SUCCESS, USER_LOADED} from "./types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import {list} from "./checkin";

export const login = (formData) => async dispatch => {
    try{
        const res = await axios.post('https://myapplaporankeeja.my.id/api/login', formData,{
            headers:{
                'Content-Security-Policy': 'upgrade-insecure-requests'
            }
        });
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser())
    } catch (e){
        dispatch({
            type: LOGIN_FAILED
        })
    }
}

export const loadUser = () => async dispatch => {
    if (localStorage.token){
        setAuthToken(localStorage.token)
    }

    try {
        const res = await axios.get('https://myapplaporankeeja.my.id/api/user',{
            headers:{
                'Content-Security-Policy': 'upgrade-insecure-requests'
            }
        });
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
        dispatch(list())
    }catch (err){
        dispatch({
            type: AUTH_ERROR
        })
    }
}