import { applyMiddleware, createStore } from 'redux'
import rootReducer from './reducer'
import { save, load } from 'redux-localstorage-simple'
import { composeWithDevTools } from 'redux-devtools-extension'
import saga from 'redux-saga'
import { rootSaga } from './saga'

const middewareSaga = saga()
const middleware = [middewareSaga]
const store = createStore(
  rootReducer,
  load(),
  composeWithDevTools(applyMiddleware(...middleware, save())),
)

middewareSaga.run(rootSaga)

export default store
