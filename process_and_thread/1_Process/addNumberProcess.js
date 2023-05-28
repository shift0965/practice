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
        console.log("Successfully Written");
      });
    });
  } catch (err) {
    console.log(err);
  }
}

async function main() {
  const number = await getNumber();
  const newNumber = number + 1;
  console.log(newNumber);
  await writeNumber(newNumber);
}

main();

//& at end the allows the Node program to run in the background
//The number after [] is a process ID that the operating system assigned to it
//node addNumberProcess.js & node addNumberProcess.js & node addNumberProcess.js &
