import { Link } from 'react-router-dom'
import useInView from '../../hooks/useInView'
import Social from '../../social'

function TrainingPage() {
  const [cardsRef, cardsInView] = useInView()
  const [contactsRef, contactsInView] = useInView()

  const trainings = [
    {
      title: 'Групповая тренировка',
      image: '/images/training-photo1.webp?w=400',
      details: [
        'Групповая РАЗОВАЯ тренировка 120 мин.',
        '1500р/чел (4-8 чел).',
        'Пакет от 10 тренировок и более,',
        '1200р. за тренировку',
        '(пакет действует 30 дней с момента покупки).'
      ]
    },
    {
      title: 'Сплит тренировка',
      image: '/images/training-photo2.webp?w=400',
      details: [
        'Стоимость сплит тренировки 2500р/чел (мин двое),',
        '2000р/чел (если трое) (80 мин).'
      ]
    },
    {
      title: 'Индивидуальная тренировка',
      image: '/images/training-photo3.webp?w=400',
      details: [
        'Стоимость индивидуальной тренировки',
        '4000р/чел (от 60 мин).'
      ]
    }
  ]

  return (
    <div className="training-page">
      {/* Logo */}
      <div className="training-page__logo">
        <img src="/images/logo1.svg" alt="Stroev Team" />
      </div>

      {/* Title */}
      <h1 className="training-page__title">
        Хочешь научиться играть в волейбол?
        <br />
        Я тебя научу!
      </h1>

      {/* Training Cards */}
      <div 
        ref={cardsRef}
        className={`training-page__cards ${cardsInView ? 'animate-in' : ''}`}
      >
        {trainings.map((training, index) => (
          <div 
            className="training-card" 
            key={index}
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className="training-card__image">
              <img src={training.image} alt={training.title} />
            </div>
            <h3 className="training-card__title">{training.title}</h3>
            <div className="training-card__details">
              {training.details.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Gallery Button */}
      {/* <div className="training-page__actions">
      <Link to="/" className="btn-outline">ГЛАВНАЯ</Link>
      </div> */}

      {/* CTA Section */}
      <div 
        ref={contactsRef}
        className={`training-page__cta ${contactsInView ? 'animate-in' : ''}`}
      >
        <a href="#" className="btn-red">ЗАПИСАТЬСЯ</a>
        <a href="tel:+79641223344" className="training-page__phone">+7 (964)1-22-33-44</a>
        <span className="training-page__location">Россия, Сочи</span>
        
        <div className="training-page__socials">
          <Social clname={"social-icon"} />
        </div>
      </div>

      {/* Footer */}
      <footer className="training-page__footer">
        <Link to="/" className="btn-outline">ГЛАВНАЯ</Link>
      </footer>
    </div>
  )
}

export default TrainingPage
