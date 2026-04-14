import os
import requests
from flask import Flask, request, jsonify
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

TELEGRAM_BOT_TOKEN = os.environ.get('TELEGRAM_BOT_TOKEN')
TELEGRAM_CHAT_ID = os.environ.get('TELEGRAM_CHAT_ID')

# флаг выключения отправки заявок

def env_flag(name: str, default: bool = True) -> bool:
    v = os.environ.get(name)
    if v is None:
        return default
    return v.strip().lower() in {'1', 'true', 'yes', 'y', 'on'}


SUBMISSIONS_ENABLED = env_flag('SUBMISSIONS_ENABLED', True)


def send_telegram_message(text: str) -> bool:
    if not TELEGRAM_BOT_TOKEN or not TELEGRAM_CHAT_ID:
        return False
    url = f'https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage'
    resp = requests.post(
        url,
        json={'chat_id': TELEGRAM_CHAT_ID, 'text': text},
        timeout=10,
    )
    return resp.ok


@app.route('/api/send-callback', methods=['POST'])
def send_callback():
    # если флаг выключения отправки заявок, то возвращаем ошибку
    if not SUBMISSIONS_ENABLED:
        return jsonify({'error': 'Submissions are temporarily disabled'}), 503

    if request.content_type != 'application/json':
        return jsonify({'error': 'Content-Type must be application/json'}), 400

    data = request.get_json()
    if not data:
        return jsonify({'error': 'Invalid JSON'}), 400

    name = (data.get('name') or '').strip() or '—'
    phone = (data.get('phone') or '').strip()
    if not phone:
        return jsonify({'error': 'Phone is required'}), 400

    text = f'📞 Заявка на звонок! Имя: {name}, Телефон: {phone}'
    if send_telegram_message(text):
        return jsonify({'ok': True}), 200
    return jsonify({'error': 'Failed to send to Telegram'}), 500


@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=os.environ.get('FLASK_DEBUG', '0') == '1')
