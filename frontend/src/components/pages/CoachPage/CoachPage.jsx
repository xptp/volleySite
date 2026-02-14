import { Link } from 'react-router-dom'
import { useState, useEffect, useRef, useCallback } from 'react'
import useInView from '../../hooks/useInView'
import Social from '../../social'

const PLACEHOLDER_IMG = ''
const PLACEHOLDER_SQUARE = ''

// галерея
const SCROLLING_GALLERY_IMAGES = [
  '/images/StroevGallery/7.webp?w=400',
  '/images/StroevGallery/8.webp?w=400',
  '/images/StroevGallery/9.webp?w=400',
  '/images/StroevGallery/10.webp?w=400',
  '/images/StroevGallery/11.webp?w=400',
  '/images/StroevGallery/12.webp?w=400',
  '/images/StroevGallery/13.webp?w=400',
  '/images/StroevGallery/14.webp?w=400',
  
]

// сетка
const SPORTS_CLUB_GRID_IMAGES = [
  '/images/StroevGallery/1.webp?w=400',
  '/images/StroevGallery/2.webp?w=400',
  '/images/StroevGallery/3.webp?w=400',
  '/images/StroevGallery/4.webp?w=400',
  '/images/StroevGallery/5.webp?w=400',
  '/images/StroevGallery/6.webp?w=400',

]

function CoachPage() {
  const [introRef, introInView] = useInView()
  const [aboutRef, aboutInView] = useInView()
  const [careerRef, careerInView] = useInView()
  const [galleryRef, galleryInView] = useInView()
  const [quoteRef, quoteInView] = useInView()

  const [coachGalleryScroll, setCoachGalleryScroll] = useState(0)
  const [coachGalleryPaused, setCoachGalleryPaused] = useState(false)
  const [coachGalleryDragging, setCoachGalleryDragging] = useState(false)
  const coachGalleryTrackRef = useRef(null)
  const coachGalleryLoopWidthRef = useRef(0)
  const coachGalleryDragStart = useRef({ x: 0, offset: 0 })
  const coachGalleryRafRef = useRef(null)
  const coachGalleryLastTimeRef = useRef(null)
  const coachGalleryDraggingRef = useRef(false)
  const coachGalleryStripRef = useRef(null)

  const stats = [
    { value: '20+', label: 'лет стажа', icon: '📅' },
    { value: '19800+', label: 'часов тренировок', icon: '⏱' },
    { value: '80%', label: 'победа на турнирах', icon: '🏆' }
  ]

  const coachNormalizeOffset = useCallback((value) => {
    const loop = coachGalleryLoopWidthRef.current
    if (loop <= 0) return 0
    let v = value % loop
    if (v < 0) v += loop
    return v
  }, [])

  useEffect(() => {
    const track = coachGalleryTrackRef.current
    if (!track) return
    const tick = (now) => {
      coachGalleryRafRef.current = requestAnimationFrame(tick)
      const loopWidth = track.offsetWidth / 2
      if (loopWidth > 0) coachGalleryLoopWidthRef.current = loopWidth
      if (coachGalleryPaused || coachGalleryDragging || loopWidth <= 0) {
        coachGalleryLastTimeRef.current = now
        return
      }
      const prev = coachGalleryLastTimeRef.current ?? now
      coachGalleryLastTimeRef.current = now
      const dt = (now - prev) / 1000
      const speed = loopWidth / 100 // скорость галлереи
      setCoachGalleryScroll((s) => {
        let next = s + speed * dt
        if (next >= loopWidth) next -= loopWidth
        if (next < 0) next += loopWidth
        return next
      })
    }
    coachGalleryRafRef.current = requestAnimationFrame(tick)
    return () => {
      if (coachGalleryRafRef.current) cancelAnimationFrame(coachGalleryRafRef.current)
    }
  }, [coachGalleryPaused, coachGalleryDragging])

  const onCoachGalleryMouseDown = useCallback((e) => {
    if (e.button !== 0) return
    coachGalleryDraggingRef.current = true
    setCoachGalleryDragging(true)
    coachGalleryDragStart.current = { x: e.clientX, offset: coachGalleryScroll }
  }, [coachGalleryScroll])

  const onCoachGalleryTouchStart = useCallback((e) => {
    coachGalleryDraggingRef.current = true
    setCoachGalleryDragging(true)
    coachGalleryDragStart.current = { x: e.touches[0].clientX, offset: coachGalleryScroll }
  }, [coachGalleryScroll])

  const onCoachGalleryMouseMove = useCallback((e) => {
    if (!coachGalleryDragging) return
    const { x, offset } = coachGalleryDragStart.current
    const delta = x - e.clientX
    setCoachGalleryScroll(coachNormalizeOffset(offset + delta))
  }, [coachGalleryDragging, coachNormalizeOffset])

  const onCoachGalleryMouseUp = useCallback(() => {
    coachGalleryDraggingRef.current = false
    setCoachGalleryDragging(false)
  }, [])

  const onCoachGalleryTouchEnd = useCallback(() => {
    coachGalleryDraggingRef.current = false
    setCoachGalleryDragging(false)
  }, [])

  useEffect(() => {
    if (!coachGalleryDragging) return
    document.addEventListener('mousemove', onCoachGalleryMouseMove)
    document.addEventListener('mouseup', onCoachGalleryMouseUp)
    return () => {
      document.removeEventListener('mousemove', onCoachGalleryMouseMove)
      document.removeEventListener('mouseup', onCoachGalleryMouseUp)
    }
  }, [coachGalleryDragging, onCoachGalleryMouseMove, onCoachGalleryMouseUp])

  const onCoachGalleryWheel = useCallback((e) => {
    e.preventDefault()
    setCoachGalleryScroll((s) => coachNormalizeOffset(s + e.deltaY))
    setCoachGalleryPaused(true)
    window.clearTimeout(window._coachGalleryPauseTimeout)
    window._coachGalleryPauseTimeout = setTimeout(() => setCoachGalleryPaused(false), 2500)
  }, [coachNormalizeOffset])

  useEffect(() => {
    const el = coachGalleryStripRef.current
    if (!el) return
    el.addEventListener('wheel', onCoachGalleryWheel, { passive: false })
    return () => el.removeEventListener('wheel', onCoachGalleryWheel)
  }, [onCoachGalleryWheel])

  const onCoachGalleryTouchMove = useCallback((e) => {
    if (!coachGalleryDraggingRef.current) return
    e.preventDefault()
    const { x, offset } = coachGalleryDragStart.current
    const delta = x - e.touches[0].clientX
    setCoachGalleryScroll(coachNormalizeOffset(offset + delta))
  }, [coachNormalizeOffset])

  useEffect(() => {
    const el = coachGalleryStripRef.current
    if (!el) return
    el.addEventListener('touchmove', onCoachGalleryTouchMove, { passive: false })
    return () => el.removeEventListener('touchmove', onCoachGalleryTouchMove)
  }, [onCoachGalleryTouchMove])

  return (
    <div className="coach-page">
      {/* Hero — полноэкранное фото; внизу виден кусок белого блока с логотипом и именем */}
      <section className="coach-hero">
        <div className="coach-hero__divider" />
      </section>

      {/* Белый блок заходит на hero — при открытии видно логотип и имя, при прокрутке остальное */}
      <main className="coach-content">
        <div ref={introRef} className={`coach-intro ${introInView ? 'animate-in' : ''}`}>
          <div className="coach-intro__logo-wrap">
            <img src="/images/logo1.svg" alt="Stroev Team" className="coach-intro__logo" fetchPriority="high" decoding="async" />
          </div>
          <h1 className="coach-intro__name">Строев Альберт</h1>
          <p className="coach-intro__role">тренер по пляжному волейболу</p>

          {/* Дапсими: бесшовная бесконечная анимация — два идентичных блока в track, сдвиг на 50% */}
          <div className="coach-intro__marquee">
            <div className="coach-intro__marquee-line coach-intro__marquee-line--to-right">
              <div className="coach-intro__marquee-track">
                {[...Array(8)].map((_, i) => (
                  <span key={`r1-${i}`}>TRAIN LIKE A PRO</span>
                ))}
                {[...Array(8)].map((_, i) => (
                  <span key={`r2-${i}`}>TRAIN LIKE A PRO</span>
                ))}
              </div>
            </div>
            <div className="coach-intro__marquee-line coach-intro__marquee-line--to-left">
              <div className="coach-intro__marquee-track">
                {[...Array(8)].map((_, i) => (
                  <span key={`l1-${i}`}>TRAIN LIKE A PRO</span>
                ))}
                {[...Array(8)].map((_, i) => (
                  <span key={`l2-${i}`}>TRAIN LIKE A PRO</span>
                ))}
              </div>
            </div>
          </div>

          {/* Обо мне на белом фоне */}
          <div className="coach-intro__about">
            <h2 className="coach-intro__about-title">Обо мне</h2>
            <p className="coach-intro__about-label">Профильное образование:</p>
            <p className="coach-intro__about-text">
              РГУФКСМиТ — Российский государственный университет физической культуры, спорта, молодёжи и туризма. Кафедра «Волейбол».
            </p>
          </div>
        </div>

        {/* Обо мне — статистика и фото (тёмный фон) */}
        <section
          ref={aboutRef}
          className={`coach-section coach-about ${aboutInView ? 'animate-in' : ''}`}
        >
          <div className="coach-section__inner">
            <div className="coach-about__stats">
              {stats.map((item, i) => (
                <div className="coach-stat" key={i}>
                  <div className="coach-stat__icon">{item.icon}</div>
                  <span className="coach-stat__value">{item.value}</span>
                  <span className="coach-stat__label">{item.label}</span>
                </div>
              ))}
            </div>
            <div className="coach-about__main">
              <div className="coach-about__text">
                <p>
                  Моя волейбольная история началась во втором классе, как и у большинства — в Ростовской ДЮСШОР.
                </p>
                <p>
                  В 13 лет я уже выиграл свой первый Чемпионат России за команду «Белогорье» (Белгород).
                  Да и в 14, тоже :)
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Карьера */}
        <section
          ref={careerRef}
          className={`coach-section coach-career ${careerInView ? 'animate-in' : ''}`}
        >
          <div className="coach-career__bg">
            <img src={PLACEHOLDER_IMG} alt="" />
          </div>
          <div className="coach-career__overlay">
            <h2 className="coach-career__title">КАРЬЕРА</h2>
            <div className="coach-career__body">
              <p>В моей карьере был такой клуб, как «МГТУ» (Москва), полтора года своей жизни посвятил ему. А вот «ЦСКА» (Москва) — целых 5! Поработал здесь с именитыми тренерами. Чему очень рад.</p>
              <p>Следующий волейбольный этап — «Зенит» Казань, два сезона, как один день. Здесь победа в Суперкубке и Бронза на Кубке России.</p>
              <p>«Нефтяник» (Оренбург) был следующим клубом, в котором я провёл два года.</p>
              <p>Далее «Искра» (Одинцово) — один сезон.</p>
              <p>И один из запоминающихся — «Енисей» (Красноярск). Начали с Бронзы на Кубке России и Дальнего Востока, закончили досрочно Чемпионством. Первое место и выход в Суперлигу.</p>
              <p>Клуб в Дагестане и Казахстане, два года, заняли отдельное место в моём сердце, но медалей не принесли.</p>
              <p>И завершающий, как я думал, мою карьеру в классике клуб «ТрансгазСтаврополь» (Кисловодск). Прекрасное место, отличный результат — Чемпионы России.</p>
              <p>А вот уже завершающим, в итоге, оказался ВК «Обнинск». И Бронзовые медали по окончанию сезона.</p>
              <p>Рассказывать, как в межсезонье я покорял турниры по пляжному волейболу в разных городах — не стану.</p>
            </div>
          </div>
        </section>

        {/* Текст + галерея + описание + движущаяся полоса */}
        <section
          ref={galleryRef}
          className={`coach-section coach-gallery-block ${galleryInView ? 'animate-in' : ''}`}
        >
          <div className="coach-section__inner">
            <h2 className="coach-section__title">СПОРТИВНЫЙ КЛУБ</h2>
            <p className="coach-gallery-block__lead">
              Тренировки проходят в комфортных залах и на открытых площадках. Работаем над техникой,
              тактикой и физической подготовкой.
            </p>
            <div className="coach-gallery-block__grid">
              {SPORTS_CLUB_GRID_IMAGES.map((src, i) => (
                <div className="coach-gallery-block__item" key={i}>
                  <img src={src} alt="" loading="lazy" decoding="async" />
                </div>
              ))}
            </div>
            <p className="coach-gallery-block__desc">
              Мы создаём атмосферу команды: от разминки до игровых упражнений. Присоединяйтесь к тем,
              кто уже тренируется с нами.
            </p>
            <div
              ref={coachGalleryStripRef}
              className={`coach-gallery-block__strip ${coachGalleryDragging ? 'coach-gallery-block__strip--dragging' : ''}`}
              onMouseDown={onCoachGalleryMouseDown}
              onTouchStart={onCoachGalleryTouchStart}
              onTouchEnd={onCoachGalleryTouchEnd}
              onTouchCancel={onCoachGalleryTouchEnd}
              role="region"
              aria-label="Галерея фото, можно прокручивать пальцем или мышью"
            >
              <div
                ref={coachGalleryTrackRef}
                className="coach-gallery-block__strip-track"
                style={{ transform: `translateX(-${coachGalleryScroll}px)` }}
              >
                {[...SCROLLING_GALLERY_IMAGES, ...SCROLLING_GALLERY_IMAGES].map((src, i) => (
                  <div className="coach-gallery-block__strip-item" key={i}>
                    <img src={src} alt="" loading="lazy" decoding="async" draggable={false} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Цитата и кнопка */}
        <section
          ref={quoteRef}
          className={`coach-section coach-quote ${quoteInView ? 'animate-in' : ''}`}
        >
          <div className="coach-section__inner coach-quote__inner">
            <blockquote className="coach-quote__block">
              <p className="coach-quote__text">
                Волейбол — это не только сила и техника, но и умение работать в команде. Истинная победа заключается в том, чтобы вместе преодолевать трудности и стремиться к общей цели.
              </p>
              <cite className="coach-quote__cite">Альберт Строев</cite>
            </blockquote>
            <div className="coach-quote__action">
              <Link to="/camp2025#form" className="btn-coach-start">НАЧАТЬ</Link>
            </div>
          </div>
        </section>

        {/* Футер — без Tilda */}
        <footer className="coach-footer">
          <div className="coach-footer__inner">
            <Link to="/" className="coach-footer__btn">ГЛАВНАЯ</Link>
            <a href="tel:+79643223344" className="coach-footer__phone">+7 964 322 33 44</a>
            <p className="coach-footer__cta">Записаться на курс</p>
            <div className="coach-footer__socials">
              <Social clname={'coach-footer__social'} />
            </div>
            <p className="coach-footer__copy">2024 © Строев Альберт. Все права защищены.</p>
          </div>
        </footer>
      </main>
    </div>
  )
}

export default CoachPage
