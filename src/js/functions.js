// Перемешивание карточек

/*функцию `shuffleCards` принимает массив в качестве аргумента и 
использует алгоритм Fisher-Yates для случайного перемешивания элементов массива.*/

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

// Добавление карточек

/*Функция `addCardsToContent` создает на странице набор карточек игры, и определяет уровень игры `gameLevel` 
в зависимости от выбранного размера карточек `arrSize`.
Принимает на вход массив `arr`, размер карточек `arrSize`, уровень игры `gameLevel`, 
обложку `cover` и изображения животных `animalsImg`.*/

export const addCardsToContent = (arr, arrSize, gameLevel, cover, animalsImg) => {
    // Создается новый фрагмент документа `fragment` для добавления туда карточек
    const fragment = new DocumentFragment();
    // Получение доступа к контейнеру `container` для добавления карточек.
    const container = document.querySelector(".game__content");
    // Массив `card` будет хранить все сгенерированные карточки.
    const card = [];

    // Цикл `for ... of` генерирует карточки на основе переданных данных: 
    for (let i of arr) {
        const item = document.createElement("div");
        const front = document.createElement("div");
        const frontImg = document.createElement("div");
        const imgCover = document.createElement("img");
        const back = document.createElement("div");
        const backImg = document.createElement("div");
        const imgAnimal = document.createElement("img");

        // Создается новый элемент `div` с классами `game__item` и `card`
        item.classList.add("game__item", "card");
        // К элементу добавляется атрибут `data-type` со значением `i`
        item.setAttribute("data-type", i);
        // Создается элемент `front` для лицевой стороны карточки с классом `card__front`
        front.classList.add("card__front");
        // Создается элемент `frontImg` для размещения изображения обложки с классом `card__front-img`
        frontImg.classList.add("card__front-img");
        //Создается элемент `imgCover` для помещения самой обложки компонента
        imgCover.src = cover;
        imgCover.alt = "img-cover";
        //Создается элемент `back` для задней стороны карточки c классом `card__back`
        back.classList.add("card__back");
        //Создается элемент `backImg` для размещения изображения животного c классом `card__back-img`
        backImg.classList.add("card__back-img");
        //Создается элемент `imgAnimal` для помещения изображения животного из массива `animalsImg`
        imgAnimal.src = animalsImg[i];
        imgAnimal.alt = "animal";
        //Сгенерированные элементы соединяются и добавляются в документ
        frontImg.appendChild(imgCover);
        front.appendChild(frontImg);
        backImg.appendChild(imgAnimal);
        back.appendChild(backImg);
        item.appendChild(front);
        item.appendChild(back);
        fragment.appendChild(item);

        //Ссылки на созданные элементы сохраняются в массиве `card`
        card.push(item);
    }

    //Очищает содержимое контейнера
    container.innerHTML = "";
    //Контейнер заполняется карточками, добавленными в `fragment`
    container.appendChild(fragment);

    // Карточкам добовляются классы в зависимости от выбранного размера
    switch (arrSize) {
        case "6":
            // добавляется класс 'small'
            card.forEach((el) => el.classList.add("small"));
            // контейнеру добавляется класс 'sm-container'
            container.classList.add("sm-container");
            // значение переменной `gameLevel` становится "Легкий"
            gameLevel = "Легкий";
            break;

        case "8":
            // добавляется класс 'medium'
            card.forEach((el) => el.classList.add("medium"));
            // контейнеру добавляется класс 'md-container'
            container.classList.add("md-container");
            // значение переменной `gameLevel` становится "Нормальный"
            gameLevel = "Нормальный";
            break;

        case "10":
            // добавляется класс 'large'
            card.forEach((el) => el.classList.add("large"));
            // контейнеру добавляется класс 'lg-container'
            container.classList.add("lg-container");
            // значение переменной `gameLevel` становится "Сложный"
            gameLevel = "Сложный";
            break;
    }

    // возвращает значение переменной `gameLevel` с учетом выбранного размера карточек
    return gameLevel;
};

// Переворот карточек при клике

/*Функция `startCardFlip` запускает прослушивание кликов по всем карточкам на странице 
и направляет взаимодействия пользователя соответствующим обработчикам.*/
export const startCardFlip = (result, cardReverse) => {
    // Выбирает все элементы на странице с классом `card`
    const card = document.querySelectorAll(".card");
    // Очищает содержимое элемента, на который ссылается переменная `result`
    result.innerHTML = " ";
    // Для каждой карточки из коллекции, добавляет прослушиватель событий, 
    // который следит за кликами на каждой карточке.
    // При клике на карточке срабатывает функция `cardReverse`, которая отвечает за переворот карточки.
    card.forEach(el => el.addEventListener('click', cardReverse));
}
