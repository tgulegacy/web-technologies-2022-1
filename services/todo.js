import {Auth} from "./auth.js";

export class Todos {
    constructor() {
        this.Auth = new Auth()
    }

    async getAllTodos() {
        const result = await fetch("http://localhost:5000/api/todo", {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.Auth.getToken()}`
            },
        })

        const resultData = await result.json()

        if(resultData.ok) {
            const todos = resultData.data;

            this.renderTodos(todos)
        } else {
            this.renderError('todos-error')
        }
    }

    async addTodo(body) {
        const result = await fetch("http://localhost:5000/api/todo", {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.Auth.getToken()}`
            },
        })

        const resultData = await result.json();

        if(resultData.ok) {
            const todo = resultData.data

            this.renderTodo(todo)
        } else {
            if(new Auth().getToken())
                this.renderError('add-error')
        }
        location.reload();
    }

    async deleteToDo(id) {
        const currId = id.replace('td_','')
        const result = await fetch(`http://localhost:5000/api/todo/${currId}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.Auth.getToken()}`
            },
        })

        const resultData = await result.json();
        console.log(`status ${resultData.ok}`);
        if(resultData.ok) {
            document.getElementById(`${id}`).remove();
        } else {
            this.renderError('delete-error')
        }
    }

    async changeCheckBox(id, checkbox) {
        const currId = id.replace('td_','')
        const currCheckBox = document.querySelector(`#${id} input`);
        console.log(currCheckBox.checked);
        const result = await fetch(`http://localhost:5000/api/todo/${currId}`, {
            method: 'PUT',
            body: JSON.stringify({completed: currCheckBox.checked}),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.Auth.getToken()}`
            },
        })

        const resultData = await result.json();
        console.log(resultData);
        if(resultData.ok) {
            const todo = document.getElementById(`${id}`);
            todo.classList.toggle('completed');
            checkbox.checked = !currCheckBox.checked;
        } else {
            this.renderError('completed-error')
        }
    }

    renderTodos(todos) {
        todos.forEach(todo => this.renderTodo(todo))
        this.initEventListener().then()
    }

    renderTodo({id, description, completed}) {
        const className = completed ? 'completed' : 'uncompleted';
        const todos = document.querySelector('[data-user-todos]')
        todos.insertAdjacentHTML('beforeend', `
            <div class="user-todo ${className}" id="td_${id}" data-todo-info>
                <input type="checkbox" ${completed && 'checked'} data-todo-checked/>
                <span>${description}</span>
                <button id="delete-todo${id}" data-delete>❌</button>
            </div>
        `)
    }

    renderError(errorType) {
        switch (errorType) {
            case 'todos-error':
                const element = document.getElementById('todo-list')
                element.innerHTML = 'error'
                break;
            case 'add-error':
                alert('ошибка добавления')
                break;
            case 'delete-error':
                alert('ошибка удаления')
                break;
            case 'completed-error':
                alert('ошибка изменения выполнения')
                break;
        }
    }

    async initEventListener() {
        const todosButtons = document.querySelectorAll('[data-delete]');

        todosButtons.forEach(button => button.addEventListener('click', async (e) => {
            const id = e.path[1].id;
            console.log(id);
            await this.deleteToDo(id);
        }))

        const todosCheckboxes = document.querySelectorAll('[data-todo-checked]');

        todosCheckboxes.forEach(checkbox => checkbox.addEventListener('change', async (e) => {
            const id = e.path[1].id;
            checkbox.checked = e.target.checked
            await this.changeCheckBox(id, checkbox)
        }))
    }
} 