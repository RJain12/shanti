onst express = require('express');
const { exec } = require('child_process');

const app = express();
const port = 3000;

app.get('*', (req, res) => {
  const prompt1 = req.query.prompt1;
  const prompt2 = req.query.prompt2;


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
