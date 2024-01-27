import fsPromises from 'fs/promises';
import fs from 'fs';
import path from 'path';
import streamPromises from 'stream/promises';
import { createGunzip } from 'zlib';

const __dirname = import.meta.dirname;

const sourceFilePath = path.join(__dirname, 'files', 'archive.gz');
const destFilePath = path.join(__dirname, 'files', 'fileToCompress.txt');

const decompress = async () => {
  const isSourceFileExists = await isExists(sourceFilePath);
  const isDestFileExists = await isExists(destFilePath);

  if (!isSourceFileExists || isDestFileExists) {
    throw new Error('Operation failed');
  }

  const readableStream = fs.createReadStream(sourceFilePath);
  const writableStream = fs.createWriteStream(destFilePath);
  const gunzip = createGunzip();

  return streamPromises.pipeline(readableStream, gunzip, writableStream);
};

await decompress();

/**
 * Checks if specified path is exists.
 *
 * @param {string} path Absolute path to be checked.
 * @returns {boolean} `true` if path exists, otherwise `false`.
 */
async function isExists(path) {
  try {
    await fsPromises.access(path);
    return true;
  } catch (error) {
    if (error.code === 'ENOENT') {
      return false;
    }
    throw error;
  }
}
