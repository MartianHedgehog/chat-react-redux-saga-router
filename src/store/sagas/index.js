import watchConnectToServer from './connectToServer';
import authentication from './authentication';
import watchInstagramAuthorisation from './instagramAuth';

export default [authentication, watchInstagramAuthorisation, watchConnectToServer];
