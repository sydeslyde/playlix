const rows = (id) => [
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

var playlistExamples = {
  'abc': {
    id: 'abc',
    name: 'A+B+C',
    loading: null,
    tracks: rows('abc')
  },
  'def': {
    id: 'def',
    name: 'def def def',
    loading: false,
    tracks: rows('def')
  },
  'ghi': {
    id: 'ghi',
    name: 'G-H-I',
    loading: false,
    tracks: rows('ghi')
  },
  'jkl': {
    id: 'jkl',
    name: 'J und K und L',
    loading: false,
    tracks: rows('jkl')
  }
}
//playlistExamples = {};

function singlePlaylistReducer(state = { loading: null }, action) {
  switch (action.type) {
    case 'SET_PLAYLIST_LOADING':
      return { ...state, loading: action.loading };
    case 'RECEIVE_PLAYLIST_TRACKS':
      return { ...state, tracks: [ ...state.tracks, action.tracks ]};
    default:
      return state;
  }
}

export default function playlistsReducer (state = playlistExamples, action) {
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
