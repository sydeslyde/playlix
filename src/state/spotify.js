import Spotify from 'spotify-web-api-js';

const authParams = {
  client_id: 'd35ceaa27c00452aaff6e5ed681a3a09',
  response_type: 'token',
  redirect_uri: window.location.protocol + '//' + window.location.host + (process.env.NODE_ENV === 'development' ? '/#/': '/playlix/#/'),
  scope: 'playlist-read-private'
  //state: 'optional',
};

export const requestLogin = () => {
  const params = Object.entries(authParams).map(([key, val]) => `${key}=${encodeURIComponent(val)}`).join('&');
  const authUrl = `https://accounts.spotify.com/authorize?${params}`;
  window.location.href = authUrl;
}

const getDecodedHashParams = () => {
  var hash = window.location.hash;
  if (hash.length === 0)
    return null;

  if (hash.startsWith('#'))
    hash = hash.substr(1);
  
  return hash.split('&')
    .map(pair => pair.startsWith('/') ? pair.substr(1) : pair)
    .map(pair => pair.split('='))
    .reduce((acc, curr) => Object.assign(acc, { [curr[0]]: curr[1] }), {});
}

export const getLoginCallbackParams = () => {
  // get errors
  const queryParams = new URLSearchParams(window.location.search);
  const err = queryParams.get('error');
  if (err != null && err.length > 0) {
    return ({
      error: err
    });
  }

  // get token params from url hash
  const hashParams = getDecodedHashParams();
  if (hashParams)
    return hashParams;

  // fallback to error if not params
  return ({
    error: 'no query parameters found'
  });
}

export const spotifyClient = new Spotify();

//client.setAccessToken(accessToken);
