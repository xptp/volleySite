import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Tent, Dumbbell, UserCircle, MapPin } from 'lucide-react'
import useInView from '../../hooks/useInView'
import Social from '../../social'


const YANDEX_MAP_SCRIPT =
  'https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3Ab2822b0ab84a6008a80c6734ace1e5e6c89605e7d12fe0b328123004260dd98d&amp;width=800&amp;height=450&amp;lang=ru_RU&amp;scroll=true'

function HomePage() {
  const [buttonsRef, buttonsInView] = useInView()
  const [mapRef, mapInView] = useInView()
  const [contactsRef, contactsInView] = useInView()
  const [socialsRef, socialsInView] = useInView()
  const mapContainerRef = useRef(null)

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

  return (
    <>
      {/* Hero Section - фиксированный фон */}
      <section className="hero">
        <div className="hero__content">
          <span className="hero__tagline">TRAIN LIKE A PRO</span>
          <h1 className="hero__title">STROEV TEAM</h1>
        </div>
        <div className="hero__scroll">
          <span className="hero__arrow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </span>
        </div>
      </section>

      {/* Content Section - наезжает на hero */}
      <section className="content">
        <div className="content__inner">
          <div className="content__description">
            <h3 className="highlight">ЛАГЕРЬ ПЛЯЖНОГО ВОЛЕЙБОЛА</h3>
            <p>
              Главный тренер <span className="highlight"> Альберт Строев</span> многократный <span className="highlight">Чемпион России</span>.
              <br />
              тут добавить что-то про лагерь
              <br />
              желательно что-то уникальное
            </p>
          </div>

          <div 
            ref={buttonsRef} 
            className={`content__buttons ${buttonsInView ? 'animate-in' : ''}`}
          >
            <Link to="/camp2025" className="btn-menu" style={{ animationDelay: '100ms' }}>
              <span className="btn-menu__icon"><Tent size={22} strokeWidth={2} color="white" /></span>
              <span className="btn-menu__text">СПОРТИВНЫЙ ЛАГЕРЬ</span>
              <span className="btn-menu__arrow">›</span>
            </Link>
            <Link to="/training" className="btn-menu" style={{ animationDelay: '200ms' }}>
              <span className="btn-menu__icon"><Dumbbell size={22} strokeWidth={2} color="white" /></span>
              <span className="btn-menu__text">ТРЕНИРОВКИ</span>
              <span className="btn-menu__arrow">›</span>
            </Link>
            <Link to="/coach" className="btn-menu" style={{ animationDelay: '0ms' }}>
              <span className="btn-menu__icon"><UserCircle size={22} strokeWidth={2} color="white" /></span>
              <span className="btn-menu__text">О ТРЕНЕРЕ</span>
              <span className="btn-menu__arrow">›</span>
            </Link>
            {/* <Link to="/" className="btn-menu" style={{ animationDelay: '300ms' }}>
              <span className="btn-menu__icon">🌐</span>
              <span className="btn-menu__text">ТУРНИРЫ</span>
              <span className="btn-menu__arrow">›</span>
            </Link> */}
            <Link to="/camp2025#map" className="btn-menu" style={{ animationDelay: '300ms' }}>
              <span className="btn-menu__icon"><MapPin size={22} strokeWidth={2} color="white" /></span>
              <span className="btn-menu__text">КАК НАС НАЙТИ</span>
              <span className="btn-menu__arrow">›</span>
            </Link>
          </div>

          {/* <div
            ref={mapRef}
            className={`content__map-block ${mapInView ? 'animate-in' : ''}`}
          >
            <h2 className="content__map-title">Наше местоположение
            </h2>
            <p className="content__description">
            Сочи, ул.Урицкого 18а, территория Си-отеля
            </p>
            <div
              ref={mapContainerRef}
              className="content__map"
              aria-label="Карта расположения"
            />
          </div> */}

          <div 
            ref={contactsRef}
            className={`content__contacts ${contactsInView ? 'animate-in' : ''}`}
          >
            <a href="tel:+79641223344" className="content__phone">+7 (964)1-22-33-44</a>
            <span className="content__location">Россия, Сочи</span>
            
            <div 
              ref={socialsRef}
              className={`content__socials ${socialsInView ? 'animate-in' : ''}`}
            >
              <Social clname={"social-icon"}  />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePage
