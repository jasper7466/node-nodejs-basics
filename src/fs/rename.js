import fsPromises from 'fs/promises';
import path from 'path';

const __dirname = import.meta.dirname;

const properFileName = 'properFilename.md';
const targetFilePath = path.join(__dirname, 'files', 'wrongFilename.txt');
const renamedFilePath = path.join(path.dirname(targetFilePath), properFileName);

const rename = async () => {
  const isTargetFileExists = await isExists(targetFilePath);
  const isRenamedFileExists = await isExists(renamedFilePath);

  if (!isTargetFileExists || isRenamedFileExists) {
    throw new Error('FS operation failed');
  }

  try {
    const targetFileDir = path.dirname(targetFilePath);
    const newFilePath = path.join(targetFileDir, properFileName);

    return fsPromises.rename(targetFilePath, newFilePath);
  } catch (error) {
    console.log('rename: Something went wrong');
    console.log(error);
  }
};

await rename();

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
