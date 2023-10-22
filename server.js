
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

app.get('/gpt', async (req, res) => {
  const prompt = req.query.prompt;

  const openai_api_key = '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';

  const url = 'https://api.openai.com/v1/chat/completions';
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${openai_api_key}`,
  };

  const data = {
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: 'You are an automated script.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
  };

  const config = {
    headers,
  };

  try {
    axios
      .post(url, data, config)
      .then((response) => {
        res.send(response.data.choices[0].message.content)
      })
      .catch((error) => {
        console.log(error.message); // Display the error message
        res.send(0)
      });
  } catch (error) {
    console.log(error.message);
    res.send(0)
  }
});

app.get('/replicate', async (req, res) => {
  const prompt = req.query.prompt;
  console.log(prompt)
  const output = await replicate.run(
    "stability-ai/stable-diffusion:f178fa7a1ae43a9a9af01b833b9d2ecf97b1bcb0acfd2dc5dd04895e042863f1",
    {
      input: {
        prompt: prompt,
        height: 512,
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
