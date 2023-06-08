// Перемешивание карточек
// функцию `shuffleCards` принимает массив в качестве аргумента и 
// использует алгоритм Fisher-Yates для случайного перемешивания элементов массива.

export const shuffleCards = (array) => {
    // определяется длина массива и переменная `randomIndex
    let currentIndex = array.length,
        randomIndex;

    //создается кэш случайных чисел 
    const randomCache = new Array(currentIndex);
    //функция `random` генерирует случайное число с помощью метода Math.floor() 
    //и Math.random() для каждой итерации цикла while. 
    const random = () => Math.floor(Math.random() * currentIndex);

    //Цикл while использует переменную `currentIndex`
    while (currentIndex !== 0) {
        //Во время каждой итерации цикла, из кэша `randomCache` извлекается случайное число `randomIndex` 
        //с использованием индекса `currentIndex`. 
        //Если случайное число не содержится в кэше `randomCache`, оно будет сгенерировано с помощью функции `random`, 
        //сохранено в `randomCache` и использовано для текущей итерации цикла. 
        randomIndex = randomCache[currentIndex] || (randomCache[currentIndex] = random());

        //переменная уменьшается на единицу на каждой итерации
        currentIndex -= 1;

        //После определения случайного индекса массива, элемент в `array[randomIndex]` 
        //и текущий элемент `array[currentIndex]` меняются местами на каждой итерации цикла, 
        //пока `currentIndex` не станет равным 0.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }

    //возврат перемешанного массива 
    return array;
}