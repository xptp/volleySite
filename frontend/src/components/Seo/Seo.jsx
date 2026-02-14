import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'

const SITE_URL = ''

const SEO_CONFIG = {
  '/': {
    title: 'Пляжный волейбол Сочи | Лагерь пляжного волейбола | STROEV TEAM',
    description: 'Пляжный волейбол в Сочи. Лагерь пляжного волейбола на побережье Турции. Тренировки с чемпионом России Альбертом Строевым. Запись на занятия.',
    keywords: 'пляжный волейбол, пляжный волейбол сочи, лагерь пляжного волейбола, лагерь пляжного волейбола сочи',
  },
  '/camp2025': {
    title: 'Лагерь пляжного волейбола Сочи 2026 | Пляжный волейбол на побережье Турции',
    description: 'Лагерь пляжного волейбола в Сочи и на побережье Турции. Выездной тренировочный лагерь пляжного волейбола с чемпионом России. Даты, цены, запись.',
    keywords: 'лагерь пляжного волейбола, лагерь пляжного волейбола сочи, пляжный волейбол, пляжный волейбол сочи',
  },
  '/training': {
    title: 'Тренировки по пляжному волейболу Сочи | Групповые и индивидуальные занятия',
    description: 'Тренировки по пляжному волейболу в Сочи. Групповые, сплит и индивидуальные занятия с тренером — чемпионом России. Пляжный волейбол для любого уровня.',
    keywords: 'пляжный волейбол сочи, тренировки пляжный волейбол, пляжный волейбол',
  },
  '/coach': {
    title: 'Тренер по пляжному волейболу Сочи | Альберт Строев — чемпион России',
    description: 'Тренер по пляжному волейболу в Сочи Альберт Строев. Многократный чемпион России. Лагерь пляжного волейбола, тренировки в спортивном клубе STROEV TEAM.',
    keywords: 'пляжный волейбол сочи, тренер пляжный волейбол, лагерь пляжного волейбола',
  },
}

const DEFAULT = SEO_CONFIG['/']

function Seo() {
  const { pathname } = useLocation()
  const path = pathname.replace(/\/$/, '') || '/'
  const seo = SEO_CONFIG[path] ?? DEFAULT
  const canonical = `${SITE_URL}${pathname === '/' ? '' : pathname}`

  return (
    <Helmet>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:url" content={canonical} />
    </Helmet>
  )
}

export default Seo
