const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;
const tools = require("./tools");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/balderdash/:offset", (req, res) => {
  const offset = req.params.offset || response.data.metadata.offset;
  tools
    .wordList(offset)
    .then(response => {
      const wordList =
        response && response.data && response.data.results
          ? response.data.results
          : [];
      res.send({
        result: {
          wordList: wordList,
          offset: offset
        }
      });
    })
    .catch(error => console.log(error));
});

app.get("/definition/:word", (req, res) => {
  const word = req.params.word;
  tools
    .wordDefinition(word)
    .then(response => {
      const result =
        response && response.data && response.data.results
          ? response.data.results
          : null;
      const definition = tools.getObject(result, "definitions")
        ? tools.getObject(result, "definitions").definitions[0]
        : "";
      const lexicalCategory = tools.getObject(result, "lexicalCategory")
        ? tools.getObject(result, "lexicalCategory").lexicalCategory
        : "";
      res.send({
        result: {
          wordDefinition: definition,
          word: word,
          lexicalCategory: lexicalCategory
        }
      });
    })
    .catch(error => console.log(error));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
