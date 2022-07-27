import * as api from '../api';
import {AUTH, FETCH_ALL} from "../constants/actionTypes";

export const signin = (formData, history) => async (dispatch) => {
    try {
        // log in
        history.push('/');
    } catch (error) {
        console.log(error.message);
    }
}

export const signup = (formData, history) => async (dispatch) => {
    try {
        history.push('/');
    } catch (error) {
        console.log(error.message);
    }
}