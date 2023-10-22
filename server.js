import * as Generation from "./generation/generation_pb";
import { GenerationServiceClient } from "./generation/generation_pb_service";
import { grpc as GRPCWeb } from "@improbable-eng/grpc-web";
import { NodeHttpTransport } from "@improbable-eng/grpc-web-node-http-transport";

// Authenticate using your API key, don't commit your key to a public repository! lol
const metadata = new GRPCWeb.Metadata();
metadata.set("Authorization", "Bearer " + sk-Zk2qv1IBLQ9BOLPp30l6gEJjHhODj0iKKUuAUVJvH2XyxQlz);

// Create a generation client to use with all future requests
const client = new GenerationServiceClient("https://grpc.stability.ai", {});

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
