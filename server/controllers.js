let fortunes = require("../db.json");

let answerResponses = [];

module.exports = {
  getRandomFortune: (req, res) => {
    // choose random fortune
    let randomIndex = Math.floor(Math.random() * fortunes.length);
    let randomFortune = fortunes[randomIndex];

    res.status(200).send(randomFortune);
  },

  getAnswerResponses: (req, res) => {
    res.status(200).send(answerResponses);
  },

  createAnswerResp: (req, res) => {
    let { question, answer } = req.body;

    let newAnswerResp = {
      question: question,
      answer: answer,
    };

    answerResponses.push(newAnswerResp);
    res.status(200).send(answerResponses);
  },

  deleteAnswerRespArr: (req, res) => {
    answerResponses = [];
    res.status(200).send(answerResponses);
  },
};
