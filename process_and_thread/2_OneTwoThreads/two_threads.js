const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

app.get("/non-blocking/", (req, res) => {
  res.status(200).send("This page is non-blocking");
});

const { Worker } = require("worker_threads");

app.get("/blocking", async (req, res) => {
  const worker = new Worker("./worker.js");

  worker.on("message", (data) => {
    res.status(200).send(`result is ${data}`);
  });
  worker.on("error", (err) => {
    res.status(404).send(`result is ${err}`);
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
