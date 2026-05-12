// client/src/components/ParametersPanel.jsx
export default function ParametersPanel({ gameState }) {
  const params = gameState?.countryState?.openParams || {
    economy: 50, stability: 50, discontent: 50, fear: 50,
    corruption: 50, legitimacy: 50, militaryPower: 50,
    externalPressure: 50, radicalization: 50, internationalImage: 50
  }

  const getColor = (value) => {
    if (value >= 80) return 'text-emerald-400'
    if (value >= 60) return 'text-green-400'
    if (value >= 40) return 'text-yellow-400'
    if (value >= 20) return 'text-orange-400'
    return 'text-red-500'
  }

  const getLabel = (value) => {
    if (value >= 80) return 'Отлично'
    if (value >= 60) return 'Хорошо'
    if (value >= 40) return 'Средне'
    if (value >= 20) return 'Плохо'
    return 'Критично'
  }

  const parameters = [
    { key: 'economy', label: 'Экономика' },
    { key: 'stability', label: 'Стабильность' },
    { key: 'discontent', label: 'Недовольство' },
    { key: 'fear', label: 'Страх' },
    { key: 'corruption', label: 'Коррупция' },
    { key: 'legitimacy', label: 'Легитимность' },
    { key: 'militaryPower', label: 'Военная мощь' },
    { key: 'externalPressure', label: 'Внешнее давление' },
    { key: 'radicalization', label: 'Радикализация' },
    { key: 'internationalImage', label: 'Международный имидж' },
  ]

  return (
    <div className="glass p-6">
      <h2 className="text-red-400 text-xl font-bold mb-6 border-b border-red-900/50 pb-3">
        СОСТОЯНИЕ РЕСПУБЛИКИ
      </h2>

      <div className="space-y-5">
        {parameters.map(({ key, label }) => (
          <div key={key} className="flex items-center gap-4">
            <div className="w-40 text-sm text-gray-400">{label}</div>
            
            <div className="flex-1 h-2.5 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-700 ${getColor(params[key])}`}
                style={{ width: `${params[key]}%` }}
              />
            </div>

            <div className="w-16 text-right font-mono">
              <span className={getColor(params[key])}>{params[key]}</span>
              <span className="text-xs text-gray-500 ml-1">/100</span>
            </div>

            <div className={`text-xs w-20 ${getColor(params[key])}`}>
              {getLabel(params[key])}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}