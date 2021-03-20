import { combineReducers } from 'redux'
import * as adminReducer from './adminReducer'

const rootReducer = combineReducers({
    adminLogin: adminReducer.loginReducer,
    adminProfile: adminReducer.getProfileAdmin,
    updateProfile: adminReducer.updateAdminReducer
})

export default rootReducer
