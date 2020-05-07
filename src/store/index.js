import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import track from './reducers/track';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({
    track,
  }),
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSaga);

export default store;