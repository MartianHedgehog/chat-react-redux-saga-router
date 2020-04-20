import { call, fork, take, put, select, race, cancelled } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import openSocket from 'socket.io-client';
import { receiveDialog, SEND_MESSAGE } from '../modules/dialogs';
import {
  CONNECT_TO_SERVER,
  connectionError,
  DISCONNECT_FROM_SERVER,
  disconnectFromServer,
} from '../modules/connection';

const getUserInformation = (state) => state.userInformation;

let socket;

const connect = (info) => {
  socket = openSocket('http://localhost:8080');
  return new Promise((resolve) => {
    socket.on('connect', () => {
      socket.emit('userCheck', info);
      resolve(socket);
    });
  });
};

// eslint-disable-next-line no-unused-vars
const disconnect = () => {
  socket = openSocket('http://localhost:8080');
  return new Promise((resolve) => {
    socket.on('disconnect', () => {
      resolve(socket);
    });
  });
};
// eslint-disable-next-line no-unused-vars
const reconnect = () => {
  socket = openSocket('http://localhost:8080');
  return new Promise((resolve) => {
    socket.on('reconnect', () => {
      resolve(socket);
    });
  });
};

const createSocketChannel = (server) => {
  return eventChannel((emit) => {
    const handler = (data) => {
      emit(receiveDialog(data));
    };
    server.on('connection', handler);
    server.on('dialog', handler);
    return () => {
      server.off('dialog', handler);
    };
  });
};

function* read(server) {
  const channel = yield call(createSocketChannel, server);
  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

function* write(server) {
  while (true) {
    const { name, msg } = yield take(SEND_MESSAGE);
    server.emit('message', name, msg);
  }
}

function* handleIO(server) {
  yield fork(read, server);
  yield fork(write, server);
}

function* connectionToServer() {
  try {
    const userInfo = yield select(getUserInformation);
    socket = yield call(connect, userInfo);
    yield call(handleIO, socket);
  } catch (error) {
    yield put(connectionError(error));
  } finally {
    if (yield cancelled()) {
      socket.disconnect(true);
      yield put(disconnectFromServer());
    }
  }
}

export default function* watchConnectToServer() {
  while (true) {
    yield take(CONNECT_TO_SERVER);
    yield race({
      task: call(connectionToServer),
      cancel: take(DISCONNECT_FROM_SERVER),
    });
  }
}
