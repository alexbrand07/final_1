// const worker = require('node:worker_threads');
const worker = require("worker")

const { Worker, isMainThread, parentPort } = require('worker_threads');
const fs = require('fs');
const path = require('path');

if (isMainThread) {
  const word = process.argv[2];
  const directory = process.argv[3];

  // Read all the text files in the directory
  fs.readdir(directory, (err, files) => {
    if (err) throw err;

    const textFiles = files.filter(file => path.extname(file) === '.txt');
    let globalCount = 0;
    const workerCount = textFiles.length;
    let workerFinishedCount = 0;

    // Create a worker for each text file
    for (const file of textFiles) {
      const worker = new Worker(__filename, { workerData: { word, file, directory } });
      worker.on('message', count => {
        globalCount += count;
        workerFinishedCount++;

        // Once all workers have finished, display the global result
        if (workerFinishedCount === workerCount) {
          console.log(`The word "${word}" appears ${globalCount} times in the files`);
        }
      });
    }
  });
} else {
  // Worker thread
  const { word, file, directory } = workerData;
  fs.readFile(path.join(directory, file), 'utf8', (err, contents) => {
    if (err) throw err;
    const count = contents.split(word).length - 1;
    parentPort.postMessage(count);
  });
}