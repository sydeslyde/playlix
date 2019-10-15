import { combineReducers } from 'redux';
import playlistsReducer from './playlistReducer';

function authReducer(state = null, action) {
  switch(action.type) {
    case 'SET_AUTH':
      return action.auth;
    default:
      return state;
  }
}

function uiReducer(
  state = { smallDrawerOpen: false },
  action
) {
  switch(action.type) {
    case 'TOGGLE_SMALLDRAWER_OPEN':
      return { ...state, smallDrawerOpen: !state.smallDrawerOpen };
    case 'SET_SMALLDRAWER_OPEN':
      return { ...state, smallDrawerOpen: action.open };
    default:
      return state;
  }
}

export default combineReducers({
  auth: authReducer,
  ui: uiReducer,
  playlists: playlistsReducer
});
