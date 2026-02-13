# TesS

Проект состоит из фронтенда и бэкенда.

## Структура

- **frontend/** — React (Vite) приложение. Запуск: `cd frontend && npm install && npm run dev`
- **backend/** — Python (Flask) API для отправки заявок в Telegram. Инструкции в `backend/README.md`

## Разработка

1. Бэкенд: `cd backend`, создать `.env` из `.env.example`, `pip install -r requirements.txt`, `python app.py`
2. Фронтенд: `cd frontend`, `npm run dev` (прокси `/api` → `http://localhost:5000`)
