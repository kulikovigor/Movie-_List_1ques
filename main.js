const films = [];

// поле, данные инпута
const newMovieInputNode = document.querySelector('.js-new-movie-input');
// конпка добавления
const addBtn = document.querySelector('.js-addBtn');
// лист список данных(фильмы)
const listFilmsNode = document.querySelector('.js-list-films');


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
};

// получаем нов.фильм от пользователя с id и названием
function getFilmFromUser () {
    const title = newMovieInputNode.value;
    return {
        id: Date.now(),
        title: title,
    };
}

// добавляем, пушим фильм и его id
function addFilm({title, id}) {
    films.push({
        title,
        id
    });
}

function getFilms(){
    return films;
}

// выводим в список нов.фильм и добавляем элементы в HTML
function renderFilms () {
    const films = getFilms();
    

    let filmsHTML = '';

    films.forEach(film => {
        filmsHTML += `<li id=${film.id}>
        <button type="button" class="movie__list_btn" data-action="clicked"></button>
        <span class="movie__list_name">${film.title}</span>
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
    }
}


function markFilm (event) {
    if (event.target.dataset.action === 'clicked') {
        const parentNode = event.target.closest('li');

        const filmBtnClicked = parentNode.querySelector('.movie__list_btn');
        filmBtnClicked.classList.toggle('movie__list_btn_clicked');

        const filmTitleMark = parentNode.querySelector('.movie__list_name')
        filmTitleMark.classList.toggle('movie__list_name_mark');
}
}

// обработчик для удаления фильма
listFilmsNode.addEventListener('click', deleteFilm);
// обработчик для добавления фильма
addBtn.addEventListener('click', addAllDataFilm);
// обработчик для отметки, зачеркивания фильма
addBtn.addEventListener('click', markFilm);


// e.target - элемент, на котором произошло определенное событие, в данном случае - клик
//closest() - этот метод ищет ближайший родительский элемент по заданному селектору