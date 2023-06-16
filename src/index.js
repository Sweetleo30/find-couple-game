import './index.html';
import './index.scss';

import { cover, animalsImg } from './js/img';

const arr = [];
const arrTwo = [];
let gameLevel;
let arrSize;
let userName;
let k = 0;
let attempts = 0;
const startButton = document.querySelector('.btn');
const result = document.querySelector(".result__attempts");
const watch = document.querySelector('#watch');

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

document.addEventListener("DOMContentLoaded", function (event) {
    document.querySelector(".game__container").style.display = 'none';
});

startButton.onclick = function () {
    userName = document.querySelector(".login-input").value;
    if (!userName) {
        userName = "Гость";
    }
    document.querySelector(".game__container").style.display = 'flex';
    document.querySelector(".start-page").style.display = 'none';
    arrSize = document.querySelector("input[name='level']:checked").value;

    for (let i = 1; i <= arrSize; i++) {
        arr.push(i);
        arr.push(i);
    }
    launchGame();
}

//Основные функции для запуска игры
const launchGame = () => {
    cleanGameData();
    resetWatch();
    document.querySelector(".game__block").style.display = 'block';
    shuffleCards(arr);
    addCardsToContent(arr, arrSize, gameLevel, cover, animalsImg);
    startCardFlip(startWatch, arrTwo, attempts, result, checkMatch, k);
}

/* Перемешивание карточек
функцию `shuffleCards` принимает массив в качестве аргумента и 
использует алгоритм Fisher-Yates для случайного перемешивания элементов массива.*/
export const shuffleCards = (array) => {
    // определяется длина массива и переменная `randomIndex`
    let currentIndex = array.length,
        randomIndex;

    //создается кэш случайных чисел 
    const randomCache = new Array(currentIndex);
    //функция `random` генерирует случайное число с помощью метода `Math.floor()` 
    //и `Math.random()` для каждой итерации цикла `while`. 
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

/*Добавление карточек
Функция `addCardsToContent` создает на странице набор карточек игры, и определяет уровень игры `gameLevel` 
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
            // добавляется класс `small`
            card.forEach((el) => el.classList.add("small"));
            // контейнеру добавляется класс `sm-container`
            container.classList.add("sm-container");
            // значение переменной `gameLevel` становится "Легкий"
            gameLevel = "Легкий";
            break;

        case "8":
            // добавляется класс `medium`
            card.forEach((el) => el.classList.add("medium"));
            // контейнеру добавляется класс `md-container`
            container.classList.add("md-container");
            // значение переменной `gameLevel` становится "Нормальный"
            gameLevel = "Нормальный";
            break;

        case "10":
            // добавляется класс `large`
            card.forEach((el) => el.classList.add("large"));
            // контейнеру добавляется класс `lg-container`
            container.classList.add("lg-container");
            // значение переменной `gameLevel` становится "Сложный"
            gameLevel = "Сложный";
            break;
    }

    // возвращает значение переменной `gameLevel` с учетом выбранного размера карточек
    return gameLevel;
};

/* Клик по карточкам
Функция `startCardFlip` запускает прослушивание кликов по всем карточкам на странице 
и направляет взаимодействия пользователя соответствующим обработчикам.*/
export const startCardFlip = () => {
    // Переменная card получает список всех элементов с классом `card`
    const card = document.querySelectorAll(".card");
    // Очищает содержимое элемента, на который ссылается переменная `result`
    result.innerHTML = " ";
    // Для каждой карточки из коллекции, добавляет прослушиватель событий `click`, 
    // который следит за кликами на каждой карточке.
    // При клике на карточке срабатывает функция `cardReverse`, которая отвечает за переворот карточки.
    card.forEach(el => el.addEventListener('click', cardReverse));
}

/* Переворот карточек и проверка на совпадение.
Функция `cardReverse` выполняет переворот карточки и проверку на совпадение.*/
function cardReverse() {
    // Запускает таймер `startWatch`
    startWatch();

    // Проверяет длину массива `arrTwo` Если количество элементов равно двум, то массив очищается, чтобы начать новый раунд.
    if (arrTwo.length == 2) {
        arrTwo.length = 0;
    }

    //Если количество элементов равно одному, то проверяется, не является ли текущая карточка той же, что и предыдущая. 
    if (arrTwo.length == 1) {
        // Если она такая же,
        if (this == arrTwo[0]) {
            // то функция возвращается, и карточка не переворачивается.
            return;
        }
    }

    // Если у элемента, на который был клик, есть класс `hidden`, это означает, что карточка уже перевернута. 
    // В этом случае функция возвращает `undefined` и карточка не переворачивается.
    if (this.classList.contains("hidden")) {
        return;
    }

    // Элементы-дети элемента `this` (то есть текущей карточки) получают соответствующие классы, 
    // чтобы перевернуть фронтальную и заднюю стороны карточки.
    this.firstElementChild.classList.add("flipped-front");
    this.lastElementChild.classList.add("flipped-back");

    // Карточка добавляется в `arrTwo`
    arrTwo.push(this);

    // Если количество элементов равно двум
    if (arrTwo.length == 2) {
        // То функция обновляет счетчик попыток
        result.innerHTML = attempts += 1;
        // Вызывает функцию `checkMatch`, чтобы проверить, совпали ли две открытые карточки.
        checkMatch(arrTwo, k);
    }
}

/* Проверка одинаковые ли карточки
Функция `checkMatch` выполняет проверку на совпадение двух открытых карточек, которые находятся в массиве `arrTwo`*/
const checkMatch = (arr) => {
    // Проверяет, совпали ли две открытые карточки по их data-type свойству
    if (arr[0].dataset.type === arr[1].dataset.type) {
        // Если карточки совпали, то им добавляется класс `hidden`, они удаляются из массива `arrTwo`
        arr.forEach(element => element.classList.add("hidden"));
        // счетчик найденных пар увеличивается на 1
        k += 1;

        // Если найдены все пары
        if (k == arrSize) {
            pauseWatch();
            const gameTime = watch.innerHTML;
            const gameResult = document.querySelector(".result__attempts").innerHTML;
            // Вызывается функция `showWinTable`, которая отображает таблицу с результатами игры
            setTimeout(showWinTable, 900, gameTime, gameResult);
        }
    } else {
        // Если карточки не совпали, то им добавляется задержка в 900 миллисекунд и 
        // удаляются классы для их перевернутых состояний с помощью функции `cardReset`
        arr.forEach(element => setTimeout(cardReset, 800, element));
    }
}

/*Удаление класса у разных карточек
Функцию `cardReset` удаляет классы, необходимые для перевернутых состояний карточек. 
Функция принимает аргумент element, который является карточкой, из которой необходимо удалить классы.*/
const cardReset = (element) => {
    // Определены две переменные: front и back, 
    // в которые записываются фронтальный и задний элементы карточки соответственно
    const front = element.firstElementChild;
    const back = element.lastElementChild;
    // Классы `flipped-front` и `flipped-back` удаляются с соответствующих элементов 
    front.classList.remove("flipped-front");
    back.classList.remove("flipped-back");
}

/* Рендеринг таблицы
Функция renderWinTable(users) возвращает HTML-код для таблицы победителей, полученной из переданного ей массива объектов users.*/
const renderWinTable = (users) => {
    // Метод массивов `map`, проходит по всем элементам массива `users` и для каждого элемента 
    // создает строку таблицы с помощью шаблонной строки
    // Метод `join()` объединяет все строки в единую строку HTML-кода
    return `
    <div class="table-content">
        <table class="table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Имя</th>
                    <th>Время</th>
                    <th>Количество попыток</th>
                    <th>Уровень сложности</th>
                </tr>
            </thead>
            <tbody>
                ${users.map((item, i) => ` 
                <tr>
                    <td scope="row">${i + 1}</td>
                    <td>${item.name}</td>
                    <td>${item.time}</td>
                    <td>${item.attempts}</td>
                    <td>${item.level}</td>
                </tr>
            `).join('')}
            </tbody>
        </table>
    </div>
    `;
};

/* Получения истории победителей
Функция `getWinHistory()` проверяет, есть ли в `localStorage` сохраненный список победителей */
const getWinHistory = () => {
    // Проверяет наличие списка победителей в `localStorage`
    const winHistory = localStorage.getItem('winHistory');
    // Если он есть, то функция преобразует этот список из `JSON` в массив объектов
    // если нет, то массив победителей будет пустым.
    return winHistory ? JSON.parse(winHistory) : [];
};

/* Вывод таблицы победителей
Функция `showWinTable` отображает таблицу победителей и сохраняет текущую игру в список победителей. */
const showWinTable = (gameTime, gameResult) => {
    // Создает объект `user` со свойствами
    const user = {
        id: 1,
        name: userName,
        time: gameTime,
        attempts: gameResult,
        level: gameLevel = addCardsToContent(arr, arrSize, gameLevel, cover, animalsImg),
    };

    // Получения текущего списка победителей из `localStorage` 
    const arrUsers = getWinHistory();

    // Созданный объект `user` добавляется в этот список массива `arrUsers`
    arrUsers.push(user);
    // Если в списке победителей больше 10 записей
    if (arrUsers.length > 10) {
        //то удаляется самая старая запись
        arrUsers.splice(0, 10);
    }

    // Cохраняется массив объектов `arrUsers` в `localStorage` под ключом `winHistory`
    localStorage.setItem('winHistory', JSON.stringify(arrUsers));

    const gameContent = document.querySelector('.game__content');
    const gameBlock = document.querySelector(".game__block");
    // HTML-код страницы обновляется с помощью функции `renderWinTable()`
    gameContent.innerHTML = `
        <div class="start" >
            <button id="new-button" class="btn">Новая игра</button>
        </div>
        ${renderWinTable(arrUsers)}
    `;

    // Таблица победителей становится видимой
    gameContent.classList.add('table-wrapper');
    // Игровая панель скрывается
    gameBlock.style.display = "none";
};

/* Очистка результатов
Функции `cleanGameData` выполняет очистку данных игры. */
const cleanGameData = () => {
    // Массив `arrTwo`, хранящий открытые пары карточек, очищается путем установки его длины в ноль
    arrTwo.length = 0;
    // Счетчик `attempts`, хранящий количество попыток, обнуляется
    attempts = 0;
    // Переменная `k`, которая используется для проверки завершения игры, также обнуляется
    k = 0;
}

// Секундомер
let milliseconds = 0;
let timer;

const startWatch = () => {
    watch.classList.remove('paused');
    clearInterval(timer);
    timer = setInterval(() => {
        milliseconds += 10;
        const dateTimer = new Date(milliseconds);
        watch.innerHTML =
            ('0' + dateTimer.getUTCHours()).slice(-2) + ':' +
            ('0' + dateTimer.getUTCMinutes()).slice(-2) + ':' +
            ('0' + dateTimer.getUTCSeconds()).slice(-2) + ':' +
            ('0' + dateTimer.getUTCMilliseconds()).slice(-3, -1);
    }, 10);
};

const pauseWatch = () => {
    watch.classList.add('paused');
    clearInterval(timer);
};

const resetWatch = () => {
    cleanGameData();
    watch.classList.remove('paused');
    clearInterval(timer);
    milliseconds = 0;
    watch.innerHTML = '00:00:00:00';
    shuffleCards(arr);
    addCardsToContent(arr, arrSize, gameLevel, cover, animalsImg);
    startCardFlip(startWatch, arrTwo, attempts, result, checkMatch, k);
};

document.addEventListener('click', (e) => {
    const element = e.target;
    if (element.id === 'pause') pauseWatch();
    if (element.id === 'reset') resetWatch();
    //запуск новой игры
    if (element.id === 'new-button') {
        launchGame();
        document.querySelector(".game__content").classList.remove("table-wrapper");
    }
});

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++