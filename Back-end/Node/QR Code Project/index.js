/*
simple node qr generator, you get 2 prompts, first for the url
then for the name of the file for your qr code image, then enjoy your new qrcode!

*/

import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

inquirer
  .prompt([
    {
      name: "url",
      type: "input",
      message: "Enter the URL to encode:",
      validate: (val) => (val && val.trim() ? true : "URL cannot be empty"),
    },
    {
      name: "name",
      type: "input",
      message: "Enter a base filename (e.g., youtube):",
      validate: (val) =>
        val && val.trim() ? true : "Filename cannot be empty",
      filter: (val) => val.trim().toLowerCase().replace(/\s+/g, "-"),
    },
  ])
  .then(({ url, name }) => {
    const pngPath = `${name}-qr-img.png`;
    const txtPath = `${name}.txt`;

    // Generate QR PNG
    const qrPng = qr.image(url);
    const pngStream = fs.createWriteStream(pngPath);
    qrPng.pipe(pngStream);

    // Persist the original URL to a txt file
    fs.writeFile(txtPath, url, { encoding: "utf8" }, (err) => {
      if (err) console.error("Failed to write txt:", err);
    });

    pngStream.on("finish", () => {
      console.log(`QR code saved to ${pngPath}`);
      console.log(`URL saved to ${txtPath}`);
    });
    pngStream.on("error", (err) => {
      console.error("Failed to write PNG:", err);
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
