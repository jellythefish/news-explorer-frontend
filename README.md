# News Explorer

[![version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/jellythefish/news-explorer-frontend/tree/v1.0.0) [![node version](https://img.shields.io/badge/node-12.16.2-green.svg)](https://nodejs.org/en/) [![npm version](https://img.shields.io/badge/npm-6.14.4-red.svg)](https://nodejs.org/en/) [![npm version](https://img.shields.io/badge/build-passing-green.svg)]()

https://www.the-news-explorer.tk/

## Содержание

* [О проекте](#about)
* [Установка](#install)
	* [Клонирование репозитория](#clone)
	*  [Установка зависимостей](#dep)
* [Запуск приложения](#run)

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
