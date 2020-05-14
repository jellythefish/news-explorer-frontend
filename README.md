# News Explorer

[![version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/jellythefish/news-explorer-frontend/tree/v1.0.0) [![node version](https://img.shields.io/badge/node-12.16.2-green.svg)](https://nodejs.org/en/) [![npm version](https://img.shields.io/badge/npm-6.14.4-red.svg)](https://nodejs.org/en/) [![npm version](https://img.shields.io/badge/build-passing-green.svg)]()

https://jellythefish.github.io/news-explorer-frontend

## Содержание

* [О проекте](#about)
* [Установка](#install)
	* [Клонирование репозитория](#clone)
	*  [Установка зависимостей](#dep)
* [Запуск приложения](#run)
* [(Для ревьювера)](#review)
	* [Тестирование верстки](#test)
		* [Всплывающие окна](#popup)
		* [Блоки поиска](#search)
		* [Кнопки в шапке](#header)
		* [Кнопка в popup регистрации, логина:](#button)
  * [Комментарии по реализации](#comments)
    * [Комментарии по поводу hidden/is-opened, hidden/visible, enabled/disabled](#comment1)
    * [Комментарии по поводу скрытия текста в карточке](#comment2)

## <a name='about'></a>О проекте
Данный проект был выполнен в рамках дипломной работы курса Яндекс.Практикума и содержит следующий стек технологий:
`HTML/CSS`, `JavaScript`, `Node.js`, `Webpack`.

Веб-приложение **News Explorer** реализовывает сервис поиска новостей из различных источников по ключевым словам. Данное приложение основывается на сервисе [*NewsAPI*](https://newsapi.org/), который агрегирует новости по запросу со множества источников и возвращает их в виде структурированного JSON файла. 
В веб-приложении присутствует возможность регистрации аккаунта, а также сохранении результатов поиска новостей в раздел "Сохранненые статьи".

##  <a name='install'></a>Установка

### <a name='clone'></a>Клонирование репозитория

1. Скопируйте репозиторий с помощью команды:

   ```bash
   git clone https://github.com/jellythefish/news-explorer-frontend
   ```

2. Если в вашей операционной системы не установлен Node.js, то требуется его установить. Скачать можно по ссылке:
   ```
   https://nodejs.org/en/download/
   ```
   Рекомендуется установить самую последнюю версию.

###  <a name='dep'></a>Установка зависимостей

1. Перейдите в папку с проектом news-explorer-frontend:

   ```bash
   cd news-explorer-frontend
   
   # для этапа разработки нужно перейти в ветку level-2 коммандой
   git checkout level-2
   ```

2. Установите требуемые зависимости с помощью команды:

   ```bash
   npm install
   ```



## <a name='run'></a>Запуск приложения

1. Соберите приложение из исходников с помощью команды:

   ```bash
   npm run build
   ```

   Все собранные файлы будут храниться в папке **dist**.

2. Для запуска локального веб-сервера, на котором будет размещено приложение, вызовите команду в той же директории news-explorer-frontend:

   ```bash
    npm run dev
   ```

   Окно с приложением откроется автоматически.

##  <a name='review'></a>(Для ревьювера)
###  <a name='test'></a>Тестирование верстки
####  <a name='popup'></a>Всплывающие окна
Существует 4 вида всплывавающих окон в проекте, открытие-закрытие которых на данном этапе реализовано с помощью добавления модификаторов. Чтобы сейчас их открыть, нужно добавить модификаторы вручную в следующих местах (в дальнейшем это планируется все автоматизировать с помощью js):
1. **Окно авторизации**:
    `<div class="popup popup_hidden js-popup-sign-in">`
    меняется на
    `<div class="popup popup_is-opened js-popup-sign-in">`
2. **Окно регистрации**:
    `<div class="popup popup_hidden js-popup-sign-up">`
    меняется на
    `<div class="popup popup_is-opened js-popup-sign-up">`
3. **Окно успешной регистрации**:
    `<div class="popup popup_hidden js-popup-success">`
    меняется на
    `<div class="popup popup_is-opened js-popup-success">`
4. **Меню на маленьких разрешениях экрана**:
  Необходимо сжать размеры окна до размеров не более чем 620px, затем
 `<div class="header__popup header__popup_hidden">`  
    меняется на
    `<div class="header__popup header__popup_visible">`

На странице "Сохранненые статьи" действия аналогичные.

#### <a name='search'></a>Блоки поиска
**Блок с карточками** можно скрыть:
`<div class="results__container results__container_visible">`
меняется на
`<div class="results__container results__container_hidden">`
Далее, можно отобразить различные варианты поиска, реализованные из макета.
**Прелоудер:**
`<div class="results__preloading results__preloading_hidden">`
менятся на
`<div class="results__preloading results__preloading_visible">`
**Не найдено:**
`<div class="results__not-found results__not-found_hidden">`
меняется на
`<div class="results__not-found results__not-found_visible">`

####  <a name='header'></a>Кнопки в шапке
Различные состояния кнопок (цвет, подчеркивание, цвет иконки) реализованы с помощью модификаторов:
`_selected-white`, `_text-white`, `_border-white`, `_border-black`, `_text-black`, `_text-gray`, `_border-black`,
`_selected-black`.
Модификаторы уже настроены на корректное отображение в зависимости от страницы.
Различные состояния шапки можно регулировать с помощью модификаторов, которые отвечают за свойство display:
1. **У ссылки**:
`<div class="header__link-wrapper_normal header__link-wrapper_visible">`
меняется на
`<div class="header__link-wrapper_normal header__link-wrapper_hidden">`
2. **У кнопки** (авторизация/или выйти из аккаунта):
`<button class="header__button ... header__button_hidden">Авторизоваться</button>`
меняется на
`<button class="header__button ... header__button_visible">Авторизоваться</button>`
ИЛИ
`<div class="header__button ... header__button_hidden">`
меняется на
`<div class="header__button ... header__button_visible">`
Во всплывающем меня header__popup (меню при маленьких разрешениях экрана) и на странице Сохраненные страницы действия аналогичные.

####  <a name='button'></a>Кнопка в popup регистрации, логина:
Ее стили можно менять с помощью замены
`<button type="submit" class="button popup__button popup__button_enabled js-submit-sign-up">...</button>`
на
`<button type="submit" class="button popup__button popup__button_disabled js-submit-sign-up">...</button>`

###  <a name='comments'></a>Комментарии

#### <a name='comment1'></a>Комментарии по поводу hidden/is-opened, hidden/visible, enabled/disabled:
Может возникнуть вопрос, зачем нужен hidden, если уже есть is-opened/visible? Eсли определять display: flex в основном объекте, а в модификаторе _hidden определять display: none, то это не будет работать, так как порядок импорта .block (import url(block__elem)) -> .block__elem(import url(block__elem_modificator)) не будет позволять переопределять свойство display в модификаторе, а импортировать разом все модификаторы и элементы в один css блока сбивают структуру. Поэтому был выбран подход hidden/is-opened, hidden/visible.
#### <a name='comment2'></a>Комментарии по поводу скрытия текста в карточке:
Единственным разумным вариантом скрытия текста карточки был вариант:
```
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;  
  overflow: hidden;
```
Но он предполагает наличие overflow: hidden, без него работать не будет. А он запрещен везде в проекте. Поэтому был выбран подход overflow: auto, который не запрещен и который предполагает вертикальный скролл только текста, который также не запрещен.
