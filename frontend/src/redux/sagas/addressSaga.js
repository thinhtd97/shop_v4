import { call, put, takeEvery, select } from 'redux-saga/effects'
import * as addressConstant from '../constants/AddressConstant.js'
import axios from 'axios'

function* addAddress(action) {
  const { addToast, address } = action
  try {
    const { userInfo } = yield select((state) => state.userLogin)
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    yield call(() =>
      axios.post(
        `${process.env.REACT_APP_API}/address`,
        {
          fullname: address.fullname,
          district: address.district,
          wards: address.wards,
          city: address.city,
          address: address.address,
          company: address.company,
          phone: address.phone,
          addressId: address.addressId,
          email: address.email,
          active: address.active,
        },
        config,
      ),
    )
    addToast('Add Success', { appearance: 'success', autoDismiss: true })
  } catch (error) {
    addToast(`${error}`, { appearance: 'error', autoDismiss: true })
  }
}
function* removeAddress(action) {
  const { address, addToast } = action
  try {
    const { userInfo } = yield select((state) => state.userLogin)
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    yield call(() =>
      axios.delete(
        `${process.env.REACT_APP_API}/address/${address.addressId}`,
        config,
      ),
    )
    addToast('Removed Address', { appearance: 'success', autoDismiss: true })
  } catch (error) {
    addToast(`${error}`, { appearance: 'error', autoDismiss: true })
  }
}
function* updateAddress(action) {
  const { address, addToast } = action
  const { userInfo } = yield select((state) => state.userLogin)
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data: dataDetail } = yield call(() =>
      axios.put(
        `${process.env.REACT_APP_API}/address/${address.addressId}`,
        {
          fullname: address.fullname,
          district: address.district,
          wards: address.wards,
          city: address.city,
          address: address.address,
          company: address.company,
          email: address.email,
          phone: address.phone,
          active: address.active,
        },
        config,
      ),
    )
    addToast('Updated Address', { appearance: 'success', autoDismiss: true })

    const { data } = yield call(() =>
      axios.get(`${process.env.REACT_APP_API}/address`, config),
    )
    yield put({
      type: addressConstant.ADDRESS_LIST_SUCCESS,
      payload: data,
    })

    yield put({
      type: addressConstant.UPDATE_ADDRESS,
      payload: dataDetail,
    })
  } catch (error) {
    console.log(error)
  }
}
function* addressSaga() {
  yield takeEvery(addressConstant.ADD_ADDRESS, addAddress)
  yield takeEvery(addressConstant.REMOVE_ADDRESS, removeAddress)
  yield takeEvery(addressConstant.UPDATE_ADDRESS_REQUEST, updateAddress)
}
export default addressSaga
