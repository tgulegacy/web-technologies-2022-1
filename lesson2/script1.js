function pickPropArray(mas, property)
{
    let result = new Array(mas.length + 1)
    for (let i = 0; i < mas.length; i++) {
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

