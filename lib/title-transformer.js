'use babel';

export default function transform(title) {
  const date = new Date().toISOString().split('T')[0];
  const titleFileFormat = title.split(' ').join('-').toLowerCase();
  const dirName = `${date}-${titleFileFormat}`;
  return {
    title,
    dirName,
    fileName: `${dirName}/index.md`,
    date: new Date().toISOString(),
    path: `/${titleFileFormat}/`
  }
}
