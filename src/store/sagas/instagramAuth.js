import { takeLatest } from 'redux-saga/effects';
import { LOG_IN_VIA_INSTAGRAM } from '../modules/userInformation';
import { getInstagramAuthCodeLink, getAccessToken, getUsername } from '../../api/instagramAPI';

function* logInViaInstagramFlow() {
  const newWindow = window.open(
    getInstagramAuthCodeLink(),
    'InstagramAuth',
    'height=400,width=400',
  );
  if (window.focus) {
    newWindow.focus();
  }

  const whatIsThis = yield new Promise((resolve) => {
    newWindow.opener.addEventListener('message', (event) => {
      if (event.origin !== 'https://localhost:3000') {
        return;
      }
      resolve(event.data);
    });
  })
    .then((authCode) => {
      return getAccessToken(authCode);
    })
    .then((accessToken) => {
      console.log(accessToken);
      return getUsername(accessToken);
    });
  console.log(whatIsThis);
}

export default function* watchInstagramAuth() {
  yield takeLatest(LOG_IN_VIA_INSTAGRAM, logInViaInstagramFlow);
}
