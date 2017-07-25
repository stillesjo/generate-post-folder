'use babel';

import fs from 'fs';
import path from 'path';
import _ from 'lodash';


export default function createPost(data) {
  return validateNonExistense(data.dirName)
      .then(() => mkdir(data.dirName))
      .then(() => writeToFile(data.fileName, data));
}

function validateNonExistense(path) {
  return new Promise((resolve, reject) => fs.stat(path, (err, doesExist) => {
    if (doesExist) {
      reject('Post already exists');
    } else {
      resolve()
    }
  }));
}

// Promisified mkdir
function mkdir(path) {
  return new Promise((resolve, reject) => fs.mkdir(path, 0777, err => err && reject(err) || resolve()));
}

function writeToFile(filePath, data) {
  return new Promise(resolve => {
    const ws = fs.createWriteStream(filePath);
    ws.on('finish', () => resolve());
    ws.write('---\n');
    ws.write(_(data)
    .pick(['title', 'date', 'path'])
    .map((value, key) => `${key}: ${value}\n`)
    .join(''))
    ws.end('---\n');
  })
}
