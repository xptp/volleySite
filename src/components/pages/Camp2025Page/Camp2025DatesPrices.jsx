import { useState } from 'react'

// Данные по периодам кемпов — легко редактировать
const CAMP_PERIODS = [
  {
    id: '28.03-05.04',
    datesLabel: 'Март-апрель',
    title: 'Лагерь пляжного волейбола в Сочи',
    startDateText: 'Старт: 28.03.26-05.04.26',
    bullets: [
      '10 уникальных тренировок от профессионального тренера Альберта Строева',
      '2 турнира',
      'Группы разных уровней подготовки: light, medium, hard',
      'Кастомный мерч для каждого участника',
      'Уникальные награды и подарки для всех участников',
      'Возможность завести новые знакомства и дружбу',
      'В нашем распоряжении — лучшие оборудованные корты на Черноморском побережье',
      'И, конечно же, безлимитный волейбол!',
    ],
    sportPackagePrice: '38.000₽',
    hotel: {
      intro: 'Си-отель: проживание в номере категории «Standard» при двухместном размещении, завтраки «Шведский стол», Spa комплиментарно для гостей отеля:',
      datesList: [
        { text: '28.03-05.04 - 28.03-05.04', price: ' от 50000р' },
        { text: '28.03-05.04', price: '- 28.03-05.04 от 50000р' },
        { text: '28.03-05.04', price: '- 28.03-05.04 от 50000р' },
        { text: '28.03-05.04', price: '- 28.03-05.04 от 50000р' },
        { text: '28.03-05.04', price: '- 28.03-05.04 от 50000р' },
      ],
      alt: 'Альтернативные варианты размещения в других отелях',
      showButtons: true,
    },
  },
  {
    id: '01.05-09.05',
    datesLabel: 'Май',
    title: 'Лагерь пляжного волейбола в Сочи',
    startDateText: 'Старт: 01.05.26-09.05.26',
    bullets: [
      '10 уникальных тренировок от профессионального тренера',
      '2 турнира',
      'Группы разных уровней: light, medium, hard',
      'Кастомный мерч и награды для участников',
      'Лучшие корты на Черноморском побережье',
      'Безлимитный волейбол!',
    ],
    sportPackagePrice: 'уточняйте',
    hotel: {
      intro: 'Си-отель: проживание, завтраки, Spa. Даты 01.05-09.05:',
      datesList: [
        { text: '01.05-09.05', price: 'уточняйте' },
      ],
      alt: 'Альтернативные варианты размещения в других отелях',
      showButtons: true,
    },
  },
  {
    id: '31.08-07.09',
    datesLabel: 'Июнь-Июль',
    title: 'Лагерь пляжного волейбола в Сочи',
    startDateText: 'Старт: 31.08.26-07.09.26',
    bullets: [
      '10 уникальных тренировок',
      '2 турнира',
      'Группы light, medium, hard',
      'Мерч и награды',
      'Корты на Черноморском побережье',
      'Безлимитный волейбол!',
    ],
    sportPackagePrice: 'уточняйте',
    hotel: {
      intro: 'Си-отель: проживание, завтраки, Spa. Даты 31.08-07.09:',
      datesList: [
        { text: '31.08-07.09', price: 'уточняйте' },
      ],
      alt: 'Альтернативные варианты размещения в других отелях',
      showButtons: true,
    },
  },
  {
    id: '27.09-05.10',
    datesLabel: 'Август',
    title: 'Лагерь пляжного волейбола в Сочи',
    startDateText: 'Старт: 27.09.26-05.10.26',
    bullets: [
      '10 уникальных тренировок',
      '2 турнира',
      'Группы light, medium, hard',
      'Мерч и награды',
      'Корты на побережье',
      'Безлимитный волейбол!',
    ],
    sportPackagePrice: 'уточняйте',
    hotel: {
      intro: 'Си-отель: проживание, завтраки, Spa. Даты 27.09-05.10:',
      datesList: [
        { text: '27.09-05.10', price: 'уточняйте' },
        { text: '27.29-25.12', price: '50р' },
      ],
      alt: 'Альтернативные варианты размещения в других отелях',
      showButtons: true,
    },
  },
]

function Camp2025DatesPrices({ sectionRef, animateIn }) {
  const [selectedId, setSelectedId] = useState(CAMP_PERIODS[0].id)
  const period = CAMP_PERIODS.find((p) => p.id === selectedId) || CAMP_PERIODS[0]

  return (
    <section
      ref={sectionRef}
      className={`camp2025-prices ${animateIn ? 'animate-in' : ''}`}
    >
      <h2 className="camp2025-prices__title">Даты и Цены</h2>
      <p className="camp2025-prices__dates-heading">Даты наших Кемпов в Сочи</p>

      <ul className="camp2025-prices__date-tabs" role="tablist">
        {CAMP_PERIODS.map((p) => (
          <li key={p.id}>
            <button
              type="button"
              role="tab"
              aria-selected={selectedId === p.id}
              className={`camp2025-prices__date-tab ${selectedId === p.id ? 'camp2025-prices__date-tab--active' : ''}`}
              onClick={() => setSelectedId(p.id)}
            >
              {p.datesLabel}
            </button>
          </li>
        ))}
      </ul>

      <div className="camp2025-prices__detail">
        <h3 className="camp2025-prices__detail-title">{period.title}</h3>
        <p className="camp2025-prices__detail-date">{period.startDateText}</p>
        <p className="camp2025-prices__detail-subtitle">Что вас ждет на нашем лагере:</p>
        <ul className="camp2025-prices__detail-list">
          {period.bullets.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        <p className="camp2025-prices__detail-price">
          Стоимость спортпакета: <strong>{period.sportPackagePrice}</strong>
        </p>
      </div>

      <div className="camp2025-prices__hotel">
        <p className="camp2025-prices__intro">{period.hotel.intro}</p>
        <ul className="camp2025-prices__list">
          {period.hotel.datesList.map((item, i) => (
            <li key={i}>{item.text} {item.price}</li>
          ))}
        </ul>
        {/* <p className="camp2025-prices__alt">{period.hotel.alt}</p> */}
        {/* {period.hotel.showButtons && (
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
        )} */}
      </div>
    </section>
  )
}

export default Camp2025DatesPrices
