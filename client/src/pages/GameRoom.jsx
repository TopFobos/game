// client/src/pages/GameRoom.jsx
import { useState, useEffect, useRef } from 'react'
import { socket } from '../sockets/socket'
import ParametersPanel from '../components/ParametersPanel'
import ResourcesPanel from '../components/ResourcesPanel'
import ActionsPanel from '../components/ActionsPanel'
import EventLog from '../components/EventLog'
import PlayerInfoModal from '../components/PlayerInfoModal'

export default function GameRoom({ roomId, username, isCreator = false }) {
  const [phase, setPhase] = useState('lobby')
  const [turn, setTurn] = useState(0)
  const [events, setEvents] = useState([])
  const [showPlayerModal, setShowPlayerModal] = useState(false)
  const [isHost, setIsHost] = useState(isCreator)
  const [playerCount, setPlayerCount] = useState(1)

  const hasInitialized = useRef(false)

  useEffect(() => {
    if (!roomId || !username || hasInitialized.current) return
    hasInitialized.current = true

    if (isCreator) {
      socket.emit('getRoomInfo', { roomId })
    } else {
      socket.emit('joinRoom', { roomId, username })
    }

    socket.on('phaseChanged', (data) => {
      console.log('📍 Фаза изменилась:', data)
      setPhase(data.phase || 'lobby')
      setTurn(data.turn || 1)
    })

    socket.on('newEvent', (event) => {
      setEvents(prev => [event, ...prev].slice(0, 15))
    })

    socket.on('playerJoined', () => {
      setPlayerCount(prev => Math.min(6, prev + 1))
    })

    socket.on('roomInfo', (info) => {
      if (info.playerCount !== undefined) setPlayerCount(info.playerCount)
      setIsHost(!!info.isHost)
      if (info.phase) setPhase(info.phase)
      if (info.turn !== undefined) setTurn(info.turn)
    })

    socket.on('refreshRoomInfo', () => {
      socket.emit('getRoomInfo', { roomId })
    })

    const timer = setTimeout(() => socket.emit('getRoomInfo', { roomId }), 600)

    return () => {
      clearTimeout(timer)
      socket.off('phaseChanged')
      socket.off('newEvent')
      socket.off('playerJoined')
      socket.off('roomInfo')
      socket.off('refreshRoomInfo')
    }
  }, [roomId, username, isCreator])

  const startGame = () => {
    socket.emit('startGame', { roomId })
  }

  return (
    <div className="min-h-screen bg-[#050505]">
      <div className="border-b border-red-900 bg-black/90 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-3xl font-black tracking-widest text-red-500">ТЕНЬ РЕСПУБЛИКИ</h1>
            <div className="px-4 py-1 bg-red-950 text-red-400 text-sm font-mono rounded">#{roomId}</div>
          </div>

          <div className="flex items-center gap-8 text-sm">
            <div>ИГРОКОВ: <span className="text-white font-bold text-lg">{playerCount}/6</span></div>
            <div>ХОД <span className="text-2xl font-bold text-white ml-2">{turn}</span></div>
            <div className="uppercase tracking-widest text-red-400 font-semibold">
              {phase.toUpperCase()}
            </div>
          </div>

          <button onClick={() => setShowPlayerModal(true)} className="text-sm border border-red-700 hover:bg-red-950 px-6 py-2.5 rounded-xl transition">
            МОЁ ДОСЬЕ
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-8 grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-5">
          <ParametersPanel />
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-6">
          <EventLog events={events} />

          {phase === 'lobby' && isHost && (
            <div className="glass p-10 text-center border-2 border-red-500/40 rounded-3xl">
              <h3 className="text-3xl font-bold mb-4 text-red-400">Вы — ведущий игры</h3>
              <p className="text-xl mb-8">В комнате: <span className="text-white font-bold">{playerCount}</span> игроков</p>
              
              <button
                onClick={startGame}
                className="w-full bg-red-600 hover:bg-red-700 py-8 rounded-2xl text-3xl font-black tracking-wider transition-all active:scale-95"
              >
                НАЧАТЬ ИГРУ
              </button>
            </div>
          )}
        </div>

        <div className="col-span-12 lg:col-span-3 space-y-6">
          <ResourcesPanel />
          {/* Показываем ActionsPanel только после начала игры */}
          {phase !== 'lobby' && <ActionsPanel roomId={roomId} />}
        </div>
      </div>

      <PlayerInfoModal isOpen={showPlayerModal} onClose={() => setShowPlayerModal(false)} />
    </div>
  )
}