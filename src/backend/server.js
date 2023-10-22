const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/runMatlab', (req, res) => {
  const { prompt1, prompt2 } = req.body;

  const matlabCommand = `matlab -r "gpt('${prompt1}', '${prompt2}')"`;

  exec(matlabCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error running MATLAB command: ${error}`);
      res.status(500).json({ error: 'MATLAB command failed' });
    } else {
      console.log(`MATLAB command output: ${stdout}`);
      res.json({ output: stdout });
    }
  });
});

app.listen(port, () => {
  console.log(`Express server is running on port ${port}`);
});
