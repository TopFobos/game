// client/src/components/EventLog.jsx
import { useState, useEffect } from 'react'
import { socket } from '../sockets/socket'

export default function EventLog({ roomId }) {
  const [events, setEvents] = useState([])

  useEffect(() => {
    socket.on('newEvent', (event) => {
      setEvents(prev => [event, ...prev].slice(0, 8)) // последние 8 событий
    })

    socket.on('turnResolved', (data) => {
      setEvents(prev => [{
        name: 'Конец хода',
        description: 'Параметры государства обновлены',
        severity: 2,
        time: new Date().toLocaleTimeString()
      }, ...prev])
    })

    return () => {
      socket.off('newEvent')
      socket.off('turnResolved')
    }
  }, [])

  return (
    <div className="glass p-6 h-[420px] flex flex-col">
      <h3 className="text-red-400 text-lg font-semibold mb-4">ХРОНИКА СОБЫТИЙ</h3>
      
      <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
        {events.length === 0 ? (
          <div className="text-gray-500 text-center py-10">
            Пока нет событий...
          </div>
        ) : (
          events.map((event, index) => (
            <div 
              key={index}
              className="bg-black/40 border-l-4 border-red-600 p-4 rounded-r-xl"
            >
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>{event.time || 'Текущий ход'}</span>
                <span className="text-red-400">●</span>
              </div>
              <div className="font-medium text-white">{event.name}</div>
              <div className="text-sm text-gray-400 mt-1 leading-snug">
                {event.description || event.flavorText}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}