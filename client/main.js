const userInput = document.querySelector(".user-question");
const formBtn = document.querySelector(".form-submit-btn");
const answerCard = document.querySelector(".answer-card");
const num8Display = document.querySelector(".number-eight");
const eightBall = document.querySelector(".eightball");
const answerResponseContainer = document.querySelector(
  ".answer-response-container"
);

const baseURL = "https://mpayne-foundation-capstone.herokuapp.com/api/fortune";
const answerRespURL =
  "https://mpayne-foundation-capstone.herokuapp.com/api/answerResponses";

let eightBallAnswer = "";
userInput.value = "";

// requests for answer/responses
const answerResponseCallBack = ({ data: answerResponses }) => {
  displayAnswerResponses(answerResponses);
};

// get a random response from the server
const getFortune = () => {
  axios
    .get(baseURL)
    .then((response) => {
      let data = response.data;
      eightBallAnswer = data.answer.replace("<br/>", " ");
      console.log(eightBallAnswer);

      let answerText = document.createElement("p");
      answerCard.innerHTML = "";
      answerText.innerHTML = data.answer;
      eightBall.classList.add("shake");

      setTimeout(() => {
        num8Display.classList.remove("num-appear");
        num8Display.classList.add("num-vanish");
      }, 2000);

      setTimeout(() => {
        answerCard.style.display = "block";

        answerCard.append(answerText);
        answerCard.classList.add("appear");
      }, 3500);

      setTimeout(() => {
        answerCard.classList.remove("appear");
        answerCard.style.display = "none";
        num8Display.classList.remove("num-vanish");
        num8Display.classList.add("num-appear");
        eightBall.classList.remove("shake");
      }, 8500);
    })
    .catch((err) => console.log(error));
};

//post the user question and the matching eightball response
const createResponse = (body) => {
  axios.post(answerRespURL, body).then(answerResponseCallBack);
};

// delete rest method that clears all previous answer/responses from the server list
const deleteAllSavedResponses = () => {
  axios.delete(answerRespURL).then(answerResponseCallBack);
};

// submit handler function for the user question submission form
const submitHandler = (event) => {
  event.preventDefault();

  disablitySubmitBtn();

  getFortune();

  setTimeout(() => {
    let bodyObj = {
      question: userInput.value,
      answer: eightBallAnswer,
    };

    console.log(userInput.value);
    createResponse(bodyObj);

    //reset form values to be blank
    userInput.value = "";
    eightBallAnswer.value = "";
    disablitySubmitBtn();
  }, 8500);
};

// Code for creating a table row for displaying question/answer pairs
const createTableRow = (answerResponse) => {
  let rowIndex = 0;
  const tableRow = answerResponseContainer.insertRow(rowIndex);
  rowIndex++;

  tableRow.innerHTML = `
  <td>${answerResponse.question}</td>
  <td>${answerResponse.answer}</td>
  `;
};

//toggle form submit button disability and prevents the user from submitting a new question before the animation has ended
const disablitySubmitBtn = () => {
  if (!formBtn.disabled) {
    formBtn.classList.add("disabled-btn");
    formBtn.disabled = true;
  } else {
    formBtn.classList.remove("disabled-btn");
    formBtn.disabled = false;
  }
};

//function for displaying answer/response pairs
const displayAnswerResponses = (arr) => {
  answerResponseContainer.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    createTableRow(arr[i]);
  }
};

// clears the server array that holds the question/answer objects once the browser is refreshed
window.addEventListener("load", () => deleteAllSavedResponses());

formBtn.addEventListener("click", submitHandler);
