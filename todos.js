import {Auth} from '/services/auth.js'
import Form from "./components/form.js";

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
} else {
    try {
        init()
    } catch (e) {
        console.log(e)
    }
}

function init() {
    new Auth().me()
    new Form(
        document.getElementById('addToDo'),
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
            //console.log(obj)
            await new Auth().addToDo(obj)
        }
    ).init()
    new Auth().me();
    new Auth().getAllToDos();

}
