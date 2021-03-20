import { applyMiddleware, createStore } from 'redux'
import rootReducer from './reducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import saga from 'redux-saga'
import { rootSaga } from './saga'

const middewareSaga = saga()
const middleware = [middewareSaga]
const getAdminInfoFromStorage = localStorage.getItem('adminInfo')
  ? JSON.parse(localStorage.getItem('adminInfo'))
  : null
const initialState = {
  adminLogin: { adminInfo: getAdminInfoFromStorage },
}
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
)

middewareSaga.run(rootSaga)

export default store
