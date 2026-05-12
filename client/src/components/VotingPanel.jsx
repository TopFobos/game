// client/src/components/VotingPanel.jsx
import { useState } from 'react'
import { socket } from '../sockets/socket'

export default function VotingPanel({ roomId, isActive }) {
  const [vote, setVote] = useState(null)
  const [hasVoted, setHasVoted] = useState(false)

  const options = [
    { id: 'support', label: 'Поддержать', color: 'emerald' },
    { id: 'oppose', label: 'Против', color: 'red' },
    { id: 'abstain', label: 'Воздержаться', color: 'gray' }
  ]

  const castVote = () => {
    if (!vote) return
    socket.emit('castVote', { roomId, vote })
    setHasVoted(true)
  }

  if (!isActive) {
    return (
      <div className="glass p-8 text-center">
        <p className="text-gray-400">Голосование сейчас не активно</p>
      </div>
    )
  }

  return (
    <div className="glass p-8">
      <h3 className="text-red-400 text-2xl font-bold mb-2">ГОСУДАРСТВЕННЫЙ СОВЕТ</h3>
      <p className="text-gray-400 mb-8">Как вы проголосуете по ключевому вопросу?</p>

      <div className="space-y-4">
        {options.map(opt => (
          <button
            key={opt.id}
            onClick={() => setVote(opt.id)}
            className={`w-full p-5 rounded-2xl border-2 transition-all text-left ${
              vote === opt.id 
                ? `border-${opt.color}-500 bg-${opt.color}-950/50` 
                : 'border-gray-700 hover:border-gray-600'
            }`}
          >
            <div className={`text-xl font-semibold ${vote === opt.id ? `text-${opt.color}-400` : ''}`}>
              {opt.label}
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={castVote}
        disabled={!vote || hasVoted}
        className="mt-8 w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-700 py-5 rounded-2xl font-bold text-xl transition-all"
      >
        {hasVoted ? 'ГОЛОС ЗАЧТЁН' : 'ОТДАТЬ ГОЛОС'}
      </button>
    </div>
  )
}