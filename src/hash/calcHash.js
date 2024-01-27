import { createHash } from 'crypto';
import fsPromises from 'fs/promises';
import fs from 'fs';
import path from 'path';
import streamPromises from 'stream/promises';
import { stdout } from 'process';

const __dirname = import.meta.dirname;

const targetFilePath = path.join(
  __dirname,
  'files',
  'fileToCalculateHashFor.txt',
);

const calculateHash = async () => {
  const isTargetFileExists = await isExists(targetFilePath);

  if (!isTargetFileExists) {
    throw new Error('Target file does not exist');
  }

  const readableStream = fs.createReadStream(targetFilePath);
  const hash = createHash('sha256')
    .setEncoding('hex')
    .on('end', () => console.log());

  return streamPromises.pipeline(readableStream, hash, stdout);
};

await calculateHash();

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
