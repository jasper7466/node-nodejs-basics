import fs from 'fs';
import path from 'path';
import streamPromises from 'stream/promises';
import { stdin } from 'process';

const __dirname = import.meta.dirname;

const targetFilePath = path.join(__dirname, 'files', 'fileToWrite.txt');

const write = async () => {
  const writableStream = fs.createWriteStream(targetFilePath);

  return streamPromises.pipeline(stdin, writableStream);
};

await write();
