const urlParams = new URLSearchParams(window.location.search);
let listID = urlParams.get('list_id')


let mainContainer = document.getElementById('main-container')
let startButton = document.getElementById('start-button')



let wordsList = []
let wordNumber = 0
let correctNumber = 0


axios({
    method: 'get',
    url: '/list-words',
    params: {
        listID: listID
    }
}).then((resp) => {
    wordsList = JSON.parse(resp.data.data)
    //console.log('#A1', lists)
}).catch(err => {
    console.log('error in lists-list get', err)
})

const renderWord = () => {
    mainContainer.innerHTML = `
        <div class="card border-primary border-5" style="width: 50%; display: inline-flex; justify-content: center; height: 300px " id="flashcard">
          <div class="card-body" style="align-items: center; justify-content: center; display: grid" >
            <h1 class="card-title">${wordsList[wordNumber].word}</h1>
            <input type="text" class="form-control input-lg new_term border-1" id="answer-input">
            <button class="btn btn-primary border-1" id="send-answer">Отправить ответ</button>
          </div>
    </div>
    `
    let sendAnswerButton = document.getElementById('send-answer')
    let answerInput = document.getElementById('answer-input')

    let answer = ''
    answerInput.onchange = (e) => {
        answer = e.target.value
    }

    sendAnswerButton.onclick = () => {
        let isCorrect = answer.toLocaleLowerCase() === wordsList[wordNumber].translation.toLocaleLowerCase()
        axios({
              method: 'post',
              url: '/set-word-status',
              data: {
                    status: isCorrect ? 'learned':'not_learned',
                    word_id: wordsList[wordNumber].id
              }
            })
        if (isCorrect){
            renderCorrectAnswer()

            correctNumber++;
        }else{

            renderIncorrectAnswer()
        }
    }
}

const renderCorrectAnswer = () => {
    mainContainer.innerHTML = `
        <div class="card border-success border-5" style="width: 50%; display: inline-flex; justify-content: center; height: 300px " id="flashcard">
          <div class="card-body" style="align-items: center; justify-content: center; display: grid" >
            <h1 class="card-title" style="text-align: center">Верно!</h1>
            <div style="display: inline-flex; justify-content: center;  width:300px">
                <button class="btn btn-success border-1" style="width: 50%" id="next-word-button">Далее</button>
            </div>
            
          </div>
        </div>
    `
    let nextButton = document.getElementById('next-word-button')
    nextButton.onclick = () => {
        if (wordNumber + 1 < wordsList.length){
            wordNumber++;
            renderWord()
        }else{
            renderFinalCard()
        }
    }
}

const renderIncorrectAnswer = () => {
    mainContainer.innerHTML = `
        <div class="card border-danger border-5" style="width: 50%; display: inline-flex; justify-content: center; height: 300px " id="flashcard">
          <div class="card-body" style="align-items: center; justify-content: center; display: grid" >
            <h1 class="card-title" style="text-align: center">Не совсем:(</h1>
            <h2 style="text-align: center">Правильный ответ: ${wordsList[wordNumber].translation}</h2>
            <div style="display: inline-flex; justify-content: center;  ">
                <button class="btn btn-danger border-1" style="width: 50%" id="next-word-button">Далее</button>
            </div>
            
          </div>
        </div>
    `
    let nextButton = document.getElementById('next-word-button')
    nextButton.onclick = () => {
        if (wordNumber + 1 < wordsList.length){
            wordNumber++;
            renderWord()
        }else{
            renderFinalCard()
        }
    }
}

const renderFinalCard = () => {
    mainContainer.innerHTML = `
        <div class="card border-primary border-5" style="width: 50%; display: inline-flex; justify-content: center; height: 300px " id="flashcard">
          <div class="card-body" style="align-items: center; justify-content: center; display: grid" >
            <h1 class="card-title" style="text-align: center">${(correctNumber/wordsList.length*100).toFixed(0)} %</h1>
            <h5>правильных ответов</h5>
            <button class="btn btn-success border-1" id="restart">Начать заново</button>
            <a href="/"  class="btn btn-outline-primary border-1">Вернуться на главную</a>
          </div>
    </div>
    `
    let restartButton = document.getElementById('restart')
    restartButton.onclick = () => {
        wordNumber = 0
        correctNumber = 0
        renderWord()
    }
}

startButton.onclick = () => {
    renderWord()
}

