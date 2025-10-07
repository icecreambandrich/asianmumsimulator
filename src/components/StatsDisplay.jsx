import React from 'react'

const StatsDisplay = ({ stats }) => {
  const getStatColor = (statName, value) => {
    const colors = {
      tigerPoints: value > 70 ? 'from-red-500 to-red-600' : value > 40 ? 'from-orange-500 to-orange-600' : 'from-yellow-500 to-yellow-600',
      zenPoints: value > 70 ? 'from-blue-500 to-blue-600' : value > 40 ? 'from-cyan-500 to-cyan-600' : 'from-gray-500 to-gray-600',
      stress: value > 70 ? 'from-red-600 to-red-700' : value > 40 ? 'from-yellow-500 to-yellow-600' : 'from-green-500 to-green-600',
      reputation: value > 70 ? 'from-purple-500 to-purple-600' : value > 40 ? 'from-indigo-500 to-indigo-600' : 'from-gray-500 to-gray-600'
    }
    return colors[statName] || 'from-gray-500 to-gray-600'
  }

  const getStatEmoji = (statName, value) => {
    const emojis = {
      tigerPoints: value > 70 ? '🐅' : value > 40 ? '🦁' : '🐱',
      zenPoints: value > 70 ? '🧘‍♀️' : value > 40 ? '😌' : '😵‍💫',
      stress: value > 70 ? '🤯' : value > 40 ? '😰' : '😎',
      reputation: value > 70 ? '⭐' : value > 40 ? '👍' : '👎'
    }
    return emojis[statName] || '❓'
  }

  const statLabels = {
    tigerPoints: 'Tiger Power',
    zenPoints: 'Inner Peace',
    stress: 'Stress Level',
    reputation: 'Reputation'
  }

  return (
    <div className="max-w-6xl mx-auto mb-6">
      <div className="bg-white/90 rounded-2xl p-6 shadow-xl">
        <h2 className="text-xl font-bold text-tiger-red mb-4 text-center">Mum Status 📊</h2>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(stats).map(([statName, value]) => (
            <div key={statName} className="text-center">
              <div className="text-3xl mb-2">
                {getStatEmoji(statName, value)}
              </div>
              <div className="font-semibold text-gray-700 mb-2">
                {statLabels[statName]}
              </div>
              <div className="stat-bar mb-2">
                <div 
                  className={`stat-fill bg-gradient-to-r ${getStatColor(statName, value)}`}
                  style={{ width: `${value}%` }}
                ></div>
              </div>
              <div className="text-sm font-bold text-gray-600">
                {value}/100
              </div>
            </div>
          ))}
        </div>

        {/* Tiger Meter Preview */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="text-center">
            <h3 className="text-lg font-bold text-tiger-red mb-2">Current Tiger Meter 🐅</h3>
            <div className="stat-bar max-w-md mx-auto">
              <div 
                className="stat-fill bg-gradient-to-r from-tiger-red to-red-700"
                style={{ 
                  width: `${Math.round((stats.tigerPoints * 0.4) + (stats.reputation * 0.3) + ((100 - stats.zenPoints) * 0.2) + (stats.stress * 0.1))}%` 
                }}
              ></div>
            </div>
            <div className="text-sm text-gray-600 mt-2">
              {Math.round((stats.tigerPoints * 0.4) + (stats.reputation * 0.3) + ((100 - stats.zenPoints) * 0.2) + (stats.stress * 0.1))}/100
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatsDisplay
