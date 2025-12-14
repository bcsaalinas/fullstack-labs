const fs = require("fs");

fs.writeFile("message.txt", "hello from node!", (err) => {
  if (err) throw new err();
  console.log("file saved!");
});

fs.readFile("./message.txt", "utf-8", (err, data) => {
  if (err) console.log(err);
  console.log(data);
});
