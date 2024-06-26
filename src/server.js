const express = require("express");

const cors = require("cors");

const bodyParser = require("body-parser");


const { OpenAIApi } = require("openai");

const openai = new OpenAIApi({
  apiKey: "sk-kkXysb7jekffgYlneEOBKTpWRpGJJtNr",
});
// Setup server
const app = express();
app.use(bodyParser.json());
app.use(cors());
// endpoint for ChatGPT
app.post("/chat", async (req, res) => {
  const { prompt } = req.body;
  const completion = await openai.createCompletion({
    model: "GPT-3.5 Turbo",
    max_tokens: 512,
    temperature: 0,
    prompt: prompt,
  });
  res.send(completion.data.choices[0].text);
});
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
//run node server.js