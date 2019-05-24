import { fork } from 'redux-saga/effects';
import { userSagas, userReducers } from './user';
import { combineReducers } from 'redux';
import { otherReducers } from './other';
const sagas = [...userSagas];

export function* rootSaga() {
  for (const saga of sagas) {
    yield fork(saga);
  }
}

// reducer相关
const appReducer = combineReducers({
  ...userReducers,
  ...otherReducers,
});
const rootReducer = (state: any, action: any) => {
  return appReducer(state, action);
};
export { rootReducer };
export * from './actionTypes';
