import watchConnectToServer from './connectToServer';
import authentication from './authentication';
import watchInstagramAuth from './instagramAuth';

export default [authentication, watchInstagramAuth, watchConnectToServer];
