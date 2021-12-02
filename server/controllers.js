let fortunes = require("../db.json");

let answerResponses = [];

module.exports = {
  // gets a randomized answer and send it to the client-side
  getRandomFortune: (req, res) => {
    // choose random fortune
    let randomIndex = Math.floor(Math.random() * fortunes.length);
    let randomFortune = fortunes[randomIndex];

    res.status(200).send(randomFortune);
  },

  // gets the answerResponses array of question/answer objects and send it to the client-side
  getAnswerResponses: (req, res) => {
    res.status(200).send(answerResponses);
  },

  // creates a question/answer object, adds it to the answerResponses array, and sends it to the client-side
  createAnswerResp: (req, res) => {
    let { question, answer } = req.body;

    let newAnswerResp = {
      question: question,
      answer: answer,
    };

    answerResponses.push(newAnswerResp);
    res.status(200).send(answerResponses);
  },

  // sets the answerResponses array to be an empty array
  deleteAnswerRespArr: (req, res) => {
    answerResponses = [];
    res.status(200).send(answerResponses);
  },
};
