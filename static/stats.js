let mainContainer = document.getElementById('main-container')
let stats = {
    lists_amount: 0,
    words_amount: 0,
    words_learned: 0,
}
const renderStatsData = () => {
    return (
        `<div style="width: 100%; display: flex;">
            <div class="col d-flex card border-info border-2 mx-2" style="height: 300px; display: flex; flex-direction: column; justify-content: center">
                <h5 style="text-align: center">Создано списков:</h5>
                <h1 style="text-align: center">${stats.lists_amount}</h1>
            </div>
            <div class="col d-flex card border-info border-2 mx-2" style="height: 300px; display: flex; flex-direction: column; justify-content: center">
                <h5 style="text-align: center">Всего терминов:</h5>
                <h1 style="text-align: center">${stats.words_amount}</h1>
            </div>
            <div class="col d-flex card border-info border-2 mx-2" style="height: 300px; display: flex; flex-direction: column; justify-content: center">
                <h5 style="text-align: center">Выучено:</h5>
                <h1 style="text-align: center">${stats.words_amount === 0 ? '0' : (stats.words_learned/stats.words_amount*100).toFixed(0)}%</h1>
            </div>
        </div>`
    )
}
axios({
    method: 'get',
    url: '/get-stats',
}).then((resp) => {
    stats = JSON.parse(resp.data.data)
    mainContainer.innerHTML = renderStatsData()
    console.log('#A1', stats)
}).catch(err => {
    console.log('error in lists-list get', err)
})