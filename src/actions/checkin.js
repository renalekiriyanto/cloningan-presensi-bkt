import axios from "axios";
import {CHECKIN_FAILED, CHECKIN_TODAY} from "./types";
import setAuthToken from "../utils/setAuthToken";

export const list = () => async dispatch => {
    if (localStorage.token){
        setAuthToken(localStorage.token)
    }
    try{
        const res = await axios.get('https://myapplaporankeeja.my.id/api/absen')
        dispatch({
            type: CHECKIN_TODAY,
            payload: res.data
        })
    }catch (e){
        dispatch({
            type: CHECKIN_FAILED
        })
    }
}