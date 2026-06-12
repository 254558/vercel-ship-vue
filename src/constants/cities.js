export const CITIES = {
  london: { code: 'LDN', label: 'London', date: '2026-06-17' },
  berlin: { code: 'BER', label: 'Berlin', date: '2026-06-25' },
  nyc: { code: 'NYC', label: 'New York City', date: '2026-06-30' },
  sydney: { code: 'SYD', label: 'Sydney', date: '2026-07-30' },
  sf: { code: 'SF', label: 'San Francisco', date: '2026-10-15' },
}

export const cityList = Object.entries(CITIES).map(([slug, city]) => ({
  label: city.label,
  dateText: city.date.slice(5).replace('-', '.'),
  date: city.date,
  path: `/ship/${slug}`,
  code: city.code,
  slug,
}))
