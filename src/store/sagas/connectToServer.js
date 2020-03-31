import { takeEvery, select, fork } from 'redux-saga/effects';
import openSocket from 'socket.io-client';
import receiveSocket from './receiveSocket';
import { username } from '../modules/selectors';

function* connectionToServer() {
  const socket = openSocket('http://localhost:8080');
  yield fork(receiveSocket, socket);
  console.log(yield select(username));
  console.log('IM SAGA IM WORKING');
}

export default function* watchConnectToServer() {
  yield takeEvery('CONNECT_TO_SERVER', connectionToServer);
}
