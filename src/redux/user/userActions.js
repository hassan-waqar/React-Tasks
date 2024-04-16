import { FETCH_USERS_REQUEST } from "./userTypes"
import { FETCH_USERS_SUCCESS } from "./userTypes"
import { FETCH_USERS_FAILURE } from "./userTypes"


const fetchUsersRequest = () => {
    return {
        type : FETCH_USERS_REQUEST
    }
}

const fetchUsersSuccess = (users) => {
    return {
        type : FETCH_USERS_SUCCESS,
        payload : users
    }
}

const fetchUsersFailure = (error) => {
    return {
        type : FETCH_USERS_FAILURE,
        payload : error
    }
}