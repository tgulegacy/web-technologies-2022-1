export default class Catalog {
    constructor(el) {
        this.itemsEl = el.querySelector('[data-catalog-items]')
        this.paginationEl = el.querySelector('[data-catalog-pagination]')
        this.page = this.getPage()
        this.limit = 10
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
        const url = `https://jsonplaceholder.typicode.com/posts?_limit=${this.limit}&_page=${this.page}`;
        try {
            const response = await fetch(url);

            if (response.ok) {
                this.count = response.headers.get('x-total-count')
                this.getPageCount()
                const json = await response.json();
                if (json) {
                    this.renderItems(json)
                    this.renderPagination()
                }
            } else {
                throw new Error('Ошибка запроса')
            }

        } catch(exception) {
            throw new Error(exception)
        }
    }

    renderItems(items) {
        let html = ''

        items.forEach(item => {
            let body = item.body;
            let str = this.spliceString(body)
            html += `
            <div class="post-item">
                <h3 class="post-item__title">
                    ${item.title}
                </h3>
                
                <div class="post-item__body">
                    ${str}
                </div>
                <a class="post-item__link" href="/post.html?id=${item.id}">
                    Открыть
                </a>
            </div>
            `
        })

        this.itemsEl.innerHTML = html
    }

    spliceString(body) {
        let str = body.slice(0, 50);
        let strSplit = str.split(' ');
        strSplit.splice(strSplit.length - 1,1);
        str = strSplit.join(' ') + '...';
        return str
    }

    renderPagination() {
        let html = ''

        for (let i = 1; i <= this.pageCount; i++) {
            const activeClass = this.page === i  ? 'post-pagination-item_active' : '';
            html += `
            <button class="post-pagination-item ${activeClass}" data-pagination-item="${i}">
                ${i}
            </button>
            `
        }
        this.paginationEl.innerHTML = html
    }
}