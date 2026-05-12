// client/src/pages/Lobby.jsx
import { useState, useEffect } from 'react'
import { socket } from '../sockets/socket'

export default function Lobby({ onGameStart }) {
  const [username, setUsername] = useState('')
  const [roomIdInput, setRoomIdInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [mode, setMode] = useState('create')

  useEffect(() => {
    socket.on('connect_error', (err) => console.error('Socket error:', err))
    return () => socket.off('connect_error')
  }, [])

  const createRoom = () => {
    if (!username.trim()) {
      alert('Введите ваше имя!')
      return
    }

    setIsLoading(true)

    socket.emit('createRoom', { username: username.trim() }, (response) => {
      setIsLoading(false)
      if (response?.success) {
        onGameStart(response.roomId, username.trim(), true) // true = создатель
      } else {
        alert(response?.error || 'Не удалось создать комнату')
      }
    })
  }

  const joinRoom = () => {
    if (!username.trim() || !roomIdInput.trim()) {
      alert('Заполните все поля')
      return
    }

    setIsLoading(true)
    socket.emit('joinRoom', {
      roomId: roomIdInput.trim().toUpperCase(),
      username: username.trim()
    }, (response) => {
      setIsLoading(false)
      if (response?.success) {
        onGameStart(roomIdInput.trim().toUpperCase(), username.trim(), false) // false = не создатель
      } else {
        alert(response?.error || 'Не удалось присоединиться')
      }
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-red-950 to-black flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <div className="text-center mb-12">
          <div className="inline-block mb-4 px-6 py-2 bg-red-900/30 border border-red-700 rounded-full text-red-400 text-sm tracking-[4px]">
            ПОЛИТИЧЕСКИЙ ТРИЛЛЕР
          </div>
          <h1 className="text-6xl font-black tracking-tighter text-white mb-3">
            ТЕНЬ<br />РЕСПУБЛИКИ
          </h1>
        </div>

        <div className="glass p-10 shadow-2xl">
          <div className="flex gap-2 mb-8 bg-black/50 rounded-xl p-1">
            <button 
              onClick={() => setMode('create')} 
              className={`flex-1 py-3 rounded-xl font-medium transition ${mode === 'create' ? 'bg-red-600 text-white' : 'text-gray-400 hover:bg-zinc-900'}`}
            >
              Создать игру
            </button>
            <button 
              onClick={() => setMode('join')} 
              className={`flex-1 py-3 rounded-xl font-medium transition ${mode === 'join' ? 'bg-red-600 text-white' : 'text-gray-400 hover:bg-zinc-900'}`}
            >
              Присоединиться
            </button>
          </div>

          <input
            type="text"
            placeholder="Ваше имя"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700 focus:border-red-600 rounded-2xl px-6 py-4 text-lg mb-6 outline-none"
          />

          {mode === 'join' && (
            <input
              type="text"
              placeholder="ID комнаты"
              value={roomIdInput}
              onChange={(e) => setRoomIdInput(e.target.value.toUpperCase())}
              className="w-full bg-zinc-900 border border-zinc-700 focus:border-red-600 rounded-2xl px-6 py-4 text-lg mb-6 outline-none font-mono"
            />
          )}

          <button
            onClick={mode === 'create' ? createRoom : joinRoom}
            disabled={isLoading}
            className="w-full mt-6 bg-red-600 hover:bg-red-700 disabled:bg-gray-700 py-5 rounded-2xl text-xl font-bold transition-all active:scale-95"
          >
            {isLoading ? 'Подключение...' : mode === 'create' ? 'Создать новую игру' : 'Войти в комнату'}
          </button>
        </div>
      </div>
    </div>
  )
}