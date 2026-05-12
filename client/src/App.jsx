// client/src/App.jsx
import { useState } from 'react'
import Lobby from './pages/Lobby'
import GameRoom from './pages/GameRoom'

function App() {
  const [screen, setScreen] = useState('lobby') // 'lobby' | 'game'
  const [roomId, setRoomId] = useState(null)
  const [username, setUsername] = useState('')
  const [isCreator, setIsCreator] = useState(false)

  return (
    <div className="min-h-screen bg-black">
      {screen === 'lobby' && (
        <Lobby 
          onGameStart={(id, user, creator = false) => {
            setRoomId(id)
            setUsername(user)
            setIsCreator(creator)
            setScreen('game')
          }} 
        />
      )}

      {screen === 'game' && roomId && (
        <GameRoom 
          roomId={roomId} 
          username={username} 
          isCreator={isCreator} 
        />
      )}
    </div>
  )
}

export default App