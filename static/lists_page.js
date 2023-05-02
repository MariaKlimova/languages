let listsBlock = document.getElementById('lists_block')

//state region
let lists = []

const generateCard = (listProps) => {

    let path = "../static/gb.jpg"
    switch (listProps.language) {
        case 'english':
            path = "../static/gb.jpg"
            break;
        case 'chinese':
            path = "../static/china.jpg"
            break
        case 'spanish':
            path = "../static/spain.jpg"
            break;
        default:
            break;
    }
    return `<div class="card my-2" >
  <div class="card-body" style="display: flex; justify-content: space-between; flex-direction: row">
    <div>
        <div style="flex-direction: row; display: flex; align-items: center">
            <img src=${path} alt="Проект про математику" width="25" height="25" style="border-radius: 25px; margin-right: 10px"/>
            <h5 class="card-title" style="align-self: center;display: contents; ">${listProps.name}</h5>
        </div>
        
        <p class="card-text" style="font-style: italic">${listProps.description}</p>
        <a href="/word-list?list_id=${listProps.id}" class="btn btn-primary">Просмотреть</a>
        <a href="/learn?list_id=${listProps.id}" class="btn btn-primary">Учить</a>
    </div>
    <div style="display: flex; flex-direction: row; align-items: center">
        <div class="mx-2" style="display: flex; flex-direction: column">
            <h5>Всего слов</h5>
            <h2 style="text-align: center">${listProps.words_total}</h2>
        </div>
        <div class="mx-2" style="display: flex; flex-direction: column">
            <h5 class="text-success">Выучено</h5>
            <h2  class="text-success" style="text-align: center">${listProps.words_learned}</h2>
        </div>
    </div>
    
  </div>
</div>`
}

axios({
    method: 'get',
    url: '/lists-list',
}).then((resp) => {
    lists = JSON.parse(resp.data.data)
    let listsHTML = lists.map(listData => generateCard(listData))
    listsBlock.innerHTML = listsHTML.join('')
    //console.log('#A1', lists)
}).catch(err => {
    console.log('error in lists-list get', err)
})


