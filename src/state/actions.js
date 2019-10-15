import { spotifyClient } from './spotify';

const exampleTracks = (id) => [
  {
    title: 'Paint It, Black on ' + id,
    artist: 'The Rolling Stones',
    album: 'Aftermath',
    duration: (3*60+22)*1000,
    url: 'https://open.spotify.com/track/63T7DJ1AFDD6Bn8VzG6JE8',
    sampleUrl: 'https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_700KB.mp3',
    coverUrl: 'https://i.scdn.co/image/143b31f3a8eb8e22f3c1239c17f55c6501bebadb'
  },
  {
    title: 'I Can\'t Go for That (No Can Do) - Remastered',
    artist: 'Daryl Hall & John Oates',
    album: 'The Essential Daryl Hall & John Oates',
    duration: (5*60+7)*1000,
    url: 'https://open.spotify.com/track/6r41t4oJtwcBHp4h1ZDMlj',
    sampleUrl: 'https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_700KB.mp3',
    coverUrl: 'https://i.scdn.co/image/4a21ffcd178ae84262d977d045529d1fec8e8c65'
  },
  {
    title: 'Louder (Put Your Hands Up) - Original Radio Edit',
    artist: 'Chris Willis',
    album: 'Louder (Put Your Hands Up)',
    duration: (3*60+30)*1000,
    url: 'https://open.spotify.com/track/2RqRNSrRGu57opMBj5pPAl',
    sampleUrl: 'https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_700KB.mp3',
    coverUrl: 'https://i.scdn.co/image/f70bd43f8e40611f266ffbade0e2c424d0bc8654'
  },
  {
    title: 'Loud Pipes',
    artist: 'Ratatat',
    album: 'Classics',
    duration: (3*60+46)*1000,
    url: 'https://open.spotify.com/track/5ZrrXIYTvjXPKVQMjqaumR',
    sampleUrl: 'https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_700KB.mp3',
    coverUrl: 'https://i.scdn.co/image/48bb717f8cbb774cc7f87dd0d2e1a9d160dc2c75'
  },
  {
    title: 'Seventeen Years',
    artist: 'Ratatat',
    album: 'Ratatat',
    duration: (4*60+26)*1000,
    url: 'https://open.spotify.com/track/1LytkZ67Tquo5A5TyzqVcZ',
    sampleUrl: 'https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_700KB.mp3',
    //coverUrl: 'https://i.scdn.co/image/143b31f3a8eb8e22f3c1239c17f55c6501bebadb'
  }
];
const exampleList = (id, name) => ({
  id,
  name,
  loading: null,
  tracks: null
});

var playlistExamples = [
  exampleList('abc', 'A+B+C'),
  exampleList('def', 'def def def'),
  exampleList('ghi', 'G-H-I'),
  exampleList('jkl', 'J und K und L')
];





const receivePlaylistTracks = (playlistId, tracks) => ({
  type: 'RECEIVE_PLAYLIST_TRACKS',
  playlistId,
  tracks
});

export const setPlaylistLoading = (playlistId, loading) => ({
  type: 'SET_PLAYLIST_LOADING',
  playlistId,
  loading
});

const receivePlaylistInfos = (playlistId, data) => ({
  type: 'RECEIVE_PLAYLIST_DATA',
  playlistId,
  data
});

export const fetchPlaylistTracks = (playlistId) => dispatch => {
  // TODO check if playlist is already loaded?

  dispatch(setPlaylistLoading(playlistId, true));

  spotifyClient.getPlaylistTracks(playlistId)
    .then(playlistTracksResponse => dispatch(receivePlaylistTracksResponse(playlistId, playlistTracksResponse)))
    .catch(err => setTimeout(() => dispatch(receivePlaylistTracksResponse(playlistId, { items: [ ...exampleTracks(playlistId).map(t => ({track: t}))]})), 800));// TODO for testing xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    /*.catch(err => {
      console.error('Error while fetching Playlist Tracks for ' + playlistId, err);
      dispatch(setPlaylistLoading(playlistId, false));
    });*/
};

const receivePlaylistTracksResponse = (playlistId, playlistTracksResponse) => dispatch => {
  dispatch(receivePlaylistTracks(playlistId, playlistTracksResponse.items.map(playlistTrack => playlistTrack.track)));

  if (playlistTracksResponse.next) {
    spotifyClient.getGeneric(playlistTracksResponse.next)
      .then(nextPlaylistTracksResponse => dispatch(receivePlaylistTracksResponse(nextPlaylistTracksResponse)))
      .catch(err => {
        console.error('Error while fetching more Playlist Tracks for ' + playlistId, err);
        dispatch(setPlaylistLoading(playlistId, false));
      });
  } else {
    dispatch(setPlaylistLoading(playlistId, false));
  }
};

export const fetchUserPlaylistInfos = () => dispatch => {
  console.log('start loading playlists infos');
  spotifyClient.getUserPlaylists()
    .then(playlistResponse => dispatch(receivePlaylistInfosResponse(playlistResponse)))
    .catch(err => setTimeout(() => dispatch(receivePlaylistInfosResponse({ items: playlistExamples })), 800)) // TODO for testing xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    //.catch(err => console.error('Error while fetching Playlist Infos for user', err));
};

const receivePlaylistInfosResponse = (playlistResponse) => dispatch => {
  playlistResponse.items.forEach(playlist => dispatch(receivePlaylistInfos(playlist.id, playlist)));

  if (playlistResponse.next != null) {
    spotifyClient.getGeneric(playlistResponse.next)
      .then(nextPlaylistResponse => dispatch(receivePlaylistInfosResponse(nextPlaylistResponse)))
      .catch(err => console.error('Error while fetching more Playlist Infos for user', err));
  } else console.log('playlist infos loading ended');
};

export const setAuth = (auth) => {
  // set access token to spotify instance...
  spotifyClient.setAccessToken(auth.access_token)

  return ({
    type: 'SET_AUTH',
    auth
  });
};

export const uiToggleSmallDrawerOpen = () => {
  return ({
    type: 'TOGGLE_SMALLDRAWER_OPEN'
  });
};

export const uiSetSmallDrawerOpen = (open) => {
  return ({
    type: 'SET_SMALLDRAWER_OPEN',
    open: !!open
  });
};
