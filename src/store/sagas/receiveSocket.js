import { put } from 'redux-saga/effects';
import { receiveDialog } from '../modules/dialog';

// function triggerAction(action, dialog) {
//   console.log('trigger action', action, dialog);
//   // yield put(action(dialog));
// }

export default function* receiveSocket(socket) {
  console.log('FORKED');
  let dialog;
  socket.emit('dialog', (receivedDialog) => {
    console.log(receivedDialog);
  });

  yield put(receiveDialog(dialog));
}
