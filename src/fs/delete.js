import fsPromises from 'fs/promises';
import path from 'path';

const __dirname = import.meta.dirname;

const targetFilePath = path.join(__dirname, 'files', 'fileToRemove.txt');

const remove = async () => {
  const isTargetFileExists = await isExists(targetFilePath);

  if (!isTargetFileExists) {
    throw new Error('FS operation failed');
  }

  return fsPromises.unlink(targetFilePath);
};

await remove();

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
