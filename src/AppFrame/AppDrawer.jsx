import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PlaylistIcon from '@material-ui/icons/QueueMusic';
import { Link as RouterLink, useRouteMatch } from 'react-router-dom';

import { connect } from 'react-redux';
import { uiToggleSmallDrawerOpen, uiSetSmallDrawerOpen } from '../state/actions';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth
  },
  toolbar: {
    ...theme.mixins.toolbar
  }
}));

function AppDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const match = useRouteMatch({path: "/playlist/:playlistId"});
  const currentPlaylistId = match != null ? match.params != null ? match.params.playlistId : null : null;

  const drawerOpen = props.uiDrawerOpen;
  const closeDrawer = props.closeDrawer;
  const handleDrawerToggle = props.handleDrawerToggle;
  const hasPlaylists = props.hasPlaylists;
  const playlists = props.playlists;
  const container = props.container;

  const drawerItems = (<div>
    <div className={classes.toolbar} />
    <Divider />
    <List>
      {hasPlaylists ?
        playlists.map(({ name, id }, index) => (
          <ListItem component={RouterLink} to={`/playlist/${id}`} onClick={closeDrawer} selected={currentPlaylistId === id} button key={id}>
            <ListItemIcon>
              <PlaylistIcon />
            </ListItemIcon>
            <ListItemText primary={name} />
          </ListItem>
        ))
      : 
        <ListItem>
          <ListItemText primary='No Playlists found!' />
        </ListItem>
      }
    </List>
    </div>);

  return <nav className={classes.drawer}>
    <Hidden smUp implementation='css'>
      <Drawer
        container={container}
        variant='temporary'
        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
        open={drawerOpen}
        onClose={handleDrawerToggle}
        classes={{
          paper: classes.drawerPaper,
        }}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        {drawerItems}
      </Drawer>
    </Hidden>
    <Hidden xsDown implementation='css'>
      <Drawer
        classes={{
          paper: classes.drawerPaper,
        }}
        variant='permanent'
        open
      >
        {drawerItems}
      </Drawer>
    </Hidden>
  </nav>;
}

const mapStateToProps = (state) => ({
  uiDrawerOpen: state.ui.smallDrawerOpen,
  hasPlaylists: Object.keys(state.playlists).length,
  playlists: Object.values(state.playlists)
});

const mapDispatchToProps = (dispatch) => ({
  handleDrawerToggle: () => dispatch(uiToggleSmallDrawerOpen()),
  closeDrawer: () => dispatch(uiSetSmallDrawerOpen(false))
});

export default connect(mapStateToProps, mapDispatchToProps)(AppDrawer);
