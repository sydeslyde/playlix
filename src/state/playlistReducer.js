function singlePlaylistReducer(state = { loading: null }, action) {
  switch (action.type) {
    case 'SET_PLAYLIST_LOADING':
      return { ...state, loading: action.loading };
    case 'RECEIVE_PLAYLIST_TRACKS':
      return { ...state, tracks: { ...state.tracks, ...action.tracks }};
    default:
      return state;
  }
}

export default function playlistsReducer (state = {}, action) {
  const playlistId = action.playlistId;
  switch (action.type) {
    case 'RECEIVE_PLAYLIST_DATA':
      return {
        ...state,
        [playlistId]: { ...action.data, loading: null }
      };
    case 'SET_PLAYLIST_LOADING':
    case 'RECEIVE_PLAYLIST_TRACKS':
      return {
        ...state,
        [playlistId]: singlePlaylistReducer(state[playlistId], action)
      };
    default:
      return state;
  }
};
