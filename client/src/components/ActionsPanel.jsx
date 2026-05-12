// client/src/components/ActionsPanel.jsx
import { useState, useEffect } from 'react'
import { socket } from '../sockets/socket'

const availableActions = [
  { id: 'bribe_faction', name: 'Подкуп фракции', cost: 1, icon: '🤑' },
  { id: 'gather_compromat', name: 'Сбор компромата', cost: 1, icon: '📜' },
  { id: 'disinformation_campaign', name: 'Кампания дезинформации', cost: 2, icon: '📻' },
  { id: 'strengthen_military', name: 'Укрепить военные связи', cost: 1, icon: '⚔️' },
  { id: 'coup_preparation', name: 'Подготовка переворота', cost: 3, icon: '🗡️' },
  { id: 'media_manipulation', name: 'Манипуляция СМИ', cost: 1, icon: '📺' },
  { id: 'spread_rumors', name: 'Распространение слухов', cost: 1, icon: '🗣️' },
]

export default function ActionsPanel({ roomId }) {
  const [selectedAction, setSelectedAction] = useState(null)
  const [target, setTarget] = useState('')
  const [isPerforming, setIsPerforming] = useState(false)
  const [lastResult, setLastResult] = useState(null)

  const performAction = () => {
    if (!selectedAction || !roomId) return

    setIsPerforming(true)

    socket.emit('performSecretAction', {
      roomId,
      actionId: selectedAction.id,
      target: target.trim() || undefined
    })
  }

  useEffect(() => {
    const handleActionResult = (result) => {
      console.log('Результат действия:', result)
      setLastResult(result)
      setIsPerforming(false)

      // Автосброс через 2 секунды
      setTimeout(() => {
        setSelectedAction(null)
        setTarget('')
        setLastResult(null)
      }, 1800)
    }

    socket.on('actionResult', handleActionResult)
    socket.on('actionError', (err) => {
      setLastResult({ success: false, message: err.message })
      setIsPerforming(false)
    })

    return () => {
      socket.off('actionResult', handleActionResult)
      socket.off('actionError')
    }
  }, [])

  return (
    <div className="glass p-6 rounded-3xl">
      <h3 className="text-red-400 text-xl font-bold mb-6">ТАЙНЫЕ ДЕЙСТВИЯ</h3>
      
      <div className="space-y-3 mb-6">
        {availableActions.map((action) => (
          <div
            key={action.id}
            onClick={() => setSelectedAction(action)}
            className={`p-4 rounded-2xl border cursor-pointer transition-all hover:scale-[1.02] ${
              selectedAction?.id === action.id 
                ? 'border-red-500 bg-red-950/60' 
                : 'border-gray-800 hover:border-red-900/60'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="text-4xl">{action.icon}</div>
              <div className="flex-1">
                <div className="font-semibold text-white">{action.name}</div>
                <div className="text-sm text-gray-400">Стоимость: {action.cost} очка</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedAction && (
        <div className="mt-6 p-5 bg-black/70 border border-red-900/50 rounded-2xl">
          <p className="text-red-400 font-medium mb-3">Выбрано: {selectedAction.name}</p>
          
          <input
            type="text"
            placeholder="Цель (имя игрока, опционально)"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 mb-4 outline-none focus:border-red-600"
          />

          <button
            onClick={performAction}
            disabled={isPerforming}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-700 py-4 rounded-2xl font-bold text-lg transition-all"
          >
            {isPerforming ? 'Выполняется...' : 'ВЫПОЛНИТЬ ДЕЙСТВИЕ'}
          </button>
        </div>
      )}

      {lastResult && (
        <div className={`mt-4 p-4 rounded-2xl text-center font-medium ${
          lastResult.success 
            ? 'bg-green-900/50 border border-green-600 text-green-300' 
            : 'bg-red-900/50 border border-red-600 text-red-300'
        }`}>
          {lastResult.success ? '✅ Действие успешно!' : `❌ ${lastResult.message || 'Действие провалилось'}`}
        </div>
      )}
    </div>
  )
}