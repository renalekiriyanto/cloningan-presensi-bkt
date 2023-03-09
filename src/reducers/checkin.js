import {CHECKIN_FAILED, CHECKIN_MASUK, CHECKIN_PULANG, CHECKIN_TODAY} from "../actions/types";

const initialState = {
    checkinToday: null,
    checkStatus: null
}

export default function (state = initialState, action){
    const {type, payload} = action
    switch (type) {
        case CHECKIN_MASUK:
        case CHECKIN_PULANG:
            return {
                ...state,
                checkStatus: payload
            }
        case CHECKIN_TODAY:
            return {
                ...state,
                checkinToday: payload
            }
        case CHECKIN_FAILED:
        default:
            return state
    }
}