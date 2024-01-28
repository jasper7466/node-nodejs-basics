import { Worker } from 'worker_threads';
import * as wt from 'worker_threads';
import path from 'path';
import os from 'os';

const __dirname = import.meta.dirname;
const workerFilePath = path.join(__dirname, 'worker.js');

const performCalculations = async () => {
  const results = [];
  const promises = [];
  let value = 10;

  for (let id = 0; id < os.cpus().length; id += 1) {
    results.push({ status: null, data: null });

    const promise = new Promise((resolve) => {
      new Worker(workerFilePath, { workerData: value })
        .on('message', (message) => {
          results[id].status = 'resolved';
          results[id].data = message;
          resolve();
        })
        .on('error', () => {
          results[id].status = 'error';
          resolve();
        });
    });

    promises.push(promise);
    value += 1;
  }

  return Promise.all(promises).then(() => {
    console.log(results);
  });
};

await performCalculations();
