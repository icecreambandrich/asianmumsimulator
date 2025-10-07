import React, { useState, useEffect } from 'react'

const KIDS = [
  { id: 1, name: "Sleepy Sam", emoji: "😴", difficulty: 1 },
  { id: 2, name: "Lazy Lucy", emoji: "😪", difficulty: 2 },
  { id: 3, name: "Snooze Steve", emoji: "🛌", difficulty: 3 },
  { id: 4, name: "Dreamy Dan", emoji: "💤", difficulty: 2 },
  { id: 5, name: "Tired Tina", emoji: "😴", difficulty: 1 }
]

const WakeKidsGame = ({ character, onComplete }) => {
  const [gameState, setGameState] = useState('instructions') // 'instructions', 'playing', 'complete'
  const [timeLeft, setTimeLeft] = useState(30)
  const [score, setScore] = useState(0)
  const [kids, setKids] = useState([])
  const [clickedKids, setClickedKids] = useState(new Set())

  useEffect(() => {
    if (gameState === 'playing') {
      // Initialize kids with random positions
      const initialKids = KIDS.map(kid => ({
        ...kid,
        x: Math.random() * 80 + 10, // 10-90% of container width
        y: Math.random() * 60 + 20, // 20-80% of container height
        awake: false,
        clicksNeeded: kid.difficulty,
        clicksReceived: 0
      }))
      setKids(initialKids)

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

      return () => clearInterval(timer)
    }
  }, [gameState])

  useEffect(() => {
    if (gameState === 'complete') {
      const maxScore = KIDS.length
      const performance = score === maxScore ? 
        "Perfect! All kids are awake and ready for school!" :
        score >= maxScore * 0.8 ?
        "Great job! Most kids are up and moving!" :
        score >= maxScore * 0.6 ?
        "Not bad! Some kids are still sleepy though..." :
        "Oh no! Half the kids are still in dreamland!"

      const funny = score === maxScore ?
        "Neighbor: 'How do you get them up so fast?' You: 'Ancient mum techniques!'" :
        score === 0 ?
        "Kids at breakfast: 'Why didn't you wake us?' You: 'I tried!' *shows sore finger*" :
        "You: 'Rise and shine!' Kids: 'Five more minutes!' You: 'We don't have five more minutes!'"

      onComplete({
        score,
        maxScore,
        performance,
        funny
      })
    }
  }, [gameState, score, onComplete])

  const handleKidClick = (kidId) => {
    if (gameState !== 'playing') return

    setKids(prevKids => 
      prevKids.map(kid => {
        if (kid.id === kidId && !kid.awake) {
          const newClicksReceived = kid.clicksReceived + 1
          const nowAwake = newClicksReceived >= kid.clicksNeeded
          
          if (nowAwake && !clickedKids.has(kidId)) {
            setScore(prev => prev + 1)
            setClickedKids(prev => new Set([...prev, kidId]))
          }
          
          return {
            ...kid,
            clicksReceived: newClicksReceived,
            awake: nowAwake
          }
        }
        return kid
      })
    )
  }

  const startGame = () => {
    setGameState('playing')
    setTimeLeft(30)
    setScore(0)
    setClickedKids(new Set())
  }

  if (gameState === 'instructions') {
    return (
      <div className="text-center space-y-6">
        <div className="bg-blue-100 rounded-xl p-6">
          <h3 className="text-xl font-bold text-blue-700 mb-4">Instructions:</h3>
          <div className="text-left space-y-2 text-gray-700">
            <p>🎯 <strong>Goal:</strong> Wake up all the sleeping kids!</p>
            <p>👆 <strong>How:</strong> Tap/click on each sleeping kid</p>
            <p>😴 <strong>Difficulty:</strong> Some kids need multiple taps to wake up</p>
            <p>⏰ <strong>Time Limit:</strong> 30 seconds</p>
            <p>🏆 <strong>Scoring:</strong> 1 point per kid awakened</p>
          </div>
        </div>
        
        <button
          onClick={startGame}
          className="tiger-button text-lg px-6 py-3"
        >
          Start Waking Kids! ⏰
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
          <div className="text-lg font-bold text-blue-600">
            Awake: {score}/{KIDS.length}
          </div>
        </div>

        {/* Game Area */}
        <div className="relative bg-gradient-to-b from-blue-200 to-blue-300 rounded-xl h-96 overflow-hidden border-4 border-blue-400">
          {/* Background elements */}
          <div className="absolute top-4 left-4 text-2xl">🌅</div>
          <div className="absolute top-4 right-4 text-2xl">⏰</div>
          <div className="absolute bottom-4 left-4 text-2xl">🏠</div>
          <div className="absolute bottom-4 right-4 text-2xl">🚌</div>

          {/* Kids */}
          {kids.map(kid => (
            <button
              key={kid.id}
              onClick={() => handleKidClick(kid.id)}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                kid.awake 
                  ? 'animate-bounce text-6xl' 
                  : 'hover:scale-110 text-5xl animate-pulse'
              }`}
              style={{
                left: `${kid.x}%`,
                top: `${kid.y}%`
              }}
              disabled={kid.awake}
            >
              {kid.awake ? '😊' : kid.emoji}
              {!kid.awake && kid.clicksReceived > 0 && (
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {kid.clicksNeeded - kid.clicksReceived}
                </div>
              )}
            </button>
          ))}

          {/* Instructions overlay */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white/80 rounded-lg px-3 py-1 text-sm">
            Tap the sleeping kids to wake them up!
          </div>
        </div>

        {/* Progress indicator */}
        <div className="text-center text-sm text-gray-600">
          Some kids need multiple taps! Look for the red numbers.
        </div>
      </div>
    )
  }

  return null // Game complete state is handled by parent component
}

export default WakeKidsGame
