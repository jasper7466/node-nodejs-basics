import fsPromises from 'fs/promises';
import path from 'path';

const __dirname = import.meta.dirname;

const srcDirPath = path.join(__dirname, 'files');
const destDirPath = path.join(__dirname, 'files-copy');

const copy = async () => {
  const isSrcDirExists = await isExists(srcDirPath);
  const isDestDirExists = await isExists(destDirPath);

  if (!isSrcDirExists || isDestDirExists) {
    throw new Error('FS operation failed');
  }

  return copyFiles(srcDirPath, destDirPath);
};

await copy();

/**
 * Makes deep copy of directory, including nested directories.
 *
 * @param {string} srcRoot Absolute path to the source directory.
 * @param {string} destRoot Absolute path to the destination directory.
 */
async function copyFiles(srcRoot, destRoot) {
  try {
    const stack = [''];
    const promises = [];

    while (stack.length) {
      const relativePath = stack.pop();
      const sourceDir = path.join(srcRoot, relativePath);
      const destDir = path.join(destRoot, relativePath);

      await fsPromises.mkdir(destDir);

      const files = await fsPromises.readdir(sourceDir, {
        withFileTypes: true,
      });

      for (const file of files) {
        const srcFilePath = path.join(sourceDir, file.name);
        const destFilePath = path.join(destDir, file.name);

        if (file.isDirectory()) {
          stack.push(path.relative(srcRoot, srcFilePath));
        } else {
          promises.push(fsPromises.copyFile(srcFilePath, destFilePath));
        }
      }
    }

    return Promise.all(promises);
  } catch (error) {
    console.log('copyFiles: Something went wrong');
    console.log(error);
  }
}

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
