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

        const data = await result.json()

        if(data.ok) {
            const todos = data.data;

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

        const data = await result.json();

        if(data.ok) {
            const todo = data.data

            this.renderTodo(todo)
        } else {
            if(new Auth().getToken())
                this.renderError('add-error')
        }
    }

    async deleteTodo(id) {
        const result = await fetch(`http://localhost:5000/api/todo/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.Auth.getToken()}`
            },
        })

        const data = await result.json();

        if(data.ok) {
            document.getElementById(`todo${id}`).remove();
        } else {
            this.renderError('delete-error')
        }
    }

    async toggleCompleteTodo(id, checkbox) {
        const completed = document.querySelector(`#todo${id} input`).checked;

        const result = await fetch(`http://localhost:5000/api/todo/${id}`, {
            method: 'PUT',
            body: JSON.stringify({completed: completed}),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.Auth.getToken()}`
            },
        })

        const data = await result.json();

        if(data.ok) {
            const todo = document.getElementById(`todo${id}`);
            todo.classList.toggle('completed')
            checkbox.checked = !completed
        } else {
            this.renderError('completed-error')
        }
    }

    renderTodos(todos) {
        todos.forEach(todo => this.renderTodo(todo))

        this.initEventListener()
    }

    renderTodo({id, description, completed}) {
        let className = completed ? 'completed' : 'uncompleted'

        const todos = document.querySelector('[data-user-todos]')

        todos.insertAdjacentHTML('beforeend', `
            <div class="user-todo ${className}" id="todo${id}" data-todo-info>
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
            const todo = 'todo'
            const id = +e.path[1].id.replace(todo, '');

            await this.deleteTodo(id);
        }))

        const todosCheckboxes = document.querySelectorAll('[data-todo-checked]');

        todosCheckboxes.forEach(checkbox => checkbox.addEventListener('change', async (e) => {
            const todo = 'todo'
            const id = +e.path[1].id.replace(todo, '');
            checkbox.checked = !e.target.checked

            await this.toggleCompleteTodo(id, checkbox)
        }))
    }
}