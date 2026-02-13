# Backend (отправка заявок в Telegram)

Сервис принимает заявки с фронтенда и пересылает их в Telegram-бота. Данные бота хранятся только на сервере в `.env`.

## Установка

```bash
cd backend
python -m venv venv
# Windows:
venv\Scripts\activate
# Linux/macOS:
# source venv/bin/activate
pip install -r requirements.txt
```

## Настройка

Скопируйте `.env.example` в `.env` и заполните:

```bash
cp .env.example .env
```

В `.env` укажите:

- `TELEGRAM_BOT_TOKEN` — токен бота от @BotFather
- `TELEGRAM_CHAT_ID` — ID чата, куда слать сообщения

## Запуск

```bash
python app.py
```

Сервер будет доступен на `http://localhost:5000`.

## API

- `POST /api/send-callback` — принять заявку на звонок.  
  Тело: `{ "name": "Имя", "phone": "+7 ..." }`.  
  Ответ: `200 { "ok": true }` или ошибка 4xx/5xx.

- `GET /health` — проверка работы сервера.

## Деплой

На сервере создайте `.env` с `TELEGRAM_BOT_TOKEN` и `TELEGRAM_CHAT_ID`. Запускайте через gunicorn/uWSGI или как сервис. Файл `.env` не должен попадать в git.
