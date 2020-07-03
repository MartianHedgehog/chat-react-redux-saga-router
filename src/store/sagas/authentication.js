import { put, fork, take } from 'redux-saga/effects';
import { logIn, LOG_IN, LOG_OUT } from '../modules/userInformation';

function* authentication() {
  while (true) {
    if (localStorage.username) {
      yield put(logIn(localStorage.username));

      yield take(LOG_OUT);
      localStorage.removeItem('username');
      localStorage.removeItem('userId');
    } else {
      const username = yield take(LOG_IN);
      localStorage.setItem('username', username);

      yield take(LOG_OUT);
      localStorage.removeItem('username');
      localStorage.removeItem('userId');
    }
  }
}

export default function* watchAuthentication() {
  if (!localStorage.username) {
    yield fork(authentication);
  }
}
