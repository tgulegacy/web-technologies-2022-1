function pickPropArray(mas, property)
{
    let result = []
    for (let i = 0; i < mas.length; i++) {
        if (mas[i][property])
            result.push(mas[i][property])
    }
    return result
}


const students = [
    { name: 'Павел', age: 20 },
    { name: 'Иван', age: 20 },
    { name: 'Эдем', age: 20 },
    { name: 'Денис', age: 20 },
    { name: 'Виктория', age: 20 },
    { age: 40 },
]
const result = pickPropArray(students, 'name')
console.log(result)

