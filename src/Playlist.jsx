import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Paper from '@material-ui/core/Paper';
import SamplePlayButton from './SamplePlayButton';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import localDownloadString from './utils/download';
import CircularProgress from '@material-ui/core/CircularProgress';
import durationFormatter from './utils/durationFormatter';
import { fetchPlaylistTracks } from './state/actions';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    padding: theme.spacing(3, 2),
    overflowX: 'auto'
  },
  list: {
    width: '100%',
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: 'inline'
  }
}));

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1)
  },
  spacer: {
    flex: '1 1 100%'
  },
  actions: {
    color: theme.palette.text.secondary,
    flexShrink: 0
  },
  title: {
    flex: '0 0 auto'
  },
  progress: {
    verticalAlign: 'middle',
    marginRight: 12
  }
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const { loading, canSave, playlistName, trackCount } = props;

  return (
    <Toolbar className={classes.root}>
      <div className={classes.title}>
        <Typography variant='h6' id='tableTitle'>
          Playlist '{playlistName}'
        </Typography>
        <Typography color='inherit' variant='subtitle1'>
          {trackCount} Tracks
        </Typography>
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
      {loading ? (
          <Tooltip title='List is still loading tracks'>
            <CircularProgress size={24} className={classes.progress} />
          </Tooltip>
        ) : (
          <Tooltip title='Save list'>
            <div>
              <IconButton
                aria-label='Save list'
                onClick={e => localDownloadString('hello world', playlistName+'.csv')}
                disabled={!canSave}>
                <SaveIcon />
              </IconButton>
            </div>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

function PlaylistTable(props) {
  const classes = useStyles();
  const { playlistId, playlistExists, tracks, loading, playlistName, trackCount, requestFetchPlaylistTracks } = props;

  React.useEffect(() => {
    if (playlistExists && loading == null) {
      requestFetchPlaylistTracks();
    }
  });

  if(!playlistExists) {
    return <Paper className={classes.root}>
      Playlist with id {playlistId} not found!
    </Paper>
  }

  return (
    <Paper className={classes.root}>
      <EnhancedTableToolbar
        loading={loading}
        canSave={loading === true}
        playlistName={playlistName}
        trackCount={trackCount}
      />
      <List className={classes.list}>
        {tracks.map(track => (
          <ListItem alignItems='flex-start' key={track.url}>
            <ListItemAvatar>
              <SamplePlayButton sampleUrl={track.sampleUrl} coverUrl={track.coverUrl} />
            </ListItemAvatar>
            <ListItemText
              primary={track.title}
              secondary={
                <React.Fragment>
                  <Typography component='span' variant='body2' className={classes.inline}>
                    {track.artist}
                  </Typography>
                  {' — '}
                  <Typography component='span' variant='body2' className={classes.inline}>
                    {track.album}
                  </Typography>
                </React.Fragment>
              }
            />
            <ListItemSecondaryAction>
              <ListItemText secondary={durationFormatter(track.duration)} />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

const playlistExists = (state, ownProps) => Object.keys(state.playlists).indexOf(ownProps.playlistId) >= 0;
// TODO refactor this, it is ugly....
const mapStateToProps = (state, ownProps) => ({
  playlistExists: playlistExists(state, ownProps),
  playlistName: playlistExists(state, ownProps) ? state.playlists[ownProps.playlistId].name : null,
  trackCount: playlistExists(state, ownProps) ? state.playlists[ownProps.playlistId].tracks.length : null,
  tracks: playlistExists(state, ownProps) ? state.playlists[ownProps.playlistId].tracks : null,
  loading: playlistExists(state, ownProps) ? state.playlists[ownProps.playlistId].loading : false
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  requestFetchPlaylistTracks: () => dispatch(fetchPlaylistTracks(ownProps.playlistId))
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistTable);