// ошибки для фильмов
const NO_SAVED_FILMS_ERROR_TEXT = 'У вас нет сохраненных фильмов';
const INVALID_DATA_FILM_CREATE_ERROR_TEXT = 'Переданы некорректные данные при создании фильма';
const FILMS_NOT_FOUND_ERROR_TEXT = 'Невозможно найти фильм';
const FILMS_INVALID_ID_ERROR_TEXT = 'Передан некорректный id фильма';
const INVALID_OWNER_DELETE_FILM_ERROR_TEXT = 'Сожалеем, но чужой фильм удалить нельзя';
const INVALID_FILMS_ID_NOT_FOUND_TEXT = 'Невозможно найти фильм по указанному id';
// ошибки для пользователей
const USER_ALREADY_EXISTS_ERROR_TEXT = 'Пользователь с такой почтой уже зарегистрирован';
const USER_INVALID_DATA_ERROR_TEXT = 'Переданы некорректные данные при создании пользователя';
const USER_INVALID_DATA_UPDATE_ERROR_TEXT = 'Переданы некорректные данные при обновлении пользователя';
const USER_NOT_FOUND_ERROR_TEXT = 'Невозможно найти пользователя с указанным id';
// ошибки для всего остального
const AUTHORIZATION_ERROR_TEXT = 'Необходима авторизация';
const SERVER_ERROR_TEXT = 'На сервере произошла непредвиденная ошибка';
const INVALID_LINK_ERROR_TEXT = 'Ссылка указана в неправильном формате';
const INVALID_MIN_LENGTH_ERROR_TEXT = 'Длина должна быть не меньше двух символов';
const INVALID_MAX_LENGTH_ERROR_TEXT = 'Длина должна быть не больше 30 символов';
const INVALID_EMAIL_ERROR_TEXT = 'Неправильный формат почты';
const INVALID_EMAIL_OR_PASSWORD_ERROR_TEXT = 'Неправильные почта или пароль';
const INVALID_PATH_ERROR_TEXT = 'Упс, такой страницы не существует';

module.exports = {
  NO_SAVED_FILMS_ERROR_TEXT,
  INVALID_DATA_FILM_CREATE_ERROR_TEXT,
  FILMS_NOT_FOUND_ERROR_TEXT,
  FILMS_INVALID_ID_ERROR_TEXT,
  INVALID_OWNER_DELETE_FILM_ERROR_TEXT,
  INVALID_FILMS_ID_NOT_FOUND_TEXT,
  USER_ALREADY_EXISTS_ERROR_TEXT,
  USER_INVALID_DATA_ERROR_TEXT,
  USER_INVALID_DATA_UPDATE_ERROR_TEXT,
  USER_NOT_FOUND_ERROR_TEXT,
  AUTHORIZATION_ERROR_TEXT,
  SERVER_ERROR_TEXT,
  INVALID_LINK_ERROR_TEXT,
  INVALID_MIN_LENGTH_ERROR_TEXT,
  INVALID_MAX_LENGTH_ERROR_TEXT,
  INVALID_EMAIL_ERROR_TEXT,
  INVALID_EMAIL_OR_PASSWORD_ERROR_TEXT,
  INVALID_PATH_ERROR_TEXT,
};
