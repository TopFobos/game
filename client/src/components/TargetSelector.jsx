// client/src/components/TargetSelector.jsx
export default function TargetSelector({ isOpen, onClose, onSelect, players = [] }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
      <div className="glass w-full max-w-md p-8">
        <h3 className="text-xl font-bold text-red-400 mb-6">Выберите цель</h3>
        
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {players.map(player => (
            <div
              key={player.id}
              onClick={() => onSelect(player)}
              className="flex items-center gap-4 p-4 bg-black/50 hover:bg-red-950/30 border border-transparent hover:border-red-700 rounded-2xl cursor-pointer transition-all"
            >
              <div className="w-12 h-12 bg-zinc-700 rounded-full flex items-center justify-center text-2xl">
                👤
              </div>
              <div>
                <div className="font-semibold">{player.username}</div>
                <div className="text-sm text-gray-400">{player.publicRole}</div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full py-4 border border-gray-700 hover:bg-gray-900 rounded-2xl"
        >
          Отмена
        </button>
      </div>
    </div>
  )
}