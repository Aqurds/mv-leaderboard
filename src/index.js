import _ from "lodash";
import "./style.css";

const baseUrl = "https://us-central1-js-capstone-backend.cloudfunctions.net/api";
const gameId = "dxIcv0VBs2ScW6iHCjNM";

// Get all scores
const getScroes = async () => {
    const scoreResponse = await fetch(`${baseUrl}/games/${gameId}/scores/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const scoreData = await scoreResponse.json();
    return scoreData;
}

// Add score for user
const postScroes = async (user, score) => {
    const data = {
        "user": user,
        "score": score
    }
    const scoreResponse = await fetch(`${baseUrl}/games/${gameId}/scores/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const scoreData = await scoreResponse.json();
    alert(scoreData.result)
}

// Render score in Html
const renderScore = (scoreData) => {
    const tableBody = document.getElementById('score-data');
    let trElem = '';
    scoreData.result.forEach(element => {
        console.log(element);
        trElem += `<tr><td>${element.user}</td><td>${element.score}</td></tr>`
    });
    tableBody.innerHTML = trElem;
};

// Refresh score
const refresh = document.getElementById('refresh');
refresh.addEventListener('click', async () => {
    const scoreData = await getScroes();
    renderScore(scoreData);
});


// Submit score
const submitButton = document.getElementById('submit');
submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    const userName = document.getElementById('name').value;
    const userScore = document.getElementById('score').value;
    console.log(userName, userScore);
    postScroes(userName, userScore)
})
