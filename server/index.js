require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const ctrl = require("./controllers");

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.static("client"));

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

app.get(`/api/fortune`, ctrl.getRandomFortune);
app.get(`/api/answerResponses`, ctrl.getAnswerResponses);
app.post(`/api/answerResponses`, ctrl.createAnswerResp);
app.delete(`/api/answerResponses`, ctrl.deleteAnswerRespArr);

const port = process.env.PORT || process.env.SERVER_PORT;
// const port = 5432;
app.listen(port, () => console.log(`Server running on ${port}`));
