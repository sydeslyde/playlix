import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { connect } from 'react-redux';
import { uiToggleSmallDrawerOpen } from '../state/actions';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  hide: {
    display: 'none'
  }
}));

function AppAppBar(props) {
  const classes = useStyles();
  const handleDrawerToggle = props.handleDrawerToggle;

  return <AppBar
    position='fixed'
    className={classes.appBar}>
    <Toolbar>
      <IconButton
        color='inherit'
        aria-label='Open drawer'
        onClick={handleDrawerToggle}
        edge='start'
        className={classes.menuButton}>
          <MenuIcon />
      </IconButton>
      <Typography variant='h6' noWrap>
        Playlix
      </Typography>
    </Toolbar>
  </AppBar>
}

const mapDispatchToProps = (dispatch) => ({
  handleDrawerToggle: () => dispatch(uiToggleSmallDrawerOpen())
});

export default connect(null, mapDispatchToProps)(AppAppBar);
