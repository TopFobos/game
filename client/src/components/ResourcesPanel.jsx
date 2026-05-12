// client/src/components/ResourcesPanel.jsx
export default function ResourcesPanel() {
  const resources = {
    influence: 14,
    finance: 9,
    agents: 4
  }

  return (
    <div className="glass p-6">
      <h3 className="text-red-400 text-lg font-semibold mb-5">ВАШИ РЕСУРСЫ</h3>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center bg-black/40 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-amber-500/20 rounded-full flex items-center justify-center text-amber-400">👥</div>
            <div>
              <div className="text-sm text-gray-400">Влияние</div>
              <div className="text-2xl font-bold">{resources.influence}</div>
            </div>
          </div>
          <div className="text-xs text-amber-400">+5 / ход</div>
        </div>

        <div className="flex justify-between items-center bg-black/40 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400">💰</div>
            <div>
              <div className="text-sm text-gray-400">Финансы</div>
              <div className="text-2xl font-bold">{resources.finance}</div>
            </div>
          </div>
          <div className="text-xs text-emerald-400">+3 / ход</div>
        </div>

        <div className="flex justify-between items-center bg-black/40 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center text-red-400">🕵️</div>
            <div>
              <div className="text-sm text-gray-400">Агенты</div>
              <div className="text-2xl font-bold">{resources.agents}</div>
            </div>
          </div>
          <div className="text-xs text-red-400">+1 / ход</div>
        </div>
      </div>
    </div>
  )
}