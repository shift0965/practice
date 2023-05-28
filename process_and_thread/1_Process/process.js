const process_name = process.argv.slice(2)[0];

count = 0;
while (true) {
  count++;
  if (count == 2000) {
    console.log(`${process_name}: ${count}`);
  }
}


//node process.js A &

