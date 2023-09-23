========================================================================================================================

        Инструкция по установке и настройке NestJS

1. Устанавливаем зависимости NestJS CLI, находясь в корневой папке проекта.
$ npm i
2. Переходим в папку, в которой хранятся файлы NestJS, и все остальные действия выполняем, находясь в ней.
$ cd ./backend
3. Устанавливаем зависимости backend-сервера, перечисленные в его package.json
$ npm i
4. Запускаем Docker Desktop.
5. Выполняем в терминале команду, которая создаёт Docker-контейнер с БД Postgres.
$ docker-compose up -d
6. Создаём в БД таблицы с помощью скрипта, используя возможности NestJS 
$ npm run mg:run
7. Выполняем запуск backend-сервера NestJS
$ npm run dev

========================================================================================================================
Результат успешного запуска должен выглядеть так:
PS H:\WebDev\CryptosTest\backend> npm run dev

> backend@0.0.1 dev
> nodemon

[nodemon] 3.0.1
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): src\**\*
[nodemon] watching extensions: ts
[nodemon] starting `ts-node -r tsconfig-paths/register src/main.ts --IS_TS_NODE=true`
[Nest] 4604  - 23.09.2023, 19:27:43     LOG [NestFactory] Starting Nest application...
[Nest] 4604  - 23.09.2023, 19:27:43     LOG [InstanceLoader] DiscoveryModule dependencies initialized +10ms
[Nest] 4604  - 23.09.2023, 19:27:43     LOG [InstanceLoader] ConfigHostModule dependencies initialized +0ms
[Nest] 4604  - 23.09.2023, 19:27:43     LOG [InstanceLoader] AppModule dependencies initialized +1ms
[Nest] 4604  - 23.09.2023, 19:27:43     LOG [InstanceLoader] ScheduleModule dependencies initialized +0ms
[Nest] 4604  - 23.09.2023, 19:27:43     LOG [InstanceLoader] ConfigModule dependencies initialized +0ms
[Nest] 4604  - 23.09.2023, 19:27:43     LOG [InstanceLoader] DatabaseModule dependencies initialized +340ms
[Nest] 4604  - 23.09.2023, 19:27:43     LOG [InstanceLoader] ArticleModule dependencies initialized +0ms
[Nest] 4604  - 23.09.2023, 19:27:43     LOG [RoutesResolver] AppController {/api}: +32ms
[Nest] 4604  - 23.09.2023, 19:27:43     LOG [RouterExplorer] Mapped {/api, GET} route +3ms
[Nest] 4604  - 23.09.2023, 19:27:43     LOG [RoutesResolver] ArticleController {/api}: +1ms
[Nest] 4604  - 23.09.2023, 19:27:43     LOG [RouterExplorer] Mapped {/api/articles, GET} route +0ms
[Nest] 4604  - 23.09.2023, 19:27:43     LOG [NestApplication] Nest application successfully started +11ms

========================================================================================================================
        
        Настройка подключения к БД

Для подключения к БД Postgres можно использовать любой клиент.
Настройки подключения к БД хранятся здесь: backend/.env

========================================================================================================================

        Повторный запуск Backend-сервера

Для повторного запуска сервера достаточно запустить Docker Desktop (если он ещё не запущен),
а потом выполнить npm-скрипт, находясь в корневой папке проекта:
$ npm run back

========================================================================================================================

        Описание функционала

В настоящий момент сервер умеет только опрашивать сторонний API в начале пятой минуты каждого часа и сохранять полученные данные в локальную БД.
При каждом сохранении данных в БД в терминале выводится сообщение:
    Store articles

Принудительно вызвать обращение к стороннему API и сохранение полученных данных в локальную базу можно с помощью 
браузера, выполнив переход по адресу
    http://localhost:3000/api/articles