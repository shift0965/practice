const { workerData, parentPort } = require("worker_threads");
const fs = require("fs");

async function getNumber() {
  try {
    const text = await new Promise((resolve, reject) => {
      fs.readFile("number.txt", (err, data) => {
        if (err) reject(err);
        resolve(data.toString());
      });
    });
    return parseInt(text);
  } catch (err) {
    console.log(err);
  }
}

async function writeNumber(data) {
  try {
    await new Promise((resolve, reject) => {
      fs.writeFile("number.txt", data.toString(), (err) => {
        if (err) reject(err);
        resolve("successfully written");
      });
    });
  } catch (err) {
    console.log(err);
  }
}

async function worker() {
  let count = await getNumber();
  for (let i = 0; i < 1_000_000_000 / workerData.thread_count; i++) {
    count++;
  }
  await writeNumber(count);
  parentPort.postMessage("finished");
}

worker();
