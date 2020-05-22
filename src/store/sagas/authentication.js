import { put, fork, take } from 'redux-saga/effects';
import { logIn, LOG_IN, LOG_OUT } from '../modules/userInformation';

function* authentication() {
  while (true) {
    const { username } = localStorage;
    if (username) {
      yield put(logIn(username));

      yield take(LOG_OUT);
      localStorage.removeItem('username');
      localStorage.removeItem('userId');
    } else {
      const info = yield take(LOG_IN);
      localStorage.setItem('username', info.username);

      yield take(LOG_OUT);
      localStorage.removeItem('username');
      localStorage.removeItem('userId');
    }
  }
}

export default function* watchAuthentication() {
  yield fork(authentication);
}
