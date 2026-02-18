import { useState } from 'react'

const CAMP_PERIODS = [
  {
    id: '28.03-05.04',
    datesLabel: 'Март-Апрель',
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
      'При размещении в Си-отеле — восстановление в SPA и потрясающие завтраки.',
      'И, конечно же, безлимитный волейбол!',
    ],
    sportPackagePrice: '38.000₽',
    hotel: {
      intro: 'Проживание в Си-отеле, восстановление в SPA и потрясающие завтраки',
      options: [
        { text: 'Проживание в номере категории - Standard от 57.750р/чел на период кемпа (при двухместном размещении)' },
      ],
      alt: 'Альтернативные варианты размещения в других отелях',
      showButtons: true,
    },
  },
  {
    id: '01.05-09.05',
    datesLabel: 'Май',
    title: 'Лагерь пляжного волейбола в Сочи',
    startDateText: 'Старт: 01.05.2026-09.05.2026',
    bullets: [
      '9 уникальных тренировок от профессионального тренера Альберта Строева ',
      '2 игровых/турнирных дня',
      'Группы разных уровней: light, medium, hard',
      'Кастомный мерч для каждого участника',
      'Уникальные награды и подарки для всех участников',
      'Возможность завести новые знакомства и дружбу',
      'В нашем распоряжении — лучшие оборудованные корты на Черноморском побережье',
      'При размещении в Си-отеле — восстановление в SPA и потрясающие завтраки',
      'И, конечно же, безлимитный волейбол!',
    ],
    sportPackagePrice: '38.000р',
    hotel: {
      intro: 'Проживание в Си-отеле, восстановление в SPA и потрясающие завтраки',
      options: [
        { text: 'Проживание в номере категории - Standard от 60.000р/чел на период кемпа (при двухместном размещении)' },
        { text: 'Проживание в номере категории - Улучшенный стандарт 70.000р/чел. на период кемпа (при двухместном размещении)' },
      ],
      alt: 'Альтернативные варианты размещения в других отелях',
      showButtons: true,
    },
  },
  {
    id: '31.08-07.09',
    datesLabel: 'Август-Сентябрь',
    title: 'Лагерь в период Бархатного сезона в Сочи',
    startDateText: 'Старт: 31.08.26-07.09.26',
    bullets: [
      '8 уникальных тренировок от профессионального тренера Альберта Строева ',
      '2 игровых/турнирных дня',
      'Группы разных уровней подготовки: light, medium, hard',
      'Кастомный мерч для каждого участника',
      'Уникальные награды и подарки для всех участников',
      'Возможность завести новые знакомства и дружбу',
      'В нашем распоряжении — лучшие оборудованные корты на Черноморском побережье',
      'При размещении в Си-отеле — восстановление в SPA и потрясающие завтраки',
      'И, конечно же, безлимитный волейбол!',
    ],
    sportPackagePrice: '36.000р',
    hotel: {
      intro: 'Проживание в Си-отеле, восстановление в SPA и потрясающие завтраки',
      options: [
        { text: 'Проживание в номере категории - Standard от 57.750р/чел на период кемпа (при двухместном размещении)' },
        { text: 'Проживание в номере категории - Улучшенный стандарт 66.500р/чел. на период кемпа (при двухместном размещении) ' }
      ],
      alt: 'Альтернативные варианты размещения в других отелях',
      showButtons: true,
    },
  },
  {
    id: '27.09-05.10',
    datesLabel: 'Сентябрь-Октябрь',
    title: 'Лагерь пляжного волейбола в Сочи',
    startDateText: 'Старт: 27.09.26-05.10.26',
    bullets: [
      '9 уникальных тренировок от профессионального тренера Альберта Строева.',
      '2 игровых/турнирных дня.',
      'Группы разных уровней подготовки: light, medium, hard',
      'Кастомный мерч для каждого участника.',
      'Уникальные награды и подарки для всех участников.',
      'Возможность завести новые знакомства и дружбу.',
      'В нашем распоряжении — лучшие оборудованные корты на Черноморском побережье.',
      'При размещении в Си-отеле — восстановление в SPA и потрясающие завтраки.',
      'И, конечно же, безлимитный волейбол!',
    ],
    sportPackagePrice: '38.000р',
    hotel: {
      intro: 'Проживание в Си-отеле, восстановление в SPA и потрясающие завтраки',
      options: [
        { text: 'Проживание в номере категории - Улучшенный стандарт 58.000р/чел. на период кемпа (при двухместном размещении) ' },
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
        <ul className="camp2025-prices__list camp2025-prices__list--options">
          {period.hotel.options.map((option, i) => (
            <li key={i}>{option.text}</li>
          ))}
        </ul>
        {/* //тест */}
        {/* <p className="camp2025-prices__intro">{period.hotel.intro}</p>  */} 
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
