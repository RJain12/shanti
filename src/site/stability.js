

const Replicate = require("replicate");

const replicate = new Replicate({
  auth: "{INSERT TOKEN}",
});

const output = await replicate.run(
  "stability-ai/stable-diffusion:f178fa7a1ae43a9a9af01b833b9d2ecf97b1bcb0acfd2dc5dd04895e042863f1",
  {
    input: {
      prompt: "a photo of an astronaut riding a horse on mars"
    }
  }
);