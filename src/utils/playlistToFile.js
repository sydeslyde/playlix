import papaparse from 'papaparse';
import localStringDownload from './download';
import durationFormatter from './durationFormatter';

export default function playlistToFile(playlist, format='csv') {
  const playlistName = playlist.name;
  const tracks = Object.values(playlist.tracks)
    .map(t => ({
      id: t.id,
      title: t.name,
      artist: t.artists.map(a => a.name).join(', '),
      album: t.album.name,
      duration: durationFormatter(t.duration_ms),
      url: t.external_urls.spotify
    }));

  if (format === 'json') {
    const jsonContent = JSON.stringify(tracks, null, 2);
    localStringDownload(jsonContent, playlistName + '.json');
  } else if (format === 'csv') {
    const csvContent = papaparse.unparse(tracks)
    localStringDownload(csvContent, playlistName + '.csv');
  } else if (format === 'tsv') {
    const tsvContent = papaparse.unparse(tracks, { delimiter: '\t' });
    localStringDownload(tsvContent, playlistName + '.tsv');
  } else {
    console.error(`"${format}" is not a supported export file format`);
  }
};
