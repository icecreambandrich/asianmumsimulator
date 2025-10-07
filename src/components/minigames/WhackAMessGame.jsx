import React, { useState, useEffect } from 'react'

const MESS_ITEMS = [
  { id: 'sock', emoji: '🧦', points: 1, speed: 2000 },
  { id: 'toy', emoji: '🧸', points: 1, speed: 2500 },
  { id: 'book', emoji: '📚', points: 2, speed: 1800 },
  { id: 'shoe', emoji: '👟', points: 1, speed: 2200 },
  { id: 'cup', emoji: '☕', points: 3, speed: 1500 }, // Faster, worth more
  { id: 'paper', emoji: '📄', points: 1, speed: 2800 },
  { id: 'crumb', emoji: '🍞', points: 2, speed: 1600 },
  { id: 'dust', emoji: '💨', points: 3, speed: 1200 } // Fastest, worth most
]

const GRID_SIZE = 9 // 3x3 grid

const WhackAMessGame = ({ character, onComplete }) => {
  const [gameState, setGameState] = useState('instructions')
  const [timeLeft, setTimeLeft] = useState(30)
  const [score, setScore] = useState(0)
  const [activeItems, setActiveItems] = useState({})
  const [gameInterval, setGameInterval] = useState(null)

  useEffect(() => {
    if (gameState === 'playing') {
      // Start timer
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('complete')
            return 0
          }
          return prev - 1
        })
      }, 1000)

      // Start spawning mess items
      const spawnInterval = setInterval(() => {
        spawnMessItem()
      }, 800)

      setGameInterval(spawnInterval)

      return () => {
        clearInterval(timer)
        clearInterval(spawnInterval)
      }
    }
  }, [gameState])

  useEffect(() => {
    if (gameState === 'complete') {
      if (gameInterval) {
        clearInterval(gameInterval)
      }
      
      const maxScore = 50 // Estimated max possible score
      const performance = score >= 40 ?
        "Spotless! You're a cleaning machine!" :
        score >= 30 ?
        "Great job! House is mostly tidy!" :
        score >= 20 ?
        "Not bad! Still some mess around though..." :
        "Oh dear! The house is still chaotic!"

      const funny = score >= 40 ?
        "Neighbor: 'How is your house always so clean?' You: 'Secret ninja cleaning skills!'" :
        score >= 20 ?
        "Child: 'Where did all my stuff go?' You: 'I cleaned it!' Child: 'But I knew where everything was!'" :
        "You: 'I cleaned all day!' Family: 'Where?' You: 'It was clean for 5 minutes!'"

      onComplete({
        score,
        maxScore,
        performance,
        funny
      })
    }
  }, [gameState, score, gameInterval])

  const spawnMessItem = () => {
    const availableSpots = []
    for (let i = 0; i < GRID_SIZE; i++) {
      if (!activeItems[i]) {
        availableSpots.push(i)
      }
    }

    if (availableSpots.length === 0) return

    const spot = availableSpots[Math.floor(Math.random() * availableSpots.length)]
    const messItem = MESS_ITEMS[Math.floor(Math.random() * MESS_ITEMS.length)]

    setActiveItems(prev => ({
      ...prev,
      [spot]: messItem
    }))

    // Auto-remove after item's speed duration
    setTimeout(() => {
      setActiveItems(prev => {
        const newItems = { ...prev }
        delete newItems[spot]
        return newItems
      })
    }, messItem.speed)
  }

  const whackMess = (spot) => {
    const item = activeItems[spot]
    if (!item) return

    setScore(prev => prev + item.points)
    setActiveItems(prev => {
      const newItems = { ...prev }
      delete newItems[spot]
      return newItems
    })
  }

  const startGame = () => {
    setGameState('playing')
    setTimeLeft(30)
    setScore(0)
    setActiveItems({})
  }

  if (gameState === 'instructions') {
    return (
      <div className="text-center space-y-6">
        <div className="bg-orange-100 rounded-xl p-6">
          <h3 className="text-xl font-bold text-orange-700 mb-4">Instructions:</h3>
          <div className="text-left space-y-2 text-gray-700">
            <p>🎯 <strong>Goal:</strong> Clean up the mess as fast as possible!</p>
            <p>👆 <strong>How:</strong> Click on mess items to clean them</p>
            <p>⚡ <strong>Speed:</strong> Items disappear if you're too slow!</p>
            <p>💎 <strong>Points:</strong> Different items are worth different points</p>
            <p>⏰ <strong>Time Limit:</strong> 30 seconds</p>
            <p>🧹 <strong>Weapon:</strong> Use your {character.weapon === 'duster' ? 'feather duster' : 'cleaning skills'}!</p>
          </div>
        </div>
        
        <button
          onClick={startGame}
          className="tiger-button text-lg px-6 py-3"
        >
          Start Cleaning! 🧹
        </button>
      </div>
    )
  }

  if (gameState === 'playing') {
    return (
      <div className="space-y-4">
        {/* Game Stats */}
        <div className="flex justify-between items-center bg-gray-100 rounded-lg p-4">
          <div className="text-lg font-bold text-tiger-red">
            Time: {timeLeft}s
          </div>
          <div className="text-lg font-bold text-orange-600">
            Score: {score}
          </div>
        </div>

        {/* Game Grid */}
        <div className="bg-gradient-to-b from-yellow-100 to-orange-100 rounded-xl p-6 border-4 border-orange-300">
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
            {Array.from({ length: GRID_SIZE }, (_, index) => {
              const item = activeItems[index]
              return (
                <button
                  key={index}
                  onClick={() => whackMess(index)}
                  className={`aspect-square rounded-xl border-4 border-orange-200 transition-all duration-200 ${
                    item 
                      ? 'bg-red-200 hover:bg-red-300 scale-110 animate-pulse shadow-lg' 
                      : 'bg-white hover:bg-gray-50'
                  }`}
                >
                  {item && (
                    <div className="text-4xl animate-bounce">
                      {item.emoji}
                    </div>
                  )}
                </button>
              )
            })}
          </div>
          
          <div className="text-center mt-4 text-sm text-orange-700">
            Click the mess items before they disappear!
          </div>
        </div>

        {/* Weapon Display */}
        <div className="text-center">
          <div className="text-4xl mb-2">
            {character.weapon === 'slipper' && '🥿'}
            {character.weapon === 'spoon' && '🥄'}
            {character.weapon === 'duster' && '🪶'}
            {character.weapon === 'stare' && '👁️'}
          </div>
          <div className="text-sm text-gray-600">
            Your cleaning weapon of choice!
          </div>
        </div>
      </div>
    )
  }

  return null
}

export default WhackAMessGame
