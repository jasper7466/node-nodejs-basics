import fsPromises from 'fs/promises';
import path from 'path';

const __dirname = import.meta.dirname;

const targetDirPath = path.join(__dirname, 'files');

const list = async () => {
  const isTargetDirExists = await isExists(targetDirPath);

  if (!isTargetDirExists) {
    throw new Error('FS operation failed');
  }

  try {
    const files = await fsPromises.readdir(targetDirPath, {
      withFileTypes: true,
    });

    for (const file of files) {
      if (!file.isFile()) {
        continue;
      }

      console.log(file.name);
    }
  } catch (error) {
    console.error(`Something went wrong: ${error}`);
  }
};

await list();

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
