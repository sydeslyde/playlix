export default function downloadStringFile(content, filename) {
  var a = document.createElement('a');
  a.setAttribute(
    'href',
    'data:text/plain;charset:UTF-8,' + encodeURIComponent(content)
  );
  a.setAttribute('download', filename);
  document.body.appendChild(a);
  a.click();
  a.remove();
}
  