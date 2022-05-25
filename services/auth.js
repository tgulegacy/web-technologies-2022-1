export class Auth {
    constructor() {
        if (typeof Auth.instance === 'object') {
            return Auth.instance
        }

        this.userDataEl = document.querySelector('[data-user-info]')
        Auth.instance = this
        return Auth.instance
    }

    async auth(body) {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const result = await fetch("http://localhost:5000/api/login", {
            method: 'POST',
            body: JSON.stringify(body),
            headers,
        })
        const data = await result.json()

        if (data.ok) {
            const token = data.data.accessToken
            this.setToken(token)
            this.setUserInfo(data.data.user)
        } else {
            this.setUserInfo({}, true)
        }


        return data
    }

    async reg(body) {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const result = await fetch("http://localhost:5000/api/registration", {
            method: 'POST',
            body: JSON.stringify(body),
            headers,
        })
        const data = await result.json()

        if (data.ok) {
            const token = data.data.accessToken
            this.setToken(token)
            this.setUserInfo(data.data.user)
        } else {
            this.setUserInfo({}, true)
        }

        return data
    }

    async me() {
        if (!this.getToken()) {
            return
        }

        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append('Authorization', `Bearer ${this.getToken()}`)

        const result = await fetch("http://localhost:5000/api/me", {
            method: 'GET',
            headers,
        })

        const data = await result.json()

        if (data.ok) {
            this.setUserInfo(data.data.user)
        } else {
            this.setUserInfo({}, true)
        }
    }

    setToken(token) {
        localStorage.setItem('access-token', token)
    }

    removeToken(token) {
        localStorage.removeItem('access-token')
    }

    getToken() {
        return localStorage.getItem('access-token')
    }

    setUserInfo(user, clear) {
        const email = this.userDataEl.querySelector('[data-user-email]')
        const name = this.userDataEl.querySelector('[data-user-name]')
        const age = this.userDataEl.querySelector('[data-user-age]')

        email.innerText = clear ? '' : user.email
        name.innerText = clear ? '' : user.name
        age.innerText = clear ? '' : user.age
    }

    async getAllToDos(){
        const result = await fetch("http://localhost:5000/api/todo", {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.getToken()}`
            }
        })
        const resultValue= await result.json();
        const toDoList=resultValue.data;
        this.renderAllToDos(toDoList)
    }

    async addToDo(body){
        const result = await fetch("http://localhost:5000/api/todo", {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.getToken()}`
            },
        })

        const resultValue = await result.json();

        if(resultValue.ok) {
            const todo = resultValue.data

            this.renderToDo(todo)
            this.initEventListener()

        }
    }

    async deleteToDo(id){
        const result = await fetch(`http://localhost:5000/api/todo/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.getToken()}`
            },
        })

        const data = await result.json();

        if(data.ok) {
            document.getElementById(`todo${id}`).remove()
        }
    }

    async changeCheckBox(id,checkbox){
        const completed = document.querySelector(`#todo${id} input`).checked;
        console.log(completed)
        const result = await fetch(`http://localhost:5000/api/todo/${id}`, {
            method: 'PUT',
            body: JSON.stringify({completed: completed}),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.getToken()}`
            },
        })

        const data = await result.json();

        if(data.ok) {
            const todo = document.getElementById(`todo${id}`);
            todo.classList.toggle('completed')
            checkbox.checked = !completed

        }
        //console.log(checkbox.checked)
    }

    renderAllToDos(list){
        //console.log(list)
        list.forEach(toDo=>this.renderToDo(toDo));
        this.initEventListener()
    }

    renderToDo(toDo){
        let toDoPlace= document.getElementById("toDo-List")
        console.log(toDo)
        toDoPlace.insertAdjacentHTML('beforeend',`<div class="toDo" id="todo${toDo.id}">
                <input type="checkbox" id="${toDo.id}" data-check ${toDo.completed && 'checked'}/>
                <span>${toDo.description}</span>
                <button id="${toDo.id}" data-delete>❌</button>
            </div>`)
    }

    async initEventListener() {
        const todosButtons = document.querySelectorAll('[data-delete]');
        todosButtons.forEach(button => button.addEventListener('click', async (e) => {
            const id = +e.path[0].id
            //console.log(e)

            await this.deleteToDo(id);
        }))

        const todosCheckboxes = document.querySelectorAll('[data-check]');

        todosCheckboxes.forEach(checkbox => checkbox.addEventListener('change', async (e) => {
            const id = +e.path[0].id

            await this.changeCheckBox(id, checkbox)

            checkbox.checked = !e.target.checked
        }))
    }
}
