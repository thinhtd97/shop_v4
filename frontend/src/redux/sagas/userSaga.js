import { call, put, takeEvery, take } from 'redux-saga/effects';
import axios from 'axios';
import * as userConstant from '../constants/userConstants';

function* login(action) {
    const { email, password, addToast } = action;
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = yield call(() => axios.post(`${process.env.REACT_APP_API}/user/login`, { email, password }, config));
        yield put({ type: userConstant.USER_LOGIN_SUCCESS, 
            payload: data 
        });
        
    } catch (error) {
        yield put({
            type: userConstant.USER_LOGIN_FAILED,
            payload: error.response && 
            error.response.data.message ? 
            error.response.data.message : 
            error.message
        });

        addToast(error.response && 
            error.response.data.message ? 
            error.response.data.message : 
            error.message, { 
                appearance: 'error', 
                autoDismiss: true,
                autoDismissTimeout: 1000,
        });
    }
}
function* register(action) {
    const { user, addToast } = action;
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = yield call(() => axios.post(`${process.env.REACT_APP_API}/user/register`, user, config));
        yield put({ type: userConstant.USER_REGISTER_SUCCESS });

        yield put({ type: userConstant.USER_LOGIN_SUCCESS, payload: data });

        addToast("Signup successfully!", { 
            appearance: 'success', 
            autoDismiss: true,
            autoDismissTimeout: 1000,
        });
        
    } catch (error) {
        yield put({
            type: userConstant.USER_REGISTER_FAILED,
            payload: error.response && 
            error.response.data.message ? 
            error.response.data.message : 
            error.message
        });

        addToast(error.response && 
            error.response.data.message ? 
            error.response.data.message : 
            error.message, { 
                appearance: 'error', 
                autoDismiss: true,
                autoDismissTimeout: 1000,
        });
    }
}
function* logout() {
    yield put({ type: userConstant.LOGOUT });
}

function* userSaga() {
    yield takeEvery(userConstant.USER_LOGIN_REQUEST, login);
    yield takeEvery(userConstant.USER_REGISTER_REQUEST, register);
    yield take(userConstant.LOGOUT, logout)
}

export default userSaga;