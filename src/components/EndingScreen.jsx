import React, { useState } from 'react'

const ENDINGS = {
  zen: {
    title: "Zen Mum 🧘‍♀️",
    emoji: "🧘‍♀️",
    description: "You've mastered the art of peaceful parenting. Your children are calm, your stress is low, and your household runs on harmony rather than fear.",
    quote: "Inner peace is the greatest victory.",
    traits: ["Mindful parenting", "Low stress levels", "Harmonious household", "Emotionally balanced children"],
    color: "from-blue-400 to-cyan-500",
    bgColor: "bg-blue-100",
    borderColor: "border-blue-400"
  },
  balanced: {
    title: "Balanced Mum ⚖️",
    emoji: "⚖️",
    description: "You've found the sweet spot between discipline and freedom. Your children respect you but aren't afraid of you, and you manage to keep everyone happy most of the time.",
    quote: "Balance is not something you find, it's something you create.",
    traits: ["Fair discipline", "Reasonable expectations", "Happy family dynamics", "Flexible parenting style"],
    color: "from-green-400 to-emerald-500",
    bgColor: "bg-green-100",
    borderColor: "border-green-400"
  },
  tiger: {
    title: "Tiger Mum 🐅",
    emoji: "🐅",
    description: "You run a tight ship! Your children excel because they know failure is not an option. Your reputation in the mum community is legendary.",
    quote: "Excellence is not a skill, it's an attitude.",
    traits: ["High expectations", "Disciplined children", "Academic excellence", "Respected by other mums"],
    color: "from-orange-400 to-red-500",
    bgColor: "bg-orange-100",
    borderColor: "border-orange-400"
  },
  matriarch: {
    title: "Matriarch Supreme 👑",
    emoji: "👑",
    description: "You are the ultimate mum boss! Your children will rule the world, your household is a well-oiled machine, and other mums bow down to your superior parenting skills.",
    quote: "I didn't raise children, I raised future leaders.",
    traits: ["Absolute authority", "Maximum efficiency", "Future world leaders", "Legendary mum status"],
    color: "from-purple-400 to-pink-500",
    bgColor: "bg-purple-100",
    borderColor: "border-purple-400"
  }
}

const EndingScreen = ({ 
  character, 
  stats, 
  gameHistory, 
  calculateTigerMeter, 
  getEnding, 
  resetGame 
}) => {
  const [showHistory, setShowHistory] = useState(false)
  
  const tigerMeter = calculateTigerMeter()
  const endingType = getEnding()
  const ending = ENDINGS[endingType]

  const getFunniestMoments = () => {
    return gameHistory
      .filter(moment => moment.funny)
      .slice(0, 3) // Top 3 funniest moments
  }

  const getStatSummary = () => {
    const { tigerPoints, zenPoints, stress, reputation } = stats
    return [
      { name: "Tiger Power", value: tigerPoints, emoji: "🐅", color: "text-red-600" },
      { name: "Inner Peace", value: zenPoints, emoji: "🧘‍♀️", color: "text-blue-600" },
      { name: "Stress Level", value: stress, emoji: "😰", color: "text-yellow-600" },
      { name: "Reputation", value: reputation, emoji: "⭐", color: "text-purple-600" }
    ]
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        {/* Main Ending Display */}
        <div className={`${ending.bgColor} rounded-3xl p-8 shadow-2xl border-4 ${ending.borderColor} mb-8`}>
          <div className="text-center mb-8">
            <div className="text-9xl mb-4 animate-bounce">{ending.emoji}</div>
            <h1 className={`text-5xl font-bold bg-gradient-to-r ${ending.color} bg-clip-text text-transparent mb-4`}>
              {ending.title}
            </h1>
            <div className="text-2xl font-bold text-gray-700 mb-6">
              Tiger Meter: {tigerMeter}/100
            </div>
            <div className="stat-bar max-w-md mx-auto mb-6">
              <div 
                className={`stat-fill bg-gradient-to-r ${ending.color}`}
                style={{ width: `${tigerMeter}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white/80 rounded-2xl p-6 mb-6">
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              {ending.description}
            </p>
            <blockquote className="text-xl font-bold text-center italic text-gray-800 border-l-4 border-gray-400 pl-4">
              "{ending.quote}"
            </blockquote>
          </div>

          {/* Character Summary */}
          <div className="bg-white/80 rounded-2xl p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-700 mb-4 text-center">Your Mum Profile</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-4xl mb-2">
                  {character.look === 'classic' && '👩‍🦳'}
                  {character.look === 'corporate' && '👩‍💼'}
                  {character.look === 'insta' && '🤳'}
                  {character.look === 'grandma' && '👵'}
                </div>
                <div className="font-semibold text-gray-700">
                  {character.look === 'classic' && 'Classic Auntie'}
                  {character.look === 'corporate' && 'Corporate Mum'}
                  {character.look === 'insta' && 'Insta Mum'}
                  {character.look === 'grandma' && 'Grandma Energy'}
                </div>
              </div>
              <div>
                <div className="text-4xl mb-2">
                  {character.disciplineStyle === 'silent' && '😔'}
                  {character.disciplineStyle === 'verbal' && '🗣️'}
                  {character.disciplineStyle === 'lecture' && '📢'}
                  {character.disciplineStyle === 'physical' && '🎯'}
                </div>
                <div className="font-semibold text-gray-700">
                  {character.disciplineStyle === 'silent' && 'Silent Guilt'}
                  {character.disciplineStyle === 'verbal' && 'Verbal Uppercut'}
                  {character.disciplineStyle === 'lecture' && 'Lecture Combo'}
                  {character.disciplineStyle === 'physical' && 'Physical Precision'}
                </div>
              </div>
              <div>
                <div className="text-4xl mb-2">
                  {character.weapon === 'slipper' && '🥿'}
                  {character.weapon === 'spoon' && '🥄'}
                  {character.weapon === 'duster' && '🪶'}
                  {character.weapon === 'stare' && '👁️'}
                </div>
                <div className="font-semibold text-gray-700">
                  {character.weapon === 'slipper' && 'Flying Slipper'}
                  {character.weapon === 'spoon' && 'Wooden Spoon'}
                  {character.weapon === 'duster' && 'Feather Duster'}
                  {character.weapon === 'stare' && 'The Stare'}
                </div>
              </div>
            </div>
          </div>

          {/* Traits */}
          <div className="bg-white/80 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-gray-700 mb-4 text-center">Your Mum Traits</h3>
            <div className="grid grid-cols-2 gap-2">
              {ending.traits.map((trait, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-gray-700">{trait}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Final Stats */}
        <div className="bg-white/90 rounded-2xl p-6 shadow-xl mb-8">
          <h2 className="text-2xl font-bold text-tiger-red mb-6 text-center">Final Stats</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {getStatSummary().map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl mb-2">{stat.emoji}</div>
                <div className="font-semibold text-gray-700 mb-2">{stat.name}</div>
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Funniest Moments */}
        <div className="bg-white/90 rounded-2xl p-6 shadow-xl mb-8">
          <h2 className="text-2xl font-bold text-tiger-red mb-6 text-center">
            Funniest Moments 😂
          </h2>
          <div className="space-y-4">
            {getFunniestMoments().map((moment, index) => (
              <div key={index} className="bg-pink-100 rounded-xl p-4 border-2 border-pink-300">
                <div className="font-semibold text-pink-700 mb-2">
                  {moment.type === 'question' ? '📝 Scenario' : '🎮 Mini-game'}: {moment.scenario || moment.game}
                </div>
                <div className="text-gray-700 italic">"{moment.funny}"</div>
              </div>
            ))}
          </div>
          
          {gameHistory.length > 3 && (
            <div className="text-center mt-4">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="zen-button text-sm px-4 py-2"
              >
                {showHistory ? 'Hide' : 'Show'} All Moments
              </button>
            </div>
          )}
        </div>

        {/* Full History (if expanded) */}
        {showHistory && (
          <div className="bg-white/90 rounded-2xl p-6 shadow-xl mb-8">
            <h3 className="text-xl font-bold text-gray-700 mb-4">Complete Game History</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {gameHistory.map((moment, index) => (
                <div key={index} className="bg-gray-100 rounded-lg p-3 text-sm">
                  <div className="font-semibold text-gray-700">
                    Round {index + 1}: {moment.scenario || moment.game}
                  </div>
                  {moment.choice && (
                    <div className="text-blue-600">Choice: {moment.choice}</div>
                  )}
                  {moment.score !== undefined && (
                    <div className="text-green-600">Score: {moment.score}/{moment.maxScore}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Play Again Button */}
        <div className="text-center">
          <button
            onClick={resetGame}
            className="tiger-button text-2xl px-12 py-6 animate-pulse"
          >
            Play Again! 🔄
          </button>
          
          <div className="mt-6 text-center text-gray-600">
            <p>Thanks for playing Asian Mum Simulator! 🎮</p>
            <p className="text-sm mt-2">
              Share your {ending.title} result with friends! 
              {ending.emoji}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EndingScreen
