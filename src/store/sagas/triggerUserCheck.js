import { put, fork } from 'redux-saga/effects';
import { v4 } from 'uuid';
import { createUser } from '../modules/userInformation';

function* checkUserInfo() {
  const username = localStorage.getItem('username');
  if (username) {
    yield put(createUser(username, localStorage.getItem('userId')));
  } else {
    const id = v4();
    localStorage.setItem('userId', id);
    yield put(createUser(null, id));
  }
}

export default function* triggerUserCheck() {
  yield fork(checkUserInfo);
}
