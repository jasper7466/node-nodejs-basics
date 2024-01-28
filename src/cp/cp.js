import { fork } from 'child_process';
import path from 'path';

const __dirname = import.meta.dirname;
const childProcessFilePath = path.join(__dirname, 'files', 'script.js');

const spawnChildProcess = async (args) => {
  fork(childProcessFilePath, args);
};

spawnChildProcess(['someArgument1', 'someArgument2', 123, true]);
