import axios from 'axios';

const redirectUrl = 'https://localhost:3000/instagramauth';
const scopes = ['user_profile', 'user_media'];
const responseType = 'code';
const clientSecret = '9e3ad75ebe40b896668f78d35b153c75';
const clientId = '2700206580260144';

export const getInstagramAuthCodeLink = () => {
  return `https://www.instagram.com/oauth/authorize/?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scopes.join(
    ',',
  )}&response_type=${responseType}`;
};

export const getAccessToken = (authCode) => {
  const form = new FormData();
  form.append('client_id', clientId);
  form.append('client_secret', clientSecret);
  form.append('grant_type', 'authorization_code');
  form.append('redirect_uri', 'https://localhost:3000/instagramauth');
  form.append('code', authCode);

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'accept-language': 'q=0.9,en-US',
  };

  const requestAuthCode = axios.create({
    baseURL: 'https://api.instagram.com/oauth/access_token',
    headers,
  });

  return requestAuthCode
    .post('/', form)
    .then((res) => {
      if (res.status === 200) {
        return res.data;
      }
      return res;
    })
    .catch((error) => {
      console.log(error.response);
    });
};

export const getUsername = (accessToken) => {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'accept-language': 'q=0.9,en-US',
  };

  const requestUserName = axios.create({
    baseURL: `https://graph.instagram.com/me?fields=id,username&access_token=${accessToken.access_token}`,
    headers,
  });

  const username = requestUserName.get('/').then((res) => {
    return res.data;
  });

  return username;
};
