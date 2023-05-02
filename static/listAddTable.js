
//collecting components
const list = document.getElementById("list");
let addButton = document.getElementById('add_button');
let sendButton = document.getElementById('send_button')
let descriptionInput = document.getElementById('new_description')
const chooseLanguageButton = document.getElementById('chooseLanguageButton')
const chooseLanguageDropDown = document.getElementById('chooseLanguageDropDown')
const languageOptions = document.getElementsByClassName('langOption')
const listNameInput = document.getElementById('list_name')


//templates
let labelsHTML =
    `<div class="row my-2">
                <div class="col" >
                <label for="new_term">Слово</label>
                </div>
                <div class="col" >
                <label for="new_definition">Перевод</label>
                </div>

            </div>`
let getRowHTML =  (id) =>`<div class="row my-2">
                <div class="col" >
                    <input type="text" class="form-control input-lg new_term"  id=${id+'_word'}>
                </div>
                <div class="col" >
                <input type="text" class="form-control input-lg new_trans" id=${id+'_translation'}>
                </div>

            </div>`
const getHTMLTable = ()=>{
    return table.join('')
}
//state region
let table = [labelsHTML, getRowHTML('1')]
let tableRowsAmount = 1
let wordsList = [{
    word: '',
    translation: ''
}]
let listName = ''
let langChosen = ''
let description = ''



sendButton.onclick = () => {
    axios({
      method: 'post',
      url: '/create-list',
      data: {
            words: wordsList,
            listName: listName,
            language: langChosen,
            description: description
      }
    })
    
}
addButton.onclick = (e) => {
    e.preventDefault()
    tableRowsAmount++;
    table.push(getRowHTML(tableRowsAmount))
    wordsList.push({
        word: '',
        translation: ''
    })
    list.innerHTML = getHTMLTable()//getHTMLTable();
    setRowEvents()
    setRowValues()

}
listNameInput.onchange = (e) => {
    listName = e.target.value;
    if (e.target.value !== ''){
        sendButton.classList.remove('disabled')
    }else{
        sendButton.classList.add('disabled')
    }
}
descriptionInput.onchange = (e) =>{
    description = e.target.value;
}

for (let i = 0; i < languageOptions.length; i++){
    console.log(languageOptions[i])
    languageOptions[i].onclick= (e) => {
        for (let j = 0; j<languageOptions.length; j++){
            if (i === j){
                languageOptions[j].classList.add('active')
            }else{
                languageOptions[j].classList.remove('active')
            }
        }
        langChosen = languageOptions[i].id
        chooseLanguageDropDown.classList.remove('show')
        chooseLanguageButton.classList.remove('show')
        chooseLanguageButton.textContent = languageOptions[i].textContent
    }

}
chooseLanguageButton.onclick = (e) => {
    console.log(chooseLanguageButton.classList.contains('show'))
    if (chooseLanguageButton.classList.contains('show')){
        console.log(chooseLanguageDropDown.classList)
        chooseLanguageDropDown.classList.remove('show')
        chooseLanguageButton.classList.remove('show')
    }else{
        console.log('keo', chooseLanguageButton.classList)
        chooseLanguageDropDown.classList.add('show')
        chooseLanguageButton.classList.add('show')
    }
}

const setRowEvents = () => {
    let words = document.getElementsByClassName('new_term')
    let translations = document.getElementsByClassName('new_trans')
    for (let i = 0; i < words.length; i++){
        words[i].onchange = (e) => {
            console.log('#A1', i, e.target.value)
            wordsList[i].word = e.target.value
        }
        translations[i].onchange = (e) => {
            wordsList[i].translation = e.target.value
        }

    }
}
const setRowValues = () => {
    let words = document.getElementsByClassName('new_term')
    let translations = document.getElementsByClassName('new_trans')
    console.log(wordsList)
    for (let i = 0; i < wordsList.length; i++){

        words[i].value= wordsList[i].word
        translations[i].value= wordsList[i].translation

    }
}




list.innerHTML = getHTMLTable();

setRowEvents()