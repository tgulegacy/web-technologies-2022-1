function createCounter(){
    let num = 0
    return function (){
        num++
        console.log(num)
    }
}

let counter1 = createCounter()
counter1()
counter1()

console.log('')

let counter2 = createCounter()
counter2()
counter2()
