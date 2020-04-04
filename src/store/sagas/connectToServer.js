import { call, fork, take, put, takeLatest } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import openSocket from 'socket.io-client';
import { receiveDialog, SEND_MESSAGE } from '../modules/dialog';
import { CONNECT_TO_SERVER } from '../modules/userInformation';

const connect = () => {
  const socket = openSocket('http://localhost:8080');
  return new Promise((resolve) => {
    socket.on('connect', () => {
      resolve(socket);
    });
  });
};

const createSocketChannel = (socket) => {
  return eventChannel((emit) => {
    const handler = (data) => {
      emit(receiveDialog(data));
    };
    socket.on('connection', handler);
    socket.on('dialog', handler);
    return () => {
      socket.off('dialog', handler);
    };
  });
};

function* read(socket) {
  const channel = yield call(createSocketChannel, socket);
  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

function* write(socket) {
  while (true) {
    const { name, msg } = yield take(SEND_MESSAGE);
    socket.emit('message', name, msg);
  }
}

function* handleIO(socket) {
  yield fork(read, socket);
  yield fork(write, socket);
}

function* connectionToServer() {
  const socket = yield call(connect);
  while (true) {
    yield call(handleIO, socket);
  }
}

export default function* watchConnectToServer() {
  yield takeLatest(CONNECT_TO_SERVER, connectionToServer);
}
