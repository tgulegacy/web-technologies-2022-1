export default class Catalog {
    constructor(el) {
        this.el = el
        this.itemsEl = el.querySelector('[data-catalog-items]')
        this.paginationEl = el.querySelector('[data-catalog-pagination]')
        this.page = this.getPage()
        this.limit = 12
        this.count = null
        this.pageCount = null

        this.getItems()
        this.initListeners()
    }

    initListeners() {
        this.paginationEl.addEventListener('click', event => {
            if (!event.target.hasAttribute('data-pagination-item')) {
                return
            }

            const page = +event.target.dataset.paginationItem

            if (!page || (page === this.page)) {
                return;
            }

            this.page = page
            this.getItems()

            const {origin, pathname} = document.location
            const url = origin + pathname + `?page=${page}`

            history.pushState({}, '', url)
        })
    }

    getPage() {
        const url = new URL(window.location.href)

        return +url.searchParams.get('page') || 1
    }

    getPageCount() {
        this.pageCount = Math.floor(this.count / this.limit)
    }

    async getItems() {
        const url = `https://jsonplaceholder.typicode.com/posts?_limit=${this.limit}&_page=${this.page}`

        try {
            const res = await fetch(url);
            this.count = res.headers.get('x-total-count')
            this.getPageCount()
            const data = await res.json();
            if(data){
                this.renderItems(data)
                this.renderPagination()
            }
        } catch(error) {
            console.error('Ошибка:',error)}
    }

    renderItems(items) {
        let html = ''

        items.forEach(item => {
            html += `
            <div class="post-item">
                <h3 class="post-item__title">
                    ${item.title}
                </h3>

                <div class="post-item__body">
                    ${item.body}
                </div>

                <a class="post-item__link" href="/post.html?id=${item.id}">
                    Открыть
                </a>
            </div>
            `
        })

        this.itemsEl.innerHTML = html
    }

    renderPagination() {
        let html = ''

        for (let i = 0; i < this.pageCount; i++) {
            const activeClass = this.page === i + 1 ? 'post-pagination-item_active' : ''

            html += `
            <button class="post-pagination-item ${activeClass}" data-pagination-item="${i + 1}">
                ${i + 1}
            </button>
            `
        }

        this.paginationEl.innerHTML = html
    }
}
