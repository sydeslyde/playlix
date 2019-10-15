export default function durationFormatter(ms) {
  var h = Math.floor(ms / (1000 * 60 * 60));
  ms = ms - h * (1000 * 60 * 60);
  const m = Math.floor(ms / (1000 * 60));
  const m0 = m.toString().padStart(2, '0');
  ms = ms - m * (1000 * 60);
  const s = Math.round(ms / 1000);
  const s0 = s.toString().padStart(2, '0');
  if (h > 0) {
    return `${h}:${m0}:${s0}`;
  } else {
    return `${m}:${s0}`;
  }
}
