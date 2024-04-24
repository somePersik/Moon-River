'use strict';

let scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
// --------------------Многоязычность----------------------
const langList = document.querySelector('.mainBlock__language');
const langButtons = document.querySelectorAll('.mainBlock__langItem');
let lang = document.querySelector('.mainBlock__langItem._selected').lang;

//Переключение выбранного языка
langList.addEventListener('click', function(event) {
    for (let i = 0; i < langButtons.length; i++) {
        if (event.target.closest('.mainBlock__langItem')) {
            if (event.target.offsetParent == langButtons[i] || event.target == langButtons[i]) {
                langButtons[i].classList.add('_selected');
                lang = langButtons[i].lang;
            }
            else {
                langButtons[i].classList.remove('_selected');
            }
        }
    }
    for (let key in translatedList) {
        let elem = document.querySelectorAll('.lng-' + key);
        if (elem) {
            if (translatedList[key][lang]) {
                for (let i = 0; i < elem.length; i++) {
                    elem[i].innerHTML = translatedList[key][lang];
                }
            }
        }
    }
    for (let key in translatedPlaceholders) {
        let elem = document.querySelectorAll('.lng-' + key);
        if (elem) {
            if (translatedPlaceholders[key][lang]) {
                for (let i = 0; i < elem.length; i++) {
                    elem[i].placeholder = translatedPlaceholders[key][lang];
                }
            }
        }
    }
});

// ____________________Многоязычность______________________

// -----------------Главное меню---------------------------
const header = document.querySelector('.header');
const mainMenu = document.querySelector('.mainMenu');
const toggle = document.querySelector('.header__menu-toggle');
const logoPart = document.querySelector('.header__logo .logo__changePart');
const rightPart = document.querySelector('.mainBlock__rightPart');
const typeLinks_wrapper = document.querySelector('.mainMenu__types-links');
const typeLinks = document.querySelectorAll('.mainMenu__type-link');

function resizeHeader() {
    mainMenu.style.paddingTop = header.offsetHeight + 'px'; //padding относительно шапки
}

// Открытие и закрытие меню
toggle.addEventListener('click', function() {
    if (mainMenu.classList.contains('_opened')) {
        rightPart.classList.remove('_full');
        mainMenu.classList.remove('_opened');
        toggle.classList.remove('_on');
        header.classList.remove('_white');
        document.documentElement.style.overflow = 'auto';
        document.body.style.overflow = 'auto';
        document.querySelector('.mainWrapper').style.paddingRight = '0';
    }
    else {
        mainMenu.scrollTo(0, 0);
        scrollTo({
            left:0,
            top:0,
            behavior:"smooth",
        });
        rightPart.classList.add('_full');
        mainMenu.classList.add('_opened');
        toggle.classList.add('_on');
        header.classList.add('_white');
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
        document.querySelector('.mainWrapper').style.paddingRight = scrollBarWidth + 'px';
    }
});
//Скрытие шапки при скролле
mainMenu.addEventListener('scroll', function() {
    if (mainMenu.classList.contains('_opened')) {
        if (mainMenu.scrollTop > 0) {
            header.classList.add('_hidden');
        }
        else {
            header.classList.remove('_hidden');
        }
    }
});
//Выбор фильтров
typeLinks_wrapper.addEventListener('click', function(event) {
    for (let i = 0; i < typeLinks.length; i++) {
        if (event.target.closest('.mainMenu__type-link')) {
            if (event.target.offsetParent == typeLinks[i] || event.target == typeLinks[i]) {
                typeLinks[i].classList.add('_selected');
            }
            else {
                typeLinks[i].classList.remove('_selected');
            }
        }
    }
});
// ____________________Главное меню_____________________

/*
Максимум точек - 6, если больше - точки прокручивать,
*/

// ----------------------Слайдер------------------------
// Меременные и начальные значения
const slider = document.querySelector('.slider__showWrapper');
const center = document.querySelector('.slider__centerWrapper');
const sliderLine = document.querySelector('.slider__slider-line');
const slides = document.querySelectorAll('.slider__slide');
const manipulation = document.querySelector('.slider__manipulation');
const nextButton = document.querySelector('.slider__next');
const prevButton = document.querySelector('.slider__prev');
let spareSlides = document.querySelectorAll('.slider__slide');
spareSlides[Math.floor(spareSlides.length / 2)].classList.add('_active');
let activeSlide = document.querySelector('.slider__slide._active');
let switchTime = '1s';
sliderLine.style.transition = switchTime;
let delay = 5000;
const dotsWrapper = document.querySelector('.slider__dots');
let dots = document.querySelectorAll('.slider__dot');
for (let i = 0; i < slides.length; i++) {
    let dot = document.createElement('div');
    dot.classList.add('slider__dot');
    dotsWrapper.append(dot);
}
dots = document.querySelectorAll('.slider__dot');

// Синхронизация точек
function synchron() {
    for (let i = 0; i < slides.length; i++) {
        if (slides[i].classList.contains('_active')) {
            dots[i].classList.add('_selected');
        }
        else {
            dots[i].classList.remove('_selected');
        }
    }
}
synchron();
// Центрация активного слайда
function slideCentralization() {
    let slideWidth = activeSlide.offsetWidth;
    let slidePositionX = activeSlide.offsetLeft;
    sliderLine.style.left = -(slidePositionX + slideWidth * 0.5) + 'px';
}
setTimeout(slideCentralization, 200);

// Блокировка управления пальцем
function closeTouch() {
    slider.classList.add('_closed');
    setTimeout(function() {
        slider.classList.remove('_closed');
    }, parseInt(switchTime) * 1000);
}

// Движение слайдера в лево
function sliderMoveLeft() {
    clearInterval(sliderMoveInterval);
    sliderLine.style.transition = 'none'; //Отключение плавного перехода
    manipulation.classList.add('_closed'); //Закрытие меню управления
    let firstChild_clone = spareSlides[0].cloneNode(true); //Клонирование первого слайда
    sliderLine.append(spareSlides[0]); //Вставка первого слайда в конец
    sliderLine.prepend(firstChild_clone); //Вставка клона в начало
    spareSlides = document.querySelectorAll('.slider__slide'); //Перезапись коллекции
    slideCentralization(); //Центрация
    //Переназначение активного слайда
    for (let i = 0; i < slides.length; i++) {
        if (spareSlides[i].classList.contains('_active')) {
            spareSlides[i].classList.remove('_active');
            spareSlides[i + 1].classList.add('_active');
            activeSlide = document.querySelector('.slider__slide._active');
            break;
        }
    }
    slideCentralization(); //Центрация
    //Действия в конце анимации
    setTimeout(function() {
        sliderLine.style.transition = 'none'; //Отключение плавного перехода
        spareSlides[0].remove(); //Удаление скрытого клона
        spareSlides = document.querySelectorAll('.slider__slide'); // Перезапись коллекции
        slideCentralization(); //Центрация
        manipulation.classList.remove('_closed'); //Открытие меню управления
    }, parseInt(switchTime) * 1000);
    sliderLine.style.transition = switchTime; //Включение меню управления
    synchron();
    closeTouch();
    sliderMoveInterval = setInterval(sliderMoveLeft, delay);
}

// Движение слайдера вправо
function sliderMoveRight() {
    clearInterval(sliderMoveInterval);
    sliderLine.style.transition = 'none'; //Отключение плавного перехода
    manipulation.classList.add('_closed'); //Закрытие меню управления
    let lastChild_clone = spareSlides[spareSlides.length - 1].cloneNode(true); //Клонирование последнего слайда
    sliderLine.prepend(spareSlides[spareSlides.length - 1]); //Вставка последнего слайда в начало
    sliderLine.append(lastChild_clone); //Вставка клона в конец
    spareSlides = document.querySelectorAll('.slider__slide'); //Перезапись коллекции
    slideCentralization(); //Центрация
    //Переназначение активного слайда
    for (let i = 0; i < slides.length; i++) {
        if (spareSlides[i].classList.contains('_active')) {
            spareSlides[i].classList.remove('_active');
            spareSlides[i - 1].classList.add('_active');
            activeSlide = document.querySelector('.slider__slide._active');
            break;
        }
    }
    slideCentralization(); //Центрация
    //Действия в конце анимации
    setTimeout(function() {
        sliderLine.style.transition = 'none'; //Отключение плавного перехода
        spareSlides[spareSlides.length - 1].remove(); //Удаление скрытого клона
        spareSlides = document.querySelectorAll('.slider__slide'); // Перезапись коллекции
        slideCentralization(); //Центрация
        manipulation.classList.remove('_closed'); //Открытие меню управления
    }, parseInt(switchTime) * 1000);
    sliderLine.style.transition = switchTime; //Включение меню управления
    synchron();
    closeTouch();
    sliderMoveInterval = setInterval(sliderMoveLeft, delay);
}

// Перемещение по слайдам по нажатой точке
function moveByDot(event) {
    clearInterval(sliderMoveInterval);
    for (let i = 0; i < dots.length; i++) {
        if (event.target == dots[i]) {
            let activeIndex;
            for (let j = 0; j < slides.length; j++) {
                if (slides[j].classList.contains('_active')) {
                    activeIndex = j;
                    break;
                }
            }
            let insideCount = 0;
            let outsideCount = 0;
            let count = 0;
            let direction = "";
            for (let j = 0; j < dots.length; j++) {
                if (j > i && j < activeIndex || j > activeIndex && j < i) {
                    insideCount++;
                }
                else if (j != i && j != activeIndex) {
                    outsideCount++;
                }
                else {}
            }
            if (i > activeIndex && insideCount < outsideCount) {
                direction = "left";
            }
            else if (i < activeIndex && insideCount < outsideCount) {
                direction = "right";
            }
            else if (i > activeIndex && insideCount > outsideCount) {
                direction = "right";
            }
            else if (i < activeIndex && insideCount > outsideCount) {
                direction = "left";
            }
            else if (insideCount == outsideCount) {
                direction = "left";
            }
            else {}
            
            if (insideCount < outsideCount) {
                count = insideCount;
            }
            else if (insideCount > outsideCount) {
                count = outsideCount;
            }

            sliderLine.style.transition = 'none'; //Отключение плавного перехода
            manipulation.classList.add('_closed'); //Закрытие меню управления
            if (direction == "left") {
                let clones = []; //Массив клонов
                for (let j = 0; j < count + 1; j++) {
                    clones[j] = spareSlides[j].cloneNode(true); //Клонирование первого слайда
                    sliderLine.append(spareSlides[j]); //Вставка первого слайда в конец
                }
                for (let j = 0; j < count + 1; j++) {
                    sliderLine.prepend(clones[count - j]); //Вставка клона в начало
                    spareSlides = document.querySelectorAll('.slider__slide'); //Перезапись коллекции
                }
            }
            else if (direction == "right") {
                let clones = []; //Массив клонов
                for (let j = 0; j < count + 1; j++) {
                    clones[j] = spareSlides[spareSlides.length - (j + 1)].cloneNode(true); //Клонирование последнего слайда
                    sliderLine.prepend(spareSlides[spareSlides.length - (j + 1)]); //Вставка последнего слайда в начало
                }
                for (let j = 0; j < count + 1; j++) {
                    sliderLine.append(clones[count - j]); //Вставка клона в конец
                    spareSlides = document.querySelectorAll('.slider__slide'); //Перезапись коллекции
                }
            }
            slideCentralization(); //Центрация
            //Переназначение активного слайда
            for (let j = 0; j < slides.length; j++) {
                if (slides[j].classList.contains('_active')) {
                    slides[j].classList.remove('_active');
                    slides[i].classList.add('_active');
                    activeSlide = document.querySelector('.slider__slide._active');
                    break;
                }
            }
            slideCentralization(); //Центрация
            //Действия в конце анимации
            setTimeout(function() {
                sliderLine.style.transition = 'none'; //Отключение плавного перехода
                if (direction == "left") {
                    for (let j = 0; j < count + 1; j++) {
                        spareSlides[0].remove(); //Удаление скрытого клона
                        spareSlides = document.querySelectorAll('.slider__slide'); //Перезапись коллекции
                    }
                }
                else if (direction == "right") {
                    for (let j = 0; j < count + 1; j++) {
                        spareSlides[spareSlides.length - 1].remove(); //Удаление скрытого клона
                        spareSlides = document.querySelectorAll('.slider__slide'); //Перезапись коллекции
                    }
                }
                slideCentralization(); //Центрация
                manipulation.classList.remove('_closed'); //Открытие меню управления
            }, parseInt(switchTime) * 1000);
            sliderLine.style.transition = switchTime; //Включение меню управления
        }
    }
    synchron();
    closeTouch();
    sliderMoveInterval = setInterval(sliderMoveLeft, delay);
}
// Листание пальцем
function swap(event) {
    clearInterval(sliderMoveInterval);
    let itemCursorX = event.pageX - (document.documentElement.scrollLeft + sliderLine.getBoundingClientRect().left);
    let beforeCursorX = event.pageX - (document.documentElement.scrollLeft + center.getBoundingClientRect().left);
    let beforePositionLeft = sliderLine.offsetLeft;
    let gap = parseInt(getComputedStyle(sliderLine).gap);

    function moveSlider(event) {
        if (!beforeCursorX) {
            return false;
        }
        sliderLine.style.transition = 'none';
        let direction;
        let newCursorX = event.pageX - (document.documentElement.scrollLeft + center.getBoundingClientRect().left);
        let newPositionLeft = newCursorX - itemCursorX;
        sliderLine.style.left = newPositionLeft + 'px';
        if (beforeCursorX > newCursorX) {
            direction = "left";
        }
        else {
            direction = "right";
        }
        beforeCursorX = newCursorX;
        beforePositionLeft = newPositionLeft;
        if (direction == "left") {
            if (Math.abs(sliderLine.offsetLeft) - (spareSlides[0].offsetWidth + gap) > center.offsetLeft) {
                sliderLine.append(spareSlides[0]);
                sliderLine.style.left = sliderLine.offsetLeft + (spareSlides[0].offsetWidth) + 'px';
                itemCursorX -= spareSlides[0].offsetWidth;
                spareSlides = document.querySelectorAll('.slider__slide');
            }
        }
        if (direction == "right") {
            if (sliderLine.offsetLeft + sliderLine.offsetWidth + (spareSlides[spareSlides.length - 1].offsetWidth + gap) > slider.clientWidth) {
                sliderLine.prepend(spareSlides[spareSlides.length - 1]);
                sliderLine.style.left = sliderLine.offsetLeft - spareSlides[spareSlides.length - 1].offsetWidth + 'px';
                itemCursorX += spareSlides[spareSlides.length - 1].offsetWidth;
                spareSlides = document.querySelectorAll('.slider__slide');
            }
        }
    }
    function sliderUp() {
        window.removeEventListener('mousemove', moveSlider);
        // Поиск слайда для активности
        for (let i = 0; i < slides.length; i++) {
            sliderLine.style.transition = 'none';
            if (Math.abs(sliderLine.offsetLeft) > spareSlides[i].offsetLeft - gap * 0.5 && Math.abs(sliderLine.offsetLeft) <= spareSlides[i].offsetLeft + spareSlides[i].offsetWidth + gap * 0.5) {
                for (let j = 0; j < slides.length; j++) {
                    if (spareSlides[j].classList.contains('_active')) {
                        spareSlides[j].classList.remove('_active');
                    }
                }
                spareSlides[i].classList.add('_active');
                activeSlide = spareSlides[i];
                for (let j = 0; j < slides.length; j++) {
                    if (Math.floor(spareSlides.length / 2) < i) {
                        sliderLine.append(spareSlides[0]);
                        sliderLine.style.left = sliderLine.offsetLeft + spareSlides[0].offsetWidth + 'px';
                        spareSlides = document.querySelectorAll('.slider__slide');
                        break;
                    }
                    if (Math.floor(spareSlides.length / 2) > i) {
                        sliderLine.prepend(spareSlides[spareSlides.length - 1]);
                        sliderLine.style.left = sliderLine.offsetLeft - spareSlides[spareSlides.length - 1].offsetWidth + 'px';
                        spareSlides = document.querySelectorAll('.slider__slide');
                        break;
                    }
                }
                break;
            }
        }
        setTimeout(function() {
            sliderLine.style.transition = switchTime;
            slideCentralization();
            synchron();
        }, 0);
        sliderMoveInterval = setInterval(sliderMoveLeft, delay);
        window.removeEventListener('mouseup', sliderUp);
    }
    window.addEventListener('mousemove', moveSlider);
    window.addEventListener('mouseup', sliderUp);
}


let sliderMoveInterval = setInterval(sliderMoveLeft, delay);
nextButton.addEventListener('click', sliderMoveLeft);
prevButton.addEventListener('click', sliderMoveRight);
manipulation.addEventListener('click', moveByDot);
sliderLine.addEventListener('mousedown', swap);
// ______________________Слайдер________________________

// _____________________Появление при скролле_______________________
// Переменные
const bottomLeft = document.querySelector('.products__product._bottomLeft');
const big = document.querySelector('.products__product._big');
const appears = document.querySelectorAll('._appear');
const appearsBottom = document.querySelectorAll('._appearBottom');

// Появление объектов
function appear() {
    // Вычисление области
    function findZone(object) {
        let zone = {
            top: window.pageYOffset + object.getBoundingClientRect().top,
            bottom: window.pageYOffset + object.getBoundingClientRect().bottom,
        }
        return zone;
    }
    let topLine = window.pageYOffset;
    let bottomLine = topLine + window.innerHeight;
    for (let i = 0; i < appears.length; i++) {
        let zone_element = findZone(appears[i]);
        if (bottomLine > zone_element.top) {
            appears[i].classList.remove('_hidden');
        }
    }
    for (let i = 0; i < appearsBottom.length; i++) {
        let zone_element = findZone(appearsBottom[i]);
        if (bottomLine > zone_element.bottom) {
            appearsBottom[i].classList.remove('_hidden');
        }
    }
    let zone_big = findZone(big);
    if (bottomLine > zone_big.bottom - bottomLeft.offsetHeight) {
        big.classList.remove('_hidden');
    }
}
window.addEventListener('scroll', appear);
// ---------------------Появление при скролле-----------------------


resizeHeader();
window.addEventListener('resize', function() {
    resizeHeader();
    slideCentralization();
});