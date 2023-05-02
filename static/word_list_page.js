let listBlock = document.getElementById('list-block')

const urlParams = new URLSearchParams(window.location.search);
let listID = urlParams.get('list_id')
let wordsList = []

const completedBadge = `<span class="badge text-bg-success"
                       style="flex-shrink: inherit;
        height: fit-content;
        padding: 10px;
        align-self: center;">
        Выучено</span>`
const newBadge = `<span class="badge text-bg-primary"
                       style="flex-shrink: inherit;
        height: fit-content;
        padding: 10px;
        align-self: center;">
        Новое</span>`
const notCompletedBadge = `<span class="badge text-bg-danger"
                       style="flex-shrink: inherit;
        height: fit-content;
        padding: 10px;
        align-self: center;">
        Не выучено</span>`

const renderWord = (wordProps) => {
    console.log()
    let badge = wordProps.status === 'new'
        ? newBadge
        : wordProps.status === 'learned' ? completedBadge : notCompletedBadge
    return `<div class="card px-2 py-2 my-2" style="flex-direction: row; justify-content: space-between">
       <div style="flex-direction: column">
            <h3>${wordProps.word[0].toUpperCase()+wordProps.word.slice(1)}</h3>
            <h5>${wordProps.translation[0].toUpperCase()+wordProps.translation.slice(1)}</h5>
       </div>
       ${badge}
    </div>`
}
axios({
    method: 'get',
    url: '/list-words',
    params: {
        listID: listID
    }
}).then((resp) => {
    wordsList = JSON.parse(resp.data.data)
    listBlock.innerHTML = wordsList.map(word => renderWord(word)).join('')
    console.log('#A1', wordsList)
}).catch(err => {
    console.log('error in lists-list get', err)
})