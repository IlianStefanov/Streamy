import { put, takeLatest } from 'redux-saga/effects';
import { CREATE_STREAM } from '../actions/types';



export function* logOutUserSaga() {
    yield put(CREATE_STREAM);
}