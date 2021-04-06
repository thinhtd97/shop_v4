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
          email: address.email,
        },
        config,
      ),
    )
    addToast('Add Success', { appearance: 'success', autoDismiss: true })
  } catch (error) {
    addToast(`${error}`, { appearance: 'error', autoDismiss: true })
  }
}
function* addressSaga() {
  yield takeEvery(addressConstant.ADD_ADDRESS, addAddress)
}
export default addressSaga
