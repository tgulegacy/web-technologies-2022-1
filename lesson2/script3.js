function spinWords(str){
    let mas = str.split(' ')
    let result = ''
    for (let i = 0; i < mas.length; i++) {
        if (mas[i].length > 4){
            for (let j = mas[i].length - 1; j >= 0 ; j--) {
                result += mas[i][j]
            }
        } 
        else result += mas[i]
        result += " "
    }
    return result
}

const result1 = spinWords( "Привет от Legacy" )
console.log(result1)

const result2 = spinWords( "This is a test" )
console.log(result2)
