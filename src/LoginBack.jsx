import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { getLoginCallbackParams } from './state/spotify';
import { setAuth, fetchUserPlaylistInfos } from './state/actions';

function LoginBack({ setAuth, startLoadingPlaylists }) {
  const callbackParams = getLoginCallbackParams();

  React.useEffect(() => {
    if (!callbackParams.error && callbackParams.access_token) {
      // set spotify auth callback params to state
      setAuth(callbackParams);
      // ... and start loading playlist data
      startLoadingPlaylists();
    }
  });

  if (callbackParams.error)
    return <Typography variant='body1' color='error'>
      An Error occured during Authorization: {callbackParams.error}
    </Typography>

  if (callbackParams.access_token)
    return <Redirect to='/' />;

  else return null;
}

const mapDispatchToProps = (dispatch) => ({
  setAuth: (auth) => dispatch(setAuth(auth)),
  startLoadingPlaylists: () => dispatch(fetchUserPlaylistInfos())
});

export default connect(null, mapDispatchToProps)(LoginBack);