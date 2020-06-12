const renderInstagramAuthLink = () => {
  const redirectUrl = 'https://localhost:3000/instagramauth';
  const scopes = ['user_profile', 'user_media'];
  const responseType = 'code';
  //  const appSecret = '730f74ae404d46fe256cc471bfd07a84';
  const clientId = '1155457871474907';

  return `https://www.instagram.com/oauth/authorize/?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scopes.join(
    ',',
  )}&response_type=${responseType}`;
};

export default renderInstagramAuthLink;
