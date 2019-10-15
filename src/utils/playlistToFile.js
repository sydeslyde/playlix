import papaparse from 'papaparse';
import localStringDownload from './download';

export default function playlistToFile(playlist, format='csv') {
  const playlistName = playlist.name;
  const tracks = Object.values(playlist.tracks);

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
