import fsPromises from 'fs/promises';
import fs from 'fs';
import path from 'path';
import streamPromises from 'stream/promises';
import { stdout } from 'process';

const __dirname = import.meta.dirname;

const targetFilePath = path.join(__dirname, 'files', 'fileToRead.txt');

const read = async () => {
  const isTargetFileExists = await isExists(targetFilePath);

  if (!isTargetFileExists) {
    throw new Error('FS operation failed');
  }

  const readStream = fs.createReadStream(targetFilePath);

  return await streamPromises.pipeline(readStream, stdout);
};

await read();

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
