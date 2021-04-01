import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import sagaMiddleware from 'redux-saga'
import { save, load } from 'redux-localstorage-simple'
import { Provider } from 'react-redux'
import { listProductAction } from './redux/actions/productActions'
import rootReducer from './redux/reducers/rootReducer'
import App from './App'
import './assets/scss/style.scss'

import * as serviceWorker from './serviceWorker'

import { composeWithDevTools } from 'redux-devtools-extension'
import { rootSaga } from './redux/sagas'
import { listCategories } from './redux/actions/categoryActions'
import { listSub } from './redux/actions/subActions'

const createSagaMiddleware = sagaMiddleware()
const middleware = [createSagaMiddleware, thunk]

const getUserInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null
const getCartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []
const initialState = {
  userLogin: { userInfo: getUserInfoFromStorage },
  cart: { cartItems: getCartItemsFromStorage },
}

const store = createStore(
  rootReducer,
  load(),
  composeWithDevTools(applyMiddleware(...middleware, save())),
)

createSagaMiddleware.run(rootSaga)

store.dispatch(listProductAction())
store.dispatch(listCategories())
store.dispatch(listSub())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)

serviceWorker.register()
