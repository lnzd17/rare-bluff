const express = require("express");
const router = express.Router();
const tools = require("../tools");
const { db } = require('../models/index');
const WordItem = require('../models').WordItem;


router.get("/balderdash/:offset", (req, res) => {
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

router.get("/definition/:word", (req, res) => {
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

router.post("/word_item", (req, res) => {
  const {word, definition} = req.body;

  return(
    WordItem.create({
      word,
      definition
    })
    .then(word => res.status(201).send(word))
    .catch(error => res.status(400).send(error))
  );
})


//export file
module.exports = router;
