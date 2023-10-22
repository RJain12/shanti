const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;


const Replicate = require("replicate");

const replicate = new Replicate({
  auth: 'r8_c9Zyab1TtF8l60uN04WymVaW79LiKgh3MXx0L',
});

app.get('/src/site/stability.js', (req, res) => {
  res.type('application/javascript');
  res.sendFile(path.join(__dirname, 'src', 'site', 'stability.js'));
});

app.get('/viewer', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'site', 'viewer.html'));
});

app.get('/viewer2', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'site', 'viewer2.html'));
});

const axios = require('axios');

app.get('/replicate', async (req, res) => {
  const prompt = req.query.prompt;
  console.log(prompt)
  const output = await replicate.run(
    "stability-ai/stable-diffusion:f178fa7a1ae43a9a9af01b833b9d2ecf97b1bcb0acfd2dc5dd04895e042863f1",
    {
      input: {
        prompt: prompt,
        height: 768,
        width: 1024
      }
    }
  );
  res.send(output[0]);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'site', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
