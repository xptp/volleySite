import { useState, useCallback } from 'react'

const API_BASE = import.meta.env.VITE_API_URL || ''

const digitsOnly = (str) => (str.replace(/\D/g, '') || '')
const isValidPhone = (phone) => {
  const digits = digitsOnly(phone)
  if (digits.length < 10) return false
  const d = digits.length === 11 && (digits[0] === '7' || digits[0] === '8') ? digits.slice(1) : digits
  return d.length === 10 && /^[789]/.test(d)
}

function CallbackButton() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [nameError, setNameError] = useState('')
  const [phoneError, setPhoneError] = useState('')

  const sendToTelegram = useCallback(async (userName, phoneNumber) => {
    const res = await fetch(`${API_BASE}/api/send-callback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: userName, phone: phoneNumber }),
    })
    if (!res.ok) throw new Error('Send failed')
  }, [])

  const handlePhoneChange = useCallback((e) => {
    const v = e.target.value
    if (digitsOnly(v).length > 11) return
    if (v === '' || /^\+?[\d\s\-()]*$/.test(v)) {
      setPhone(v)
      setPhoneError('')
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setNameError('')
    setPhoneError('')
    const trimmedName = name.trim()
    const trimmedPhone = phone.trim()

    let hasError = false
    if (!trimmedName) {
      setNameError('Введите имя')
      hasError = true
    }
    if (!trimmedPhone) {
      setPhoneError('Введите номер телефона')
      hasError = true
    } else if (!isValidPhone(trimmedPhone)) {
      setPhoneError('Только цифры, 10–11 цифр')
      hasError = true
    }
    if (hasError) return

    setStatus('sending')
    try {
      await sendToTelegram(trimmedName, trimmedPhone)
      setStatus('success')
      setName('')
      setPhone('')
      setTimeout(() => {
        setOpen(false)
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
            <p className="callback-modal__text">Наш менеджер с вами свяжется</p>

            {status === 'success' && (
              <p className="callback-modal__message callback-modal__message--success">Заявка отправлена!</p>
            )}
            {status === 'error' && (
              <p className="callback-modal__message callback-modal__message--error">Ошибка, попробуйте позже</p>
            )}

            {(status === 'idle' || status === 'sending') && (
              <form className="callback-modal__form" onSubmit={handleSubmit}>
                <div className={`callback-modal__field ${nameError ? 'callback-modal__field--error' : ''}`}>
                  <input
                    type="text"
                    className="callback-modal__input"
                    placeholder="Ваше имя *"
                    value={name}
                    onChange={(e) => { setName(e.target.value); setNameError('') }}
                    disabled={status === 'sending'}
                    autoComplete="name"
                  />
                  <span className="callback-modal__field-error-wrap">
                    {nameError && <span className="callback-modal__field-error">{nameError}</span>}
                  </span>
                </div>
                <div className={`callback-modal__field ${phoneError ? 'callback-modal__field--error' : ''}`}>
                  <input
                    type="tel"
                    className="callback-modal__input"
                    placeholder="+7 (000) 000-00-00 *"
                    value={phone}
                    onChange={handlePhoneChange}
                    disabled={status === 'sending'}
                    autoComplete="tel"
                    inputMode="numeric"
                  />
                  <span className="callback-modal__field-error-wrap">
                    {phoneError && <span className="callback-modal__field-error">{phoneError}</span>}
                  </span>
                </div>
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
