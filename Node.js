const express = require("express");
const { exec } = require("child_process");
const fs = require("fs");
const app = express();
const PORT = 4000;

app.get("/tts", (req, res) => {
  const text = req.query.text || "Hello";
  const file = `temp.wav`;

  exec(`espeak "${text}" --stdout > ${file}`, (err) => {
    if (err) {
      return res.status(500).send("TTS failed");
    }
    res.sendFile(__dirname + "/" + file, () => {
      fs.unlinkSync(file); // delete after sending
    });
  });
});

app.listen(2404, () => {
  console.log(`eSpeak TTS server running at http://localhost:${2404}`);
});
