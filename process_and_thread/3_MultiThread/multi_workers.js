const { workerData, parentPort } = require("worker_threads");

async function worker() {
  let count = 0;
  for (let i = 0; i < 5_000_000_000 / workerData.thread_count; i++) {
    count++;
  }
  parentPort.postMessage(count);
}

worker();
