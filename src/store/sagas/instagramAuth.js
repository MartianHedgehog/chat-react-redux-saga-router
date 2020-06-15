import { takeLatest } from 'redux-saga/effects';
import { LOG_IN_VIA_INSTAGRAM } from '../modules/userInformation';
import renderInstagramAuthLink from '../../utils/renderInstagramAuthLink';

function* logInViaInstagramFlow() {
  const newWindow = window.open(renderInstagramAuthLink(), 'InstagramAuth', 'height=400,width=250');
  if (window.focus) newWindow.focus();

  const token = yield new Promise((resolve) => {
    newWindow.opener.addEventListener('message', (event) => {
      if (typeof event.data !== 'string') {
        return;
      }
      resolve(event.data);
    });
  });

  console.log(token);
}

export default function* watchInstagramAuth() {
  yield takeLatest(LOG_IN_VIA_INSTAGRAM, logInViaInstagramFlow);
}
