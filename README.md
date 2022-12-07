# Core Vision

### Cервис для визуализации образовательной программы в виде графа

<p align="center">
    <a href="https://github.com/dademon333/CoreVision/actions/workflows/tests.yaml" target="_blank">
        <img src="https://github.com/dademon333/CoreVision/actions/workflows/tests.yaml/badge.svg" alt="Tests">
    </a>
    <a href="https://codecov.io/gh/dademon333/CoreVision" target="_blank">
        <img src="https://codecov.io/gh/dademon333/CoreVision/branch/master/graph/badge.svg?token=23HZLHIQU5"/> 
    </a>
    <a href="https://www.python.org/downloads/release/python-3110/" target="_blank">
        <img src="https://img.shields.io/badge/python-3.11-blue.svg" alt="Supported Python versions">
    </a>
</p>

---

## Немного описания
В эпоху бесчисленных онлайн курсов и широчайших возможностей дистанционного образования
на первый план выходит не доступ к информации как таковой, а эффективный поиск и организация ее усвоения.

В связи с этим хочется особенно выделить две проблемы:  
Во-первых, частое отсутствие цели - изучая предмет в вузе, студенты не видят связи между ним и компетенциями,
котирующимися на рынке труда. А иногда не видят и связи между разделами самого предмета.
С другой стороны, специалисты, повышающие свою квалификацию или меняющие профессию,
хорошо представляют требования рынка, но испытывают трудности с построением образовательного плана и выбора курсов.

При этом точные науки, изучаемые в рамках университетской программы, имеют четкую внутреннюю структуру и взаимосвязи,
но, из-за ограниченности традиционного формата и подходов, этот аспект остается недоступен большинству слушателей.  
Мы создаем образовательную платформу, сердцем которой будет граф знаний, отражающий взаимосвязи между разделами дисциплин.
Наша основная цель - помощь в построении индивидуальной образовательной траектории. Траектория, в нашем понимании, - 
это последовательность узлов графа, на каждом из которых расположены конкретные тематические учебные материалы.


## Техническая часть

## Deploy

Весь проект обмазан контейнерами (даже сборка фронтенда), поэтому деплой максимально прост:

1. Настраиваем переменные окружения:  
  В корне проекта (рядом с docker-compose.yaml) создаем файл .env и заполняем его следующими значениями:
  * `COMPOSE_PROJECT_NAME` - Имя проекта для docker, будет использоваться 
     как приставка для названий контейнеров и всего остального
  * `APP_REPLICAS` - количество application контейнеров (вертикальное масштабирование)

  * `POSTGRESQL_USER` - имя пользователя postgres
  * `POSTGRESQL_PASSWORD` - пароль от postgres
  * `POSTGRESQL_DATABASE` - название базы данных в postgres

  * `REDIS_HOST` - адрес redis, достижимый из других контейнеров -
  название сервиса с redis. Вставляем 'redis'
  * `DOCKER_POSTGRESQL_HOST` - адрес postgres, достижимый из других контейнеров -
  название сервиса с postgres. Вставляем 'postgres'
  * `DEFAULT_POSTGRESQL_HOST` - адрес postgres вне контейнеров, вставляем 'localhost'
  * `DEBUG` - переключатель режима разработки, True/False
  * `BACKGROUND_WORKERS_DEBUG` - то же самое, но отдельно для background_workers
(чтобы не спамили логами sql запросов)

2. Устанавливаем docker, docker-compose, python (желательно 3.10), с помощью pip прикручиваем alembic
3. Собираем образы и запускаем postgres:  
`docker-compose build && docker-compose up -d postgres`
4. Переходим в папку backend и загружаем чистую базу данных из миграций:  
`cd backend && alembic upgrade head`  
(ну или из дампа, если имеется)
5. Возвращаемся в корневой каталог и запускаем все остальные сервисы:  
`docker-compose up -d`

## Обновление на сервере

Как было сказано, весь проект обмазан контейнерами.
Поэтому и обновление не вызовет особых трудностей

1. Загружаем коммиты:  
`git pull`  
2. Если есть новые миграции бд - скармливаем постгресу:  
`cd backend && alembic upgrade head`  
3. Пересобираем изображения и перезапускаем сервисы:  
`docker-compose build && docker-compose up -d`  

Всё. ¯\\_(ツ)_/¯