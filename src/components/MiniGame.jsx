import React, { useState, useEffect } from 'react'
import WakeKidsGame from './minigames/WakeKidsGame'
import LunchboxGame from './minigames/LunchboxGame'
import WhackAMessGame from './minigames/WhackAMessGame'
import AuntieChatGame from './minigames/AuntieChatGame'

const MINI_GAMES = [
  { component: WakeKidsGame, name: "Wake Up Call", emoji: "⏰" },
  { component: LunchboxGame, name: "Lunchbox Master", emoji: "🍱" },
  { component: WhackAMessGame, name: "Whack-a-Mess", emoji: "🧹" },
  { component: AuntieChatGame, name: "Auntie Chat Speed", emoji: "💬" }
]

const MiniGame = ({ round, character, onComplete, sceneComplete }) => {
  const [gameStarted, setGameStarted] = useState(false)
  const [gameResult, setGameResult] = useState(null)

  const currentGame = MINI_GAMES[round % MINI_GAMES.length]
  const GameComponent = currentGame.component

  const handleGameComplete = (result) => {
    setGameResult(result)
    
    // Calculate stat changes based on performance
    const statChanges = calculateStatChanges(result.score, result.maxScore)
    
    setTimeout(() => {
      onComplete({
        type: 'minigame',
        game: currentGame.name,
        score: result.score,
        maxScore: result.maxScore,
        performance: result.performance,
        funny: result.funny,
        statChanges
      })
    }, 2000)
  }

  const calculateStatChanges = (score, maxScore) => {
    const percentage = (score / maxScore) * 100
    
    if (percentage >= 80) {
      return { tigerPoints: 15, reputation: 10, stress: -5, zenPoints: 5 }
    } else if (percentage >= 60) {
      return { tigerPoints: 10, reputation: 5, stress: 0, zenPoints: 0 }
    } else if (percentage >= 40) {
      return { tigerPoints: 5, reputation: 0, stress: 5, zenPoints: -5 }
    } else {
      return { tigerPoints: -5, reputation: -5, stress: 10, zenPoints: -10 }
    }
  }

  const getPerformanceMessage = () => {
    if (!gameResult) return ""
    
    const percentage = (gameResult.score / gameResult.maxScore) * 100
    
    if (percentage >= 80) return "Tiger Mum Supreme! 🐅👑"
    if (percentage >= 60) return "Solid Mum Skills! 👍"
    if (percentage >= 40) return "Room for Improvement! 📈"
    return "Mum Training Required! 📚"
  }

  return (
    <div className="bg-white/90 rounded-2xl p-8 shadow-xl">
      {!gameStarted ? (
        /* Game Introduction */
        <div className="text-center">
          <div className="text-8xl mb-6">{currentGame.emoji}</div>
          <h2 className="text-3xl font-bold text-tiger-red mb-4">
            {currentGame.name}
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Time to test your mum skills! Show them what {character.look} energy can do!
          </p>
          
          <button
            onClick={() => setGameStarted(true)}
            className="tiger-button text-xl px-8 py-4 animate-pulse"
          >
            Start Game! 🎮
          </button>
        </div>
      ) : !gameResult ? (
        /* Active Game */
        <div>
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-tiger-red mb-2">
              {currentGame.name} {currentGame.emoji}
            </h3>
            <p className="text-gray-600">Show your mum powers!</p>
          </div>
          
          <GameComponent 
            character={character}
            onComplete={handleGameComplete}
          />
        </div>
      ) : (
        /* Game Results */
        <div className="text-center space-y-6">
          <div className="text-8xl mb-4">
            {gameResult.score >= gameResult.maxScore * 0.8 ? '🏆' : 
             gameResult.score >= gameResult.maxScore * 0.6 ? '🥈' : 
             gameResult.score >= gameResult.maxScore * 0.4 ? '🥉' : '😅'}
          </div>
          
          <h3 className="text-2xl font-bold text-tiger-red">
            {getPerformanceMessage()}
          </h3>
          
          <div className="bg-yellow-100 rounded-xl p-6 border-4 border-yellow-400">
            <h4 className="text-xl font-bold text-gray-700 mb-4">Your Performance:</h4>
            <div className="text-3xl font-bold text-tiger-red mb-2">
              {gameResult.score} / {gameResult.maxScore}
            </div>
            <div className="text-lg text-gray-700 mb-4">
              {gameResult.performance}
            </div>
            
            {gameResult.funny && (
              <div className="bg-pink-100 rounded-lg p-4 mt-4">
                <h5 className="font-bold text-mum-pink mb-2">Mum Moment 😂</h5>
                <p className="text-gray-700 italic">{gameResult.funny}</p>
              </div>
            )}
          </div>

          {/* Stat Changes Preview */}
          <div className="bg-blue-100 rounded-xl p-4">
            <h4 className="font-bold text-blue-700 mb-2">Stat Changes:</h4>
            <div className="flex justify-center space-x-4 text-sm">
              {Object.entries(calculateStatChanges(gameResult.score, gameResult.maxScore)).map(([stat, change]) => (
                <span key={stat} className={`font-semibold ${change > 0 ? 'text-green-600' : change < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                  {stat}: {change > 0 ? '+' : ''}{change}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MiniGame
