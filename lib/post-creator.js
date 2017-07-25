'use babel';

import fs from 'fs';
import path from 'path';
import _ from 'lodash';


export default function createRepo(repo, data) {
  return Promise.resolve(getPaths(repo, data))
    .then(paths => exists(paths.dir)
      .then(e => !e && mkdir(paths.dir)
        .then(() => writeToFile(paths.file, data))))
    .catch(err => {
      console.log('Got error!');
      console.log(err);
    });
}

function getPaths(repo, {dirName, fileName}) {
  const dir = path.join(repo.repo.workingDirectory, dirName);
  return {
    dir,
    file: path.join(dir, 'index.md')
  }
}

// Promisified exists
function exists(path) {
  return new Promise(resolve => {
    fs.stat(path, (err, doesExist) => {
      console.log(doesExist);
      resolve(!!doesExist)
    });
  })
}

// Promisified mkdir
function mkdir(path) {
  return new Promise((resolve, reject) => {
    fs.mkdir(path, 0777, err => {
      console.log(err);
      if (err) {
        return reject(err)
      }
      return resolve()
    })
  })
}

function writeToFile(filePath, data) {
  const ws = fs.createWriteStream(filePath);
  ws.write('---\n');
  ws.write(_(data)
    .pick(['title', 'date', 'path'])
    .map((value, key) => `${key}: ${value}\n`)
    .join(''))
  ws.write('---\n');
}
