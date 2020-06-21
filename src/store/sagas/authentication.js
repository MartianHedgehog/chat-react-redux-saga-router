import { put, fork, take } from 'redux-saga/effects';
// eslint-disable-next-line no-unused-vars
import { logIn, LOG_IN, LOG_OUT, LOG_IN_VIA_INSTAGRAM } from '../modules/userInformation';

function* authentication() {
  while (true) {
    const { username } = localStorage;
    if (username) {
      yield put(logIn(username));

      yield take(LOG_OUT);
      localStorage.removeItem('username');
      localStorage.removeItem('userId');
    } else {
      // const info = yield take(LOG_IN);
      yield take(LOG_IN_VIA_INSTAGRAM);
      const info = {
        username: 'hellothere',
      };
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
