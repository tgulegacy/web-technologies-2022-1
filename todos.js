import {Auth} from '/services/auth.js'
import Form from "./components/form.js";
import {Todos} from "./services/todo.js";

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
} else init()

async function init() {
    new Form(
        document.getElementById('addTodo'),
        {
            'description': (value) => {
                if(!value) {
                    return 'заполните поле'
                }

                return false
            },
        },
        async (fields) => {
            const obj = {}

            fields.forEach(field => {
                obj[field.name] = field.input.value
            })
            console.log(obj)
            if(obj)
                await new Todos().addTodo(obj)
        }
    ).init()

    await new Auth().me();
    await new Todos().getAllTodos();
}
