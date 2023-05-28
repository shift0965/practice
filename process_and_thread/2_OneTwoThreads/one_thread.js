const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

app.get("/non-blocking/", (req, res) => {
  res.status(200).send("This page is non-blocking");
});

function counter() {
  let count = 0;
  for (let i = 0; i < 5_000_000_000; i++) {
    count++;
  }
  return count;

  // return new Promise((resolve, reject) => {
  //   let counter = 0;
  //   for (let i = 0; i < 10_000_000_000; i++) {
  //     counter++;
  //   }
  //   resolve(counter);
  // });
}

app.get("/blocking", async (req, res) => {
  const count = counter();
  res.status(200).send(`result is ${count}`);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
