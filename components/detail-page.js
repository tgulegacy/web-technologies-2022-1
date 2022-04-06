
export default class DetailPage {
    constructor(el) {
        this.post = this.getPost();
        this.postsEl = el.querySelector('[data-catalog-item]');
        this.commentsEl = el.querySelector('[data-comment-items]');
        this.getItem()
        this.getComments()
    }

    getPost() {
        const url = new URL(window.location.href)
        return +url.searchParams.get('id')
    }

    async getItem() {
        return new Promise(async () => {
            const url = `https://jsonplaceholder.typicode.com/posts/${this.post}`;
            try {
                const response = await fetch(url);

                if (response.ok) {
                    const json = await response.json();
                    if (json)
                        this.renderPost(json);
                } else {
                    throw new Error('Ошибка запроса');
                }

            } catch (exception) {
                throw new Error(exception);
            }
        });
    }

    renderPost(item) {
        this.postsEl.innerHTML = `            
            <h3 class="post-content__title">${item.title}</h3>
            
            <div class="post-content__body">
                ${item.body}
            </div>
            
            <a class="post-content__back" href="http://localhost:63343/web-technologies-2022-1/posts.html?page=1">Назад</a> 
        `
    }

    async getComments() {
        const url = `https://jsonplaceholder.typicode.com/posts/${this.post}/comments`
        try {
            const response = await fetch(url)

            if (response.ok) {
                const json = await response.json()
                if (json)
                    this.renderComments(json)
            } else {
                throw new Error('Ошибка запроса');
            }
        } catch (exception) {
            throw new Error(exception)
        }
    }

    renderComments(items) {
        let html = ''

        items.forEach(item => {
            html += `
                <div class="comment-item">
                    <div class="user-info">
                        <div class="comment-item__name">
                            ${item.name}
                        </div>
                        <div class="comment-item__email">
                            ${item.email}
                        </div>
                    </div>
                    <div class="comment-item__body">
                        ${item.body}
                    </div>
                </div>
            `
        })

        this.commentsEl.innerHTML = html
    }
}