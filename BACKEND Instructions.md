Backend-сервер принимает подключения по адресу:
    http://localhost:5000/api/

Для первоначального запуска backend-сервера и БД из корневого каталога проекта выполнить команду:
    $ docker-compose up --build
Также эту команду необходимо выполнять при проблемах с запуском стабильно работающего backend-сервера,
возникших после скачивания обновлений из репозитория. Эта необходимость возникает при изменении зависимостей в 
package.json backend-сервера. Она решается повторной сборкой образов (--build), которые запускаются в контейнерах.

Если обновления не скачивались и  backend-сервер работает стабильно,
для его запуска достаточно выполнить команду:
    $ docker-compose up -d
При этом сервер останется активным несмотря на то, что консоль терминала будет готова принимать новые команды.

При возникновении проблем с запуском сервера для первоначальной диагностики нужно использовать команду:
$ docker-compose up
Она команда выводит логи в терминал.

Для остановки сервера нужно выполнить команду:
    $ docker-compose down

    Устранение ошибок, возникающих при запуске backend-сервера
------------------------------------------------------------------------------------------------------------------------
1.
Attaching to postgres-dev_container
Error response from daemon: driver failed programming external connectivity on endpoint postgres-dev_container (3c196c092f901ce854fc2a509627e252a061986a8f14edd4a747da3dd7a554c8): Bind for 0.0.0.0:5432 failed: port is already allocated
Эта ошибка означает, что порт, на котором работает база данных, уже занят.
Скорее всего, это произошло из-за некорректной остановки сервера.
Чтобы устранить эту проблему, нужно определить CONTAINER ID сервиса, который занял нужный порт (5432), выполнив команду
    $ docker ps

CONTAINER ID   IMAGE                      COMMAND                  CREATED       STATUS       PORTS                    NAMES
88ff7de6248c   cryptos-backend            "docker-entrypoint.s…"   4 hours ago   Up 4 hours   0.0.0.0:5000->5000/tcp   nestjs_api
d6743d8a4469   adminer                    "entrypoint.sh php -…"   4 hours ago   Up 4 hours   0.0.0.0:8888->8080/tcp   cryptos-adminer-1
671d4c218472   postgres:15.3-alpine3.18   "docker-entrypoint.s…"   4 hours ago   Up 4 hours   0.0.0.0:5432->5432/tcp   postgres_cryptos_container

А затем остановить этот контейнер с помощью команды:
    $ docker stop {CONTAINER ID}

После этого нужно перезапустить сервисы командой:
    $ docker-compose up
------------------------------------------------------------------------------------------------------------------------

Для принудительного опроса внешнего API для заполнения БД необходимо перейти по адресу:/
    http://localhost:5000/api/articles/fetch

Для просмотра содержимого БД и ручной корректировки данных можно использовать браузерный клиент Adminer,
который стартует одновременно с Backend при выполнении команды docker-compose up.
Adminer доступен по адресу:
    http://localhost:8888/

    Для подключения к БД нужно использовать следующие значения:
Движок              PostgreSQL
Сервер              postgres_server
Имя пользователя    crypto
Пароль              crypto_password
База данных         cryptos
========================================================================================================================
                                        !!!!!!!!!!Устарело!!!!!!!!!!!!!
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