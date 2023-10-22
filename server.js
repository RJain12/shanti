const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json')

const Polly = new AWS.Polly({
    region: 'us-east-1'
})

const Fs = require('fs');

app.use(express.static('src'));

app.get('/viewer', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'site', 'viewer.html'));
});

app.get('/viewer2', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'site', 'viewer2.html'));
});

const axios = require('axios');

const api_key = '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';

app.get('/gpt', async (req, res) => {
  const prompt = req.query.prompt;

  const url = 'https://api.openai.com/v1/chat/completions';
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${api_key}`,
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
  const OpenAI = require('openai');

  const openai = new OpenAI({
    apiKey: api_key,
  })
  const prompt = req.query.prompt;

  const response = await openai.images.generate({
    prompt: prompt,
    size: "1024x1024",
  });
  const image_url = response.data[0].url;
  res.send(image_url);
});

app.get('/tts', async (req, res) => {
  const prompt = req.query.prompt;
  const i = req.query.val;

  const input = { // SynthesizeSpeechInput
    Engine: "neural",
    LanguageCode: "en-US",
    OutputFormat: "mp3",
    Text: prompt,
    VoiceId: "Stephen", // required
  };

  Polly.synthesizeSpeech(input, (err,data) => {
    if(err) {
      console.log('Error', err);
      return;
    }

    if (data.AudioStream) {
      Fs.writeFile(`src/site/speech_${i}.mp3`, data.AudioStream, (err) => {
        res.send('speech');
      })
    }
  })
});

// app.get('/replicate', async (req, res) => {
//   const prompt = req.query.prompt;
//   console.log(prompt)
//   const output = await replicate.run(
//     "stability-ai/stable-diffusion:f178fa7a1ae43a9a9af01b833b9d2ecf97b1bcb0acfd2dc5dd04895e042863f1",
//     {
//       input: {
//         prompt: prompt,
//         height: 512,
//         width: 1024
//       }
//     }
//   );
//   res.send(output[0]);
// });

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'site', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
