// client/src/components/PlayerInfoModal.jsx
import { useState } from 'react'

export default function PlayerInfoModal({ isOpen, onClose, player }) {
  if (!isOpen || !player) return null

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
      <div className="glass max-w-lg w-full mx-4 overflow-hidden">
        <div className="bg-gradient-to-r from-red-900 to-black p-6 border-b border-red-700">
          <h2 className="text-3xl font-bold text-white">Ваша Личность</h2>
        </div>

        <div className="p-8 space-y-8">
          <div>
            <div className="text-gray-400 text-sm mb-1">ПУБЛИЧНАЯ РОЛЬ</div>
            <div className="text-2xl font-semibold text-white">Министр Обороны</div>
          </div>

          <div>
            <div className="text-gray-400 text-sm mb-1">СКРЫТЫЙ АРХЕТИП</div>
            <div className="text-3xl font-bold text-red-400">Жёсткий Генерал</div>
            <p className="text-gray-300 mt-3 leading-relaxed">
              Прагматичный милитарист, ставящий порядок и силу превыше всего.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-black/50 p-4 rounded-xl">
              <div className="text-xs text-gray-400">ПАССИВНЫЕ БОНУСЫ</div>
              <ul className="mt-3 space-y-2 text-sm">
                <li className="flex justify-between"><span>+15 Военная мощь</span></li>
                <li className="flex justify-between"><span>-10 Внешнее давление</span></li>
              </ul>
            </div>

            <div className="bg-black/50 p-4 rounded-xl">
              <div className="text-xs text-gray-400">СПЕЦИАЛЬНАЯ СПОСОБНОСТЬ</div>
              <div className="mt-3">
                <div className="font-semibold text-amber-400">«Железный кулак»</div>
                <div className="text-xs text-gray-400 mt-1">1 раз за игру</div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-red-900/50">
          <button
            onClick={onClose}
            className="w-full py-4 bg-zinc-800 hover:bg-zinc-700 rounded-2xl font-semibold transition-all"
          >
            Закрыть досье
          </button>
        </div>
      </div>
    </div>
  )
}