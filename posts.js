import Catalog from "./components/catalog.js";

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
} else {
    init()
}

function init() {
    new Catalog(document.getElementById('posts'))
}
