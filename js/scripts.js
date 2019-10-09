const today = new Date();
const date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
const dateTime = date;
document.getElementById('currentTime').innerHTML = dateTime

const addScript = language => {
    var s = document.createElement("script");
    s.setAttribute(
        "src",
        `https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/locale/${language}.js`
    );
    document.body.appendChild(s);
};
if (window.clientInformation.language == "vi") {
    addScript("vi");
}
let pageNumber = 1;
let news = [];

async function fetchNews(arr) {
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=285797e4271b4203911cd93955549e3a&page=${pageNumber}`
    const result = await fetch(url)
    const data = await result.json()
    news = news.concat(data.articles)
    pageNumber++
    const total = data.totalResults
    renderArticleCounterAndHideButton(news, total)
    console.log('hi', data)
    renderNews(news)
}

function goToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function renderNews(arr) {
    const html = arr.map(article => {
        return `
        <div class="new-container container-fluid d-flex flex-column-reverse flex-lg-row justify-content-center bg-white shadow rounded-lg p-0" id="board">
            <div class="container-fluid d-flex flex-column col-lg-6 px-3 py-3 overflow-auto" id="new">
                <h2 id="title">${article.title}</h2>
                <h5 id="author">${article.author}</h5>
                <p id="content">${article.content}</p>
                <p class="text-secondary font-italic" id="source">${article.source.name}</p>
                <p class="text-secondary font-weight-light" id="date">${moment(article.publishedAt).fromNow()}</p>
                <a class="text-secondary" href="${article.url}">view more +</a>
            </div>
            <div class="container-fluid bg-dark d-flex col-lg-6 p-0">
                <img class="newImg" src="${article.urlToImage}" alt="">
            </div>
        </div>
        `
    })
    document.getElementById('board').innerHTML = html
}

const renderArticleCounterAndHideButton = (articles, total) => {
    document.getElementById('articleCounter').innerHTML = 'Showing ' + articles.length + ' of ' + total
    if (articles.length === total) {
        return document.getElementById("loadMore").style.visibility = "hidden"
    }
}

fetchNews()


