import { call, put, select, takeEvery } from 'redux-saga/effects'
import axios from 'axios'
import * as cateConstant from '../constant/categoryConstant.js'
import { notification } from 'antd';

function* createCate(action) {

}

function* cateSaga() {
    yield takeEvery(cateConstant.CATEGORY_CREATE_REQUEST, createCate);
}

export default cateSaga;