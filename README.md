# -TaskFlow-Studio-REST-API-Task-Manager
Современный и компактный RESTful сервис для управления задачами, написанный на FastAPI, SQLAlchemy 2.0 и Pydantic V2. В проект входит полноценный клиентский веб-интерфейс на HTML, JavaScript и Tailwind CSS.

---

## 🛠 Технологический стек

* **Backend:** Python 3.12, FastAPI, SQLAlchemy 2.0 (Declarative Base), Pydantic V2, Uvicorn
* **Database:** SQLite
* **Frontend:** HTML5, JavaScript (Fetch API, Async/Await), Tailwind CSS

---

## 📁 Структура проекта

* **database.py** — Подключение к БД, сессии и ORM-модель SQLAlchemy
* **schemas.py** — Pydantic-схемы для валидации запросов и ответов
* **main.py** — Инициализация FastAPI, CORS и REST API маршруты
* **index.html** — Главный документ веб-интерфейса
* **style.css** — Кастомные стили и конфигурация темы
* **script.js** — Асинхронная логика работы с API на стороне клиента
* **requirements.txt** — Зависимости Python-окружения

---

## ⚙️ Инструкция по локальному запуску

### 1. Клонирование репозитория
git clone https://github.com/ssanaprivet748-bot/-TaskFlow-Studio-REST-API-Task-Manager.git

cd taskflow-studio

### 2. Создание и активация виртуального окружения

Windows (PowerShell):
python -m venv venv
.\venv\Scripts\Activate.ps1

Windows (CMD):
python -m venv venv
.\venv\Scripts\activate.bat

Linux / macOS:
python3 -m venv venv
source venv/bin/activate

### 3. Установка зависимостей
pip install -r requirements.txt

### 4. Запуск бэкенда
python main.py

* Бэкенд заводится по адресу: http://127.0.0.1:8000
* Интерактивная документация Swagger UI: http://127.0.0.1:8000/docs

### 5. Запуск фронтенда
Открой файл index.html в любом браузере (или запусти через расширение Live Server в VS Code).

---

## 🔌 API Эндпоинты

| Метод | Эндпоинт | Статус | Описание |
| :--- | :--- | :--- | :--- |
| GET | /tasks | 200 OK | Получить список всех задач |
| POST | /tasks | 201 Created | Создать новую задачу |
| PATCH | /tasks/{task_id} | 200 OK | Частично обновить задачу (статус, приоритет, текст) |
| DELETE | /tasks/{task_id} | 204 No Content | Удалить задачу по ее ID |
