import { Link } from 'react-router-dom'
import useInView from '../../hooks/useInView'
import Social from '../../social'

const PLACEHOLDER_IMG = ''
const PLACEHOLDER_SQUARE = 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=400'

function CoachPage() {
  const [introRef, introInView] = useInView()
  const [aboutRef, aboutInView] = useInView()
  const [careerRef, careerInView] = useInView()
  const [galleryRef, galleryInView] = useInView()
  const [quoteRef, quoteInView] = useInView()

  const stats = [
    { value: '20+', label: 'лет стажа', icon: '📅' },
    { value: '19800+', label: 'часов тренировок', icon: '⏱' },
    { value: '80%', label: 'победа на турнирах', icon: '🏆' }
  ]

  const galleryImages = [
    PLACEHOLDER_SQUARE,
    'https://images.unsplash.com/photo-1592656094267-764a45160876?w=400',
    'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400',
    PLACEHOLDER_SQUARE,
    'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=400',
    'https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=400'
  ]

  const stripImages = [
    PLACEHOLDER_SQUARE,
    'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400',
    'https://images.unsplash.com/photo-1592656094267-764a45160876?w=400'
  ]

  return (
    <div className="coach-page">
      {/* Hero — только фото, без текста и логотипа */}
      <section className="coach-hero">
        <div className="coach-hero__divider" />
      </section>

      {/* Контент: белый блок, логотип внутри но абсолютно позиционирован — наполовину на фото */}
      <main className="coach-content">
        <div ref={introRef} className={`coach-intro ${introInView ? 'animate-in' : ''}`}>
          <div className="coach-intro__logo-wrap">
            <img src="/images/logo1.svg" alt="Stroev Team" className="coach-intro__logo" />
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
              {galleryImages.map((src, i) => (
                <div className="coach-gallery-block__item" key={i}>
                  <img src={src} alt="" />
                </div>
              ))}
            </div>
            <p className="coach-gallery-block__desc">
              Мы создаём атмосферу команды: от разминки до игровых упражнений. Присоединяйтесь к тем,
              кто уже тренируется с нами.
            </p>
            <div className="coach-gallery-block__strip">
              <div className="coach-gallery-block__strip-track">
                {[...stripImages, ...stripImages].map((src, i) => (
                  <div className="coach-gallery-block__strip-item" key={i}>
                    <img src={src} alt="" />
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
              <Link to="/training" className="btn-coach-start">НАЧАТЬ</Link>
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
