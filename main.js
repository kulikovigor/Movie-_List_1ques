let films = [];

const FILM_VALIDATION_LIMIT = 100;
const validationMessage = document.querySelector('.validationMessage'); 

// поле, данные инпута
const newMovieInputNode = document.querySelector('.js-new-movie-input');
// конпка добавления
const addBtn = document.querySelector('.js-addBtn');
// лист список данных(фильмы)
const listFilmsNode = document.querySelector('.js-list-films');

loadFilmsFromLocalStorage();

function addAllDataFilm() {
    // проверка значение инпута
    if (newMovieInputNode.value.length === 0) {
        alert("Нужно ввести название фильма")
        return
    }

    const filmFromUser = getFilmFromUser();

    addFilm(filmFromUser);

    renderFilms();

    newMovieInputNode.value = '';
    newMovieInputNode.focus();

    saveDataLocalStorage();
};

// получаем нов.фильм от пользователя с id и названием
function getFilmFromUser () {
    const newFilm = newMovieInputNode.value;
    return {
        id: Date.now(),
        title: newFilm,
    };
}

// добавляем, пушим фильм и его id и статус
function addFilm({title, id}) {
    films.push({
        title,
        id,
        checked:false
    });
}

function getFilms() {
    return films
}

// выводим в список нов.фильм и добавляем элементы в HTML, так же прописываем проверки
function renderFilms () {
    const films = getFilms();
    
    let filmsHTML = '';

    films.forEach(film => {
        const isCheckedClass = film.checked ? "movie__list_btn_clicked" : "";
        const isMarkedClass = film.checked ? "movie__list_name_mark" : "";

        filmsHTML += `<li id=${film.id}>
        <button type="button" class="movie__list_btn ${isCheckedClass}" data-action="clicked"></button>
        <span class="movie__list_name ${isMarkedClass}">${film.title}</span>
        <button type="button" class="movie__btn_delete" data-action="delete"></button>
      </li>
        `;
    });
    listFilmsNode.innerHTML = filmsHTML;
}

// удаление фильма
function deleteFilm(event) {
    if (event.target.dataset.action === 'delete') {
        const parentNode = event.target.closest('li');
        // определяем id фильма
        const idFilm = Number(parentNode.id);
        // находим индекс нужного фильма в массиве films
        const indexFilm = films.findIndex(function(film) {
            if (film.id === idFilm) {
                return true
            }
        });
        // удаляем из массива фильм через splice
        films.splice(indexFilm, 1)

        // удаляем из разметки HTML
        parentNode.remove()
        saveDataLocalStorage()
    }
}

// зачеркивание/метка на фильме и замена цвета чекбокса на нем
function markFilm (event) {
    if (event.target.dataset.action === 'clicked') {
        const parentNode = event.target.closest('li');

        const filmID = Number(parentNode.id);
        const film = films.find((f) => f.id === filmID);

        film.checked = !film.checked; // Инвертируем состояние checked

        renderFilms(); // Перерисовываем список после изменения состояния
        }
        saveDataLocalStorage();
    }


// функция Валидации на проверку длин.названия фильма
function validation() {
    const filmLen = newMovieInputNode.value.length;

    if (filmLen > FILM_VALIDATION_LIMIT) {
        validationMessage.innerText =  
        `Название фильма больше ${FILM_VALIDATION_LIMIT} символов`
        validationMessage.classList.remove('validationMessage_hidden');
        addBtn.setAttribute('disabled', true);
        addBtn.style.opacity = "0.5";
    } 
    else {
        validationMessage.classList.add("validationMessage_hidden");
        addBtn.removeAttribute("disabled");
        addBtn.style.opacity = "1";
}
}

// загружаем данные из локального хранилища при загрузке страницы и сохраняем их при каждом обновлении списка фильмов.
function loadFilmsFromLocalStorage() {
    const filmsFromStorage = localStorage.getItem("films");
    if (filmsFromStorage) {
    films = JSON.parse(filmsFromStorage);
    renderFilms();
    }
}

function saveDataLocalStorage() {
    localStorage.setItem('films', JSON.stringify(films))
}

// обработчик для добавления фильма
addBtn.addEventListener('click', addAllDataFilm);
// обработчик для удаления фильма
listFilmsNode.addEventListener('click', deleteFilm);
// обработчик для отметки, зачеркивания фильма
listFilmsNode.addEventListener('click', markFilm);
// обработчик для проверки валидации на длин. названия фильма
newMovieInputNode.addEventListener('input', validation);




// push - добавляет новую информацию,значение к массиву.
// forEach - Цикл, повторение неск.действий


// e.target - элемент, на котором произошло определенное событие, в данном случае - клик
//closest() - этот метод ищет ближайший родительский элемент по заданному селектору
// JSON.parse() - превращает строку в обьект
// JSON.stringify() -  разбирает обьект и превращает его в строку для java скрипта(формат файла передается по сети)
