import { useState, useCallback } from 'react'

const TELEGRAM_BOT_TOKEN = '8003451463:AAFMXrYIf8ys88A9Yk_Vv3MdTp0KWijZvqk'
const TELEGRAM_CHAT_ID = '1312223574'

function CallbackButton() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const sendToTelegram = useCallback(async (userName, phoneNumber) => {
    const text = `📞 Заявка на звонок! Имя: ${userName}, Номер: ${phoneNumber}`
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
      }),
    })
    if (!res.ok) throw new Error('Send failed')
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const trimmedPhone = phone.trim()
    const trimmedName = name.trim()
    if (!trimmedPhone) return
    setStatus('sending')
    try {
      await sendToTelegram(trimmedName || '—', trimmedPhone)
      setStatus('success')
      setTimeout(() => {
        setOpen(false)
        setName('')
        setPhone('')
        setStatus('idle')
      }, 2000)
    } catch {
      setStatus('error')
    }
  }

  const handleClose = useCallback(() => {
    if (status === 'sending') return
    setOpen(false)
    setName('')
    setPhone('')
    setStatus('idle')
  }, [status])

  return (
    <>
      <button
        type="button"
        className="callback-btn"
        onClick={() => setOpen(true)}
        aria-label="Заказать звонок"
      >
        <span className="callback-btn__icon" aria-hidden="true">
  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
  </svg>
</span>
      </button>

      {open && (
        <div className="callback-overlay" onClick={handleClose} role="dialog" aria-modal="true" aria-labelledby="callback-title">
          <div className="callback-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="callback-modal__close"
              onClick={handleClose}
              aria-label="Закрыть"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </button>
            <h2 id="callback-title" className="callback-modal__title">ОСТАВЬТЕ СВОЙ НОМЕР ТЕЛЕФОНА!</h2>
            <p className="callback-modal__text">Наш менеджер перезвонит в течение 15 минут</p>

            {status === 'success' && (
              <p className="callback-modal__message callback-modal__message--success">Заявка отправлена!</p>
            )}
            {status === 'error' && (
              <p className="callback-modal__message callback-modal__message--error">Ошибка, попробуйте позже</p>
            )}

            {(status === 'idle' || status === 'sending') && (
              <form className="callback-modal__form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="callback-modal__input"
                  placeholder="Ваше имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={status === 'sending'}
                  autoComplete="name"
                />
                <input
                  type="tel"
                  className="callback-modal__input"
                  placeholder="+7 (000) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={status === 'sending'}
                  autoComplete="tel"
                />
                <button
                  type="submit"
                  className="callback-modal__submit"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? 'Отправка...' : 'ЕСТЬ ВОПРОС!'}
                </button>
              </form>
            )}

            <p className="callback-modal__or">ИЛИ ПОЗВОНИТЕ САМИ!</p>
            <a href="tel:+79885644810" className="callback-modal__phone">+7 988 564 48 10</a>
          </div>
        </div>
      )}
    </>
  )
}

export default CallbackButton
