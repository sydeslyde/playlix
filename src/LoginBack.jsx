import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getLoginCallbackParams } from './state/spotify';
import { spotifyClient } from './state/spotify';
import { setAuth, fetchUserPlaylistInfos } from './state/actions';

function LoginBack({ setAuth, startLoadingPlaylists }) {
  const callbackParams = getLoginCallbackParams();

  React.useEffect(() => {
    if (!callbackParams.error) {
      // set spotify auth callback params to state
      setAuth(callbackParams);
      // ... and start loading playlist data
      startLoadingPlaylists();
    }
  });

  if (callbackParams.error)
    return <div>{callbackParams.error}</div>

  return <Redirect to='/' />;
}

const mapDispatchToProps = (dispatch) => ({
  setAuth: (auth) => dispatch(setAuth(auth)),
  startLoadingPlaylists: () => dispatch(fetchUserPlaylistInfos())
});

export default connect(null, mapDispatchToProps)(LoginBack);