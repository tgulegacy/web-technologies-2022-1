import DetailPage from "./components/detail-page.js";


if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
} 
else {
    init()
}

function init() {
    new DetailPage(document.getElementById('post'))
}

