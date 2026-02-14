import { Link } from 'react-router-dom'
import { useState, useEffect, useRef, useCallback } from 'react';
import useInView from '../../hooks/useInView';
import Camp2025DatesPrices from './Camp2025DatesPrices';
import Social from '../../social';

const API_BASE = import.meta.env.VITE_API_URL || ''

const YANDEX_MAP_SCRIPT =
  'https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3Ab2822b0ab84a6008a80c6734ace1e5e6c89605e7d12fe0b328123004260dd98d&amp;width=800&amp;height=450&amp;lang=ru_RU&amp;scroll=true'

const GALLERY_IMAGES = [
  '/images/gallery/1.webp?w=600',
  '/images/gallery/2.webp?w=600',
  '/images/gallery/3.webp?w=600',
  '/images/gallery/4.webp?w=600',
  '/images/gallery/5.webp?w=600',
  '/images/gallery/6.webp?w=600',
  '/images/gallery/7.webp?w=600',
  '/images/gallery/8.webp?w=600',
  '/images/gallery/9.webp?w=600',
  '/images/gallery/10.webp?w=600',
  '/images/gallery/11.webp?w=600',
  '/images/gallery/12.webp?w=600',
  '/images/gallery/13.webp?w=600',
  '/images/gallery/14.webp?w=600',
  '/images/gallery/15.webp?w=600',
  '/images/gallery/16.webp?w=600',
  '/images/gallery/17.webp?w=600',
  '/images/gallery/18.webp?w=600',
  '/images/gallery/19.webp?w=600',
  '/images/gallery/20.webp?w=600',
  '/images/gallery/21.webp?w=600',
  '/images/gallery/22.webp?w=600',
  '/images/gallery/23.webp?w=600',
  '/images/gallery/24.webp?w=600',
  '/images/gallery/25.webp?w=600',
  '/images/gallery/26.webp?w=600',
  '/images/gallery/27.webp?w=600',
  '/images/gallery/28.webp?w=600',
  '/images/gallery/29.webp?w=600',
  '/images/gallery/30.webp?w=600',
  '/images/gallery/31.webp?w=600',
  '/images/gallery/32.webp?w=600',
  '/images/gallery/33.webp?w=600',
  '/images/gallery/34.webp?w=600',
  '/images/gallery/35.webp?w=600',
  '/images/gallery/36.webp?w=600',
];

function Camp2025Page() {
  const [galleryScroll, setGalleryScroll] = useState(0);
  const [galleryPaused, setGalleryPaused] = useState(false);
  const [galleryDragging, setGalleryDragging] = useState(false);
  const galleryTrackRef = useRef(null);
  const galleryLoopWidthRef = useRef(0);
  const galleryDragStart = useRef({ x: 0, offset: 0 });
  const galleryRafRef = useRef(null);
  const galleryLastTimeRef = useRef(null);

  const [heroRef, heroInView] = useInView({ threshold: 0.15 });
  const [textRef, textInView] = useInView({ threshold: 0.15 });
  const [whyRef, whyInView] = useInView({ threshold: 0.1 });
  const [galleryRef, galleryInView] = useInView({ threshold: 0.1 });
  const [trainersRef, trainersInView] = useInView({ threshold: 0.1 });
  const [pricesRef, pricesInView] = useInView({ threshold: 0.1 });
  const [aboutRef, aboutInView] = useInView({ threshold: 0.1 });
  const [formRef, formInView] = useInView({ threshold: 0.1 });
  const [mapRef, mapInView] = useInView({ threshold: 0.1 });
  const [contactsRef, contactsInView] = useInView({ threshold: 0.2 });

  const mapContainerRef = useRef(null)

 
  useEffect(() => {
    const hash = window.location.hash
    if (hash !== '#map' && hash !== '#form') return
    const el = document.getElementById(hash.slice(1))
    if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100)
  }, [])

  useEffect(() => {
    if (!mapContainerRef.current || !mapInView) return
    const container = mapContainerRef.current
    if (container.querySelector('script')) return
    const script = document.createElement('script')
    script.src = YANDEX_MAP_SCRIPT
    script.async = true
    script.charset = 'utf-8'
    script.type = 'text/javascript'
    container.appendChild(script)
  }, [mapInView])

  const scrollToForm = useCallback(() => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [formRef]);
  const scrollToAbout = useCallback(() => {
    aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [aboutRef]);

  const [campName, setCampName] = useState('');
  const [campPhone, setCampPhone] = useState('');
  const [campFormStatus, setCampFormStatus] = useState('idle'); // idle | sending | success | error
  const [campNameError, setCampNameError] = useState('')
  const [campPhoneError, setCampPhoneError] = useState('')

  const digitsOnly = (str) => (str.replace(/\D/g, '') || '')
  const isValidPhone = (phone) => {
    const digits = digitsOnly(phone)
    if (digits.length < 10) return false
    const d = digits.length === 11 && (digits[0] === '7' || digits[0] === '8') ? digits.slice(1) : digits
    return d.length === 10 && /^[789]/.test(d)
  }

  const handleCampPhoneChange = useCallback((e) => {
    const v = e.target.value
    const digits = digitsOnly(v)
    if (digits.length > 11) return
    if (v === '' || /^\+?[\d\s\-()]*$/.test(v)) {
      setCampPhone(v)
      setCampPhoneError('')
    }
  }, [])

  const sendCampToTelegram = useCallback(async (userName, phoneNumber) => {
    const res = await fetch(`${API_BASE}/api/send-callback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: userName, phone: phoneNumber }),
    })
    if (!res.ok) throw new Error('Send failed')
  }, [])

  const handleCampFormSubmit = useCallback(async (e) => {
    e.preventDefault()
    setCampNameError('')
    setCampPhoneError('')
    const trimmedName = campName.trim()
    const trimmedPhone = campPhone.trim()

    let hasError = false
    if (!trimmedName) {
      setCampNameError('Введите имя')
      hasError = true
    }
    if (!trimmedPhone) {
      setCampPhoneError('Введите номер телефона')
      hasError = true
    } else if (!isValidPhone(trimmedPhone)) {
      setCampPhoneError('Только цифры, 10–11 цифр')
      hasError = true
    }
    if (hasError) return

    setCampFormStatus('sending')
    try {
      await sendCampToTelegram(trimmedName, trimmedPhone)
      setCampFormStatus('success')
      setCampName('')
      setCampPhone('')
    } catch {
      setCampFormStatus('error')
    }
  }, [campName, campPhone, sendCampToTelegram])

  // Автопрокрутка галереи (медленнее) + пауза при взаимодействии
  useEffect(() => {
    const track = galleryTrackRef.current;
    if (!track) return;

    const tick = (now) => {
      galleryRafRef.current = requestAnimationFrame(tick);
      const loopWidth = track.offsetWidth / 2;
      if (loopWidth > 0) galleryLoopWidthRef.current = loopWidth;
      if (galleryPaused || galleryDragging || loopWidth <= 0) {
        galleryLastTimeRef.current = now;
        return;
      }
      const prev = galleryLastTimeRef.current ?? now;
      galleryLastTimeRef.current = now;
      const dt = (now - prev) / 1000;
      const speed = loopWidth / 250; // скорость
      setGalleryScroll((s) => {
        let next = s + speed * dt;
        if (next >= loopWidth) next -= loopWidth;
        if (next < 0) next += loopWidth;
        return next;
      });
    };
    galleryRafRef.current = requestAnimationFrame(tick);
    return () => {
      if (galleryRafRef.current) cancelAnimationFrame(galleryRafRef.current);
    };
  }, [galleryPaused, galleryDragging]);

  const normalizeOffset = useCallback((value) => {
    const loop = galleryLoopWidthRef.current;
    if (loop <= 0) return 0;
    let v = value % loop;
    if (v < 0) v += loop;
    return v;
  }, []);

  const onGalleryMouseDown = useCallback((e) => {
    if (e.button !== 0) return;
    setGalleryDragging(true);
    galleryDragStart.current = { x: e.clientX, offset: galleryScroll };
  }, [galleryScroll]);

  const onGalleryMouseMove = useCallback((e) => {
    if (!galleryDragging) return;
    const { x, offset } = galleryDragStart.current;
    const loop = galleryLoopWidthRef.current;
    const delta = x - e.clientX;
    setGalleryScroll(normalizeOffset(offset + delta));
  }, [galleryDragging, normalizeOffset]);

  const onGalleryMouseUp = useCallback(() => {
    setGalleryDragging(false);
  }, []);

  useEffect(() => {
    if (!galleryDragging) return;
    document.addEventListener('mousemove', onGalleryMouseMove);
    document.addEventListener('mouseup', onGalleryMouseUp);
    return () => {
      document.removeEventListener('mousemove', onGalleryMouseMove);
      document.removeEventListener('mouseup', onGalleryMouseUp);
    };
  }, [galleryDragging, onGalleryMouseMove, onGalleryMouseUp]);

  const galleryStripRef = useRef(null);
  const onGalleryWheel = useCallback((e) => {
    e.preventDefault();
    setGalleryScroll((s) => normalizeOffset(s + e.deltaY));
    setGalleryPaused(true);
    window.clearTimeout(window._camp2025GalleryPauseTimeout);
    window._camp2025GalleryPauseTimeout = setTimeout(() => setGalleryPaused(false), 2500);
  }, [normalizeOffset]);

  useEffect(() => {
    const el = galleryStripRef.current;
    if (!el) return;
    el.addEventListener('wheel', onGalleryWheel, { passive: false });
    return () => el.removeEventListener('wheel', onGalleryWheel);
  }, [onGalleryWheel]);

  return (
    <div className="camp2025-page">
      {/* Фон приклеен; надписи и кнопки в отдельном блоке — прокручиваются вверх */}
      <div className="camp2025-hero" aria-hidden="true" />
      <div ref={heroRef} className={`camp2025-hero-content ${heroInView ? 'animate-in' : ''}`}>
        <h1 className="camp2025-hero-content__title">
          ВОЛЕЙБОЛЬНОЕ ПУТЕШЕСТВИЕ ПО ПОБЕРЕЖЬЮ ТУРЦИИ НА ЯХТЕ
        </h1>
        <p className="camp2025-hero-content__date">Конец мая: 30.05.26 – 06.06.26</p>
        <div className="camp2025-hero-content__buttons">
          <button type="button" className="camp2025-hero-content__btn camp2025-hero-content__btn--primary" onClick={scrollToForm}>
            Записаться
          </button>
          <button type="button" className="camp2025-hero-content__btn camp2025-hero-content__btn--outline" onClick={scrollToAbout}>
            Подробнее
          </button>
          {/* <a
            href={`/pdf/${encodeURIComponent('Путешествие 30.05.2026 - 06.06.2026.pdf')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="camp2025-hero-content__btn camp2025-hero-content__btn--outline"
          >
            Презентация
          </a> */}
        </div>
        <div className="camp2025-hero-content__scroll">
          <span className="camp2025-hero-content__arrow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </div>
      </div>

      {/* Контент наезжает на картинку при прокрутке */}
      <main className="camp2025-content">
        {/* <section ref={textRef} className={`camp2025-text ${textInView ? 'animate-in' : ''}`}>
          <p>Хотите улучшить свои навыки в пляжном волейболе?</p>
          <p>Не ищите никого, кроме меня!</p>
          <p>
            Имея многолетний опыт профессионального игрока и тренера, предлагаю вам участие в лагере пляжного волейбола для игроков любого уровня.
          </p>
          <p>
            Не важно, являетесь ли вы новичком, желающим изучить основы, или опытным игроком, желающим отточить свои навыки, я помогу вам полностью раскрыть свой потенциал на песке.
          </p>
        </section> */}

        <section ref={whyRef} className={`camp2025-why ${whyInView ? 'animate-in' : ''}`}>
          <h2 className="camp2025-why__title">ЛАГЕРЬ ПЛЯЖНОГО ВОЛЕЙБОЛА</h2>
          <p className="camp2025-why__subtitle">Что вас ждет?</p>
          <ul className="camp2025-why__grid">
            <li className="camp2025-why__item">
              <span className="camp2025-why__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 21h18M5 21V9l7-4 7 4v12M9 9v12M15 9v12" /></svg>
              </span>
              <span className="camp2025-why__text">10 уникальных тренировок и 2 турнира</span>
            </li>
            <li className="camp2025-why__item">
              <span className="camp2025-why__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 17v-4h4v4H3zM3 12V8h4v4H3zM8 17v-4h4v4H8zM8 12V8h4v4H8zM13 17v-4h4v4h-4zM13 12V8h4v4h-4z" /></svg>
              </span>
              <span className="camp2025-why__text">группы разных уровней подготовки (light/medium/hard)</span>
            </li>
            <li className="camp2025-why__item">
              <span className="camp2025-why__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2L4 6v14a2 2 0 002 2h12a2 2 0 002-2V6l-2-4H6zM6 6h12" /><path d="M8 10v6M12 10v6M16 10v6" /></svg>
              </span>
              <span className="camp2025-why__text">кастомный мерч для каждого участника</span>
            </li>
            <li className="camp2025-why__item">
              <span className="camp2025-why__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="8" r="5" /><path d="M12 13v8M9 18h6" /></svg>
              </span>
              <span className="camp2025-why__text">уникальные награды и подарки для участников</span>
            </li>
            <li className="camp2025-why__item">
              <span className="camp2025-why__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 5a3 3 0 100 6 3 3 0 000-6zM6 19c0-2 2-4 6-4s6 2 6 4M3 12h2M19 12h2M12 3v2M12 19v2" /></svg>
              </span>
              <span className="camp2025-why__text">в лагере будем развивать не только физические навыки, но и ментальные</span>
            </li>
            <li className="camp2025-why__item">
              <span className="camp2025-why__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="9" cy="7" r="2.5" /><circle cx="15" cy="7" r="2.5" /><path d="M6 18c0-2 2-3 6-3s6 1 6 3M12 14v4" /></svg>
              </span>
              <span className="camp2025-why__text">так же, новые знакомства</span>
            </li>
            <li className="camp2025-why__item">
              <span className="camp2025-why__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2C8 2 5 6 5 10c0 4 3 8 7 12 4-4 7-8 7-12 0-4-3-8-7-8z" /><path d="M12 10a2 2 0 100-4 2 2 0 000 4z" /></svg>
              </span>
              <span className="camp2025-why__text">в нашем распоряжении лучшие корты страны на первой береговой линии</span>
            </li>
            <li className="camp2025-why__item">
              <span className="camp2025-why__icon camp2025-why__icon--percent" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /></svg>
                <span className="camp2025-why__icon-label">100%</span>
              </span>
              <span className="camp2025-why__text">при размещение в си-отеле, восстановление в spa и потрясающие завтраки</span>
            </li>
            <li className="camp2025-why__item">
              <span className="camp2025-why__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="9" /><path d="M8 12h8M12 8v8" /></svg>
              </span>
              <span className="camp2025-why__text">и конечно же, безлимитный волейбол</span>
            </li>
          </ul>
        </section>

        <section ref={galleryRef} className={`camp2025-gallery ${galleryInView ? 'animate-in' : ''}`}>
          <h2 className="camp2025-gallery__title">Галерея</h2>
          <p className="camp2025-gallery__lead">Тренировки, лагерь и атмосфера #STROEVTEAM</p>
          <div
            ref={galleryStripRef}
            className={`camp2025-gallery__strip ${galleryDragging ? 'camp2025-gallery__strip--dragging' : ''}`}
            onMouseDown={onGalleryMouseDown}
            role="region"
            aria-label="Галерея фото, можно прокручивать мышью"
          >
            <div
              ref={galleryTrackRef}
              className="camp2025-gallery__strip-track"
              style={{ transform: `translateX(-${galleryScroll}px)` }}
            >
              {[...GALLERY_IMAGES, ...GALLERY_IMAGES].map((src, i) => (
                <div className="camp2025-gallery__strip-item" key={i}>
                  <img src={src} alt="" draggable={false} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* <section ref={trainersRef} className={`camp2025-trainers ${trainersInView ? 'animate-in' : ''}`}>
          <div className="camp2025-trainers__row">
            <div className="camp2025-trainer camp2025-trainer--left">
              <div className="camp2025-trainer__photo">
                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400" alt="Альберт Строев" />
              </div>
              <a href="#" className="camp2025-trainer__btn">Альберт Строев</a>
            </div>
            <h2 className="camp2025-trainers__title">ТРЕНЕР</h2>
            <div className="camp2025-trainer camp2025-trainer--right">
              
              
            </div>
          </div>
        </section> */}

        <Camp2025DatesPrices sectionRef={pricesRef} animateIn={pricesInView} />

        <section ref={aboutRef} className={`camp2025-about ${aboutInView ? 'animate-in' : ''}`}>
          <h2 className="camp2025-about__title">ПОДРОБНЕЕ О ПУТЕШЕСТВИИ</h2>
          <p className="camp2025-about__subtitle">Волейбол, яхта и побережье Турции</p>
          <div className="camp2025-about__content">
            <p className="camp2025-about__text">
              Здесь будет описание маршрута, программа по дням и детали путешествия.
            </p>
            <p className="camp2025-about__text">
              Заглушка: расписание, что входит в тур, что взять с собой, контакты организаторов.
            </p>
          </div>
          <a
            href={`/pdf/${encodeURIComponent('Путешествие 30.05.2026 - 06.06.2026.pdf')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="camp2025-about__btn"
          >
            Презентация
          </a>
        </section>

        <span id='form'></span>
        <section ref={formRef} className={`camp2025-form ${formInView ? 'animate-in' : ''}`}>
          <h2 className="camp2025-form__title">
            ЗАПИСЫВАЙТЕСЬ В ТРЕНИРОВОЧНЫЙ ЛАГЕРЬ ПЛЯЖНОГО ВОЛЕЙБОЛА НА БАЗЕ «СИ-ОТЕЛЬ» 2025
          </h2>
          <p className="camp2025-form__subtitle">Заполните форму ниже.</p>
          {campFormStatus === 'success' && (
            <p className="camp2025-form__message camp2025-form__message--success">Заявка отправлена!</p>
          )}
          {campFormStatus === 'error' && (
            <p className="camp2025-form__message camp2025-form__message--error">Ошибка, попробуйте позже</p>
          )}
          <form className="camp2025-form__form"  onSubmit={handleCampFormSubmit}>
            <label className={`camp2025-form__field ${campNameError ? 'camp2025-form__field--error' : ''}`}>
              <span className="camp2025-form__label">Имя <span className="camp2025-form__required">*</span></span>
              <input
                type="text"
                name="name"
                placeholder="Ваше имя"
                className="camp2025-form__input"
                value={campName}
                onChange={(e) => { setCampName(e.target.value); setCampNameError('') }}
                disabled={campFormStatus === 'sending'}
              />
              <span className="camp2025-form__field-error-wrap">
                {campNameError && <span className="camp2025-form__field-error">{campNameError}</span>}
              </span>
            </label>
            <label className={`camp2025-form__field ${campPhoneError ? 'camp2025-form__field--error' : ''}`}>
              <span className="camp2025-form__label">Телефон <span className="camp2025-form__required">*</span></span>
              <span className="camp2025-form__phone-wrap">
                <span className="camp2025-form__phone-prefix" aria-hidden="true">🇷🇺</span>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+7 (000) 000-00-00"
                  className="camp2025-form__input"
                  value={campPhone}
                  onChange={handleCampPhoneChange}
                  disabled={campFormStatus === 'sending'}
                  inputMode="numeric"
                  autoComplete="tel"
                />
              </span>
              <span className="camp2025-form__field-error-wrap">
                {campPhoneError && <span className="camp2025-form__field-error">{campPhoneError}</span>}
              </span>
            </label>
            <div className="camp2025-form__field camp2025-form__field--submit">
              <span className="camp2025-form__label" aria-hidden="true">&nbsp;</span>
              <button type="submit" className="camp2025-form__submit" disabled={campFormStatus === 'sending'}>
                {campFormStatus === 'sending' ? 'Отправка...' : 'Подтвердить'}
              </button>
              <span className="camp2025-form__field-error-wrap" aria-hidden="true" />
            </div>
          </form>
          <p className="camp2025-form__notice">В ближайшее время после подачи заявки, с вами свяжется менеджер.</p>
        </section>

        <section
          id="map"
          ref={mapRef}
          className={`camp2025-map-block ${mapInView ? 'animate-in' : ''}`}
        >
          <h2 className="camp2025-map-block__title">Наше местоположение</h2>
          <p className="camp2025-map-block__address">Сочи, ул. Урицкого 18а, территория Си-отеля</p>
          <div
            ref={mapContainerRef}
            className="camp2025-map-block__map"
            aria-label="Карта расположения"
          />
        </section>

        <section ref={contactsRef} className={`camp2025-contacts ${contactsInView ? 'animate-in' : ''}`}>
          <a href="tel:+79641223344" className="camp2025-contacts__phone">+7 (964)1-22-33-44</a>
          <span className="camp2025-contacts__location">Россия, Сочи</span>
          <div className="camp2025-contacts__socials">
            <Social clname="camp2025-contacts__social" />
          </div>
          <Link to="/" className="camp2025-contacts__home-btn">ГЛАВНАЯ</Link>
        </section>
      </main>
    </div>
  )
}

export default Camp2025Page
