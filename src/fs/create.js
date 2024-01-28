import fsPromises from 'fs/promises';
import path from 'path';

const __dirname = import.meta.dirname;

const destPath = path.join(__dirname, 'files', 'fresh.txt');
const content = 'I am fresh and young';

const create = async () => {
  try {
    await fsPromises.writeFile(destPath, content, { flag: 'wx' });
  } catch (error) {
    if (error && error.code === 'EEXIST') {
      throw new Error('FS operation failed');
    }
    throw error;
  }
};

await create();
