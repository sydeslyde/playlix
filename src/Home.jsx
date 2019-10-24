import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { connect } from 'react-redux';

import LoginBack from './LoginBack';
import { requestLogin } from './state/spotify';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    padding: theme.spacing(3, 2),
  },
  center: {
    textAlign: 'center',
    margin: theme.spacing(3)
  }
}));

function Home({ loggedIn }) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Typography variant='h2' gutterBottom>
        Playlix
      </Typography>
      <Typography variant='h5' gutterBottom>
        Welcome to the one and only Playlist Exporter for Spotify!
      </Typography>

      {!loggedIn ? (<div>
      <Typography gutterBottom>
        Please Login to your Spotify Account first and allow access to your playlists to export them.
      </Typography>
      <Typography gutterBottom>
        After logging in, you can select a playlist in the drawer on the left to view its tracks, and to export the tracklist to multiple formats, like CSV or JSON.
      </Typography>

      <div className={classes.center}>
        <Button variant='contained' color='primary' onClick={requestLogin}>LOGIN WITH SPOTIFY</Button>
        <LoginBack />
      </div></div>) : null}

      <Typography gutterBottom>
        Please select a playlist in the drawer on the left to view its tracks, and to export the tracklist to multiple formats, like CSV or JSON.
      </Typography>
      
      <Typography>
        In most cases, CSV will be the best choice, because it can easyly be displayed using most Spreadsheet-Software.
      </Typography>
    </Paper>
  )
}

const mapStateToProps = (state) => ({
  loggedIn: state.auth != null
});

export default connect(mapStateToProps, null)(Home);
