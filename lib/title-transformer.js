'use babel';

import path from 'path';

export default function transform(title, workingDirectory) {
  const date = new Date().toISOString().split('T')[0];
  const titleFileFormat = title.split(' ').join('-').toLowerCase();
  const dirName = path.join(workingDirectory, `${date}-${titleFileFormat}`);
  return {
    title,
    dirName,
    fileName: path.join(dirName, 'index.md'),
    date: new Date().toISOString(),
    path: `/${titleFileFormat}/`
  }
}
