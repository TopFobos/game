// client/src/components/EndGameScreen.jsx
export default function EndGameScreen({ reason, winner }) {
  const messages = {
    revolution: "Революция захлестнула страну...",
    total_collapse: "Государство полностью рухнуло",
    civil_war: "Гражданская война разорвала республику",
    victory: "Вы достигли абсолютной власти!"
  }

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="text-center max-w-2xl px-8">
        <div className="text-8xl mb-8">
          {reason === 'victory' ? '👑' : '☠️'}
        </div>
        
        <h1 className="text-6xl font-black mb-6 text-red-500 tracking-widest">
          ИГРА ОКОНЧЕНА
        </h1>
        
        <p className="text-3xl mb-10 text-gray-300">
          {messages[reason] || "Республика пала"}
        </p>

        {winner && (
          <div className="mb-12">
            <div className="text-2xl text-emerald-400">Победитель:</div>
            <div className="text-4xl font-bold mt-2">{winner}</div>
          </div>
        )}

        <button 
          onClick={() => window.location.reload()}
          className="bg-red-600 hover:bg-red-700 text-white px-16 py-6 rounded-2xl text-xl font-bold transition-all"
        >
          ИГРАТЬ СНОВА
        </button>
      </div>
    </div>
  )
}