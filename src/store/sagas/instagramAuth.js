import { fork, race, take } from 'redux-saga/effects';
import { LOG_IN_VIA_INSTAGRAM } from '../modules/userInformation';
import { getInstagramAuthCodeLink } from '../../api/instagramAPI';
import { CONNECT_TO_SERVER } from '../modules/connection';

let timer;

function* logInViaInstagramFlow() {
  yield take(LOG_IN_VIA_INSTAGRAM);
  const newWindow = window.open(
    getInstagramAuthCodeLink(),
    'InstagramAuth',
    'height=400,width=400',
  );

  const authCode = yield new Promise((resolve, reject) => {
    timer = setInterval(() => {
      try {
        console.log(reject);
        if (!newWindow || newWindow.closed || newWindow.closed === undefined) {
          clearInterval(timer);
          console.log('hooyak');
        }
        if (newWindow.location.href.includes('?code=')) {
          resolve(newWindow.location.href.split('code=')[1].split('#')[0]);
          newWindow.close();
          console.log(newWindow);
        }
      } catch (e) {
        // A hack to get around same-origin security policy errors
      }
    }, 200);
  });

  console.log(authCode);
}

export default function* watchInstagramAuthorisation() {
  while (true) {
    yield take(LOG_IN_VIA_INSTAGRAM);
    yield race({
      task: fork(logInViaInstagramFlow),
      cancel: take(CONNECT_TO_SERVER),
    });
    clearInterval(timer);
  }
}
