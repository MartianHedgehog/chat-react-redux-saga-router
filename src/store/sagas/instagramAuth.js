import { takeLatest } from 'redux-saga/effects';
import { LOG_IN_VIA_INSTAGRAM } from '../modules/userInformation';
import { getInstagramAuthCodeLink } from '../../api/instagramAPI';

function* logInViaInstagramFlow() {
  const newWindow = window.open(
    getInstagramAuthCodeLink(),
    'InstagramAuth',
    'height=400,width=400',
  );

  newWindow.focus();

  const authCode = yield new Promise((resolve) => {
    const timer = setInterval(() => {
      try {
        if (!newWindow.localStorage) {
          return;
        }
        if (newWindow.location.href.includes('?code=')) {
          clearInterval(timer);
          resolve(newWindow.location.href.split('code=')[1].split('#')[0]);
        }
      } catch (e) {
        console.log(e);
      }
    }, 200);
  });

  console.log(authCode);
}

export default function* watchInstagramAuth() {
  yield takeLatest(LOG_IN_VIA_INSTAGRAM, logInViaInstagramFlow);
}
