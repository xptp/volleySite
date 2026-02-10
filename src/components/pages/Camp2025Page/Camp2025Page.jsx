import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import useInView from '../../hooks/useInView';

function Camp2025Page() {
  const [dates, setDates] = useState(null);

  const [heroRef, heroInView] = useInView({ threshold: 0.15 });
  const [textRef, textInView] = useInView({ threshold: 0.15 });
  const [whyRef, whyInView] = useInView({ threshold: 0.1 });
  const [trainersRef, trainersInView] = useInView({ threshold: 0.1 });
  const [pricesRef, pricesInView] = useInView({ threshold: 0.1 });
  const [formRef, formInView] = useInView({ threshold: 0.1 });
  const [noticeRef, noticeInView] = useInView({ threshold: 0.2 });
  const [footerRef, footerInView] = useInView({ threshold: 0.2 });
  const [contactsRef, contactsInView] = useInView({ threshold: 0.2 });

  useEffect(() => {
    fetch('https://opensheet.elk.sh/1r1hqt-xqusneIrpnjt-DcW4sRlkpEbg8F__7fv4zsKg/Лист1')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setDates(data[0]);
        }
      })
      .catch(error => console.error('Ошибка:', error));
  }, []);

  return (
    <div className="camp2025-page">
      {/* Фон приклеен; надписи и кнопки в отдельном блоке — прокручиваются вверх */}
      <div className="camp2025-hero" aria-hidden="true" />
      <div ref={heroRef} className={`camp2025-hero-content ${heroInView ? 'animate-in' : ''}`}>
        <h1 className="camp2025-hero-content__title">
          МАЙСКИЙ ЛАГЕРЬ ПЛЯЖНОГО ВОЛЕЙБОЛА
        </h1>
        <p className="camp2025-hero-content__date">Начало: {dates?.startDate}г.</p>
        <div className="camp2025-hero-content__buttons">
          <a href="#" className="camp2025-hero-content__btn camp2025-hero-content__btn--primary">
            Записаться
          </a>
          <a href="#" className="camp2025-hero-content__btn camp2025-hero-content__btn--outline">
            Подробнее
          </a>
        </div>
      </div>

      {/* Контент наезжает на картинку при прокрутке */}
      <main className="camp2025-content">
        <section ref={textRef} className={`camp2025-text ${textInView ? 'animate-in' : ''}`}>
          <p>Хотите улучшить свои навыки в пляжном волейболе?</p>
          <p>Не ищите никого, кроме меня!</p>
          <p>
            Имея многолетний опыт профессионального игрока и тренера, предлагаю вам участие в лагере пляжного волейбола для игроков любого уровня.
          </p>
          <p>
            Не важно, являетесь ли вы новичком, желающим изучить основы, или опытным игроком, желающим отточить свои навыки, я помогу вам полностью раскрыть свой потенциал на песке.
          </p>
        </section>

        <section ref={whyRef} className={`camp2025-why ${whyInView ? 'animate-in' : ''}`}>
          <h2 className="camp2025-why__title">Почему кемп #STROEVTEAM?</h2>
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

        <section ref={trainersRef} className={`camp2025-trainers ${trainersInView ? 'animate-in' : ''}`}>
          <div className="camp2025-trainers__row">
            <div className="camp2025-trainer camp2025-trainer--left">
              <div className="camp2025-trainer__photo">
                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400" alt="Альберт Строев" />
              </div>
              <a href="#" className="camp2025-trainer__btn">Альберт Строев</a>
            </div>
            <h2 className="camp2025-trainers__title">ТРЕНЕРЫ</h2>
            <div className="camp2025-trainer camp2025-trainer--right">
              <div className="camp2025-trainer__photo">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400" alt="Андрей Гвоздев" />
              </div>
              <Link to="/andrey_gvozdev" className="camp2025-trainer__btn">Андрей Гвоздев</Link>
            </div>
          </div>
        </section>

        <section ref={pricesRef} className={`camp2025-prices ${pricesInView ? 'animate-in' : ''}`}>
          <h2 className="camp2025-prices__title">Даты и Цены</h2>
          <p className="camp2025-prices__intro">
            Си-отель проживание в номере категории «Standard» при двухместном размещении, завтраки «Шведский стол», Spa комплиментарно для гостей отеля:
          </p>
          <ul className="camp2025-prices__list">
            <li>01.05-10.05 от 67.500₽ за весь период</li>
            <li>08.06-15.06 от 52.500₽ за весь период</li>
            <li>30.06-07.07 от 58.800₽ за весь период</li>
            <li>03.08-11.08 от 69.600₽ за весь период</li>
            <li>31.08-07.09 от 57.750₽ за весь период</li>
            <li>27.10-03.11 от 41.300₽ за весь период</li>
          </ul>
          <p className="camp2025-prices__alt">Альтернативные варианты размещения в других отелях</p>
          <div className="camp2025-prices__buttons">
            <a href="#" className="camp2025-prices__btn">
              <span className="camp2025-prices__btn-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M15 9l-6 6M9 9l6 6" /></svg>
              </span>
              БЕЗ ПЕРЕЛЕТА
            </a>
            <a href="#" className="camp2025-prices__btn">
              <span className="camp2025-prices__btn-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" /><path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" /></svg>
              </span>
              С ПЕРЕЛЕТОМ
            </a>
          </div>
        </section>

        <section ref={formRef} className={`camp2025-form ${formInView ? 'animate-in' : ''}`}>
          <h2 className="camp2025-form__title">
            ЗАПИСЫВАЙТЕСЬ В ТРЕНИРОВОЧНЫЙ ЛАГЕРЬ ПЛЯЖНОГО ВОЛЕЙБОЛА НА БАЗЕ «СИ-ОТЕЛЬ» 2025
          </h2>
          <p className="camp2025-form__subtitle">Заполните форму ниже.</p>
          <form className="camp2025-form__form" onSubmit={(e) => e.preventDefault()}>
            <label className="camp2025-form__field">
              <span className="camp2025-form__label">Имя</span>
              <input type="text" name="name" placeholder="Ваше имя" className="camp2025-form__input" />
            </label>
            <label className="camp2025-form__field">
              <span className="camp2025-form__label">Почта</span>
              <input type="email" name="email" placeholder="example@mail.ru" className="camp2025-form__input" />
            </label>
            <label className="camp2025-form__field">
              <span className="camp2025-form__label">Телефон</span>
              <span className="camp2025-form__phone-wrap">
                <span className="camp2025-form__phone-prefix" aria-hidden="true">🇷🇺</span>
                <input type="tel" name="phone" placeholder="+7 (000) 000-00-00" className="camp2025-form__input" />
              </span>
            </label>
            <button type="submit" className="camp2025-form__submit">Подтвердить</button>
          </form>
        </section>

        <section ref={noticeRef} className={`camp2025-notice ${noticeInView ? 'animate-in' : ''}`}>
          <p>В ближайшее время после подачи заявки, с вами свяжется менеджер.</p>
        </section>

        <section ref={footerRef} className={`camp2025-footer ${footerInView ? 'animate-in' : ''}`}>
          <Link to="/" className="camp2025-footer__btn">ГЛАВНАЯ</Link>
        </section>

        <section ref={contactsRef} className={`camp2025-contacts ${contactsInView ? 'animate-in' : ''}`}>
          <a href="tel:+79641223344" className="camp2025-contacts__phone">+7 (964)1-22-33-44</a>
          <span className="camp2025-contacts__location">Россия, Сочи</span>
          <div className="camp2025-contacts__socials">
            <a href="#" className="camp2025-contacts__social" aria-label="WhatsApp">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></a>
            <a href="#" className="camp2025-contacts__social" aria-label="Telegram">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg></a>
            <a href="#" className="camp2025-contacts__social" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.757-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg></a>
            <a href="#" className="camp2025-contacts__social" aria-label="VK">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.391 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.12-5.339-3.202-2.17-3.042-2.763-5.32-2.763-5.778 0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z"/></svg></a>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Camp2025Page
