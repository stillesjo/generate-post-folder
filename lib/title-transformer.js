'use babel';

export default function transform(title) {
  const date = new Date().toISOString().split('T')[0];
  const titleFileFormat = title.split(' ').join('-').toLowerCase();
  return {
    title,
    fileName: `${date}-${titleFileFormat}.md`,
    date: new Date().toISOString(),
    path: `/${titleFileFormat}/`
  }
}
