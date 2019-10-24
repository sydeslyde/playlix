import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Fab from '@material-ui/core/Fab';
import StopIcon from '@material-ui/icons/Stop';
import PlayIcon from '@material-ui/icons/PlayArrow';
import transitions from '@material-ui/core/styles/transitions';

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative'
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -3,
    left: -3,
    zIndex: 1
  },
  buttonPlay: {
    zIndex: 2,
    color: 'white',
    backgroundSize: 'cover',
    '&:hover': {
      '--iconFilter': '1',
      '--coverDarking': '0.5'
    },
    '--iconFilter': '0.4',
    '--coverDarking': '0',
    overflow: 'hidden',
    '&:before': {
      // darkening the cover
      content: '""',
      position: 'absolute',
      width: '100%',
      height: '100%',
      background: 'black',
      opacity: 'var(--coverDarking)',
      //transition: 'opacity 200ms',
      transition: transitions.create('opacity', {
        duration: transitions.duration.shorter
      })
    }
    //position: 'absolute',
    //top: '50%',
    //left: '50%',
    //marginTop: -12,
    //marginLeft: -12
  },
  fabIcon: {
    //transition: 'opacity 200ms',
    transition: transitions.create('opacity'),
    opacity: 'var(--iconFilter)',
    zIndex: 3
  }
};

class SamplePlayButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { playing: false };

    this.setPlaying = bState => {
      this.audioNode && this.setState({ playing: bState, progress: 0 });
    };
    this.setProgress = progress => {
      this.audioNode && this.setState({ progress });
    };

    this.audioRef = this.audioRef.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick() {
    if (this.state.playing) {
      this.audioNode.pause();
    } else {
      // HACK pause all other audios
      document.querySelectorAll('audio').forEach(a => a.pause());
      this.audioNode.load();
      this.audioNode.play();
    }
  }

  audioRef(node) {
    this.audioNode = node;
    if (this.audioNode !== null) {
      // https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events
      this.audioNode.addEventListener('play', e => this.setPlaying(true));
      this.audioNode.addEventListener('pause', e => this.setPlaying(false));
      this.audioNode.addEventListener('timeupdate', e =>
        this.setProgress(100 * (e.target.currentTime / e.target.duration))
      );
    }
  }

  render() {
    const { playing, progress } = this.state;

    // disable rounded covers with play button for now...
    return (
      <div className={this.props.classes.root}>
        <div style={{ backgroundImage: 'url(' + this.props.coverUrl + ')', backgroundSize: 'cover', width: 40, height: 40 }} />
      </div>
    );

    return (
      <div className={this.props.classes.root}>
        <audio src={this.props.sampleUrl} ref={this.audioRef} />
        <Fab
          aria-label='Play'
          color='primary'
          className={this.props.classes.buttonPlay}
          onClick={this.handleButtonClick}
          size='small'
          style={{
            '--coverUrl': `${this.props.coverUrl}`,
            backgroundImage: 'url(' + this.props.coverUrl + ')'
          }}
        >
          {playing ? (
            <StopIcon className={this.props.classes.fabIcon} />
          ) : (
            <PlayIcon className={this.props.classes.fabIcon} />
          )}
        </Fab>
        {playing && (
          <CircularProgress
            value={progress}
            variant='static'
            size={46}
            className={this.props.classes.fabProgress}
          />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(SamplePlayButton);
