import React, { useState, useEffect } from 'react'

const FOOD_ITEMS = [
  { id: 'rice', emoji: '🍚', category: 'main', points: 2 },
  { id: 'sandwich', emoji: '🥪', category: 'main', points: 2 },
  { id: 'apple', emoji: '🍎', category: 'fruit', points: 3 },
  { id: 'banana', emoji: '🍌', category: 'fruit', points: 3 },
  { id: 'carrot', emoji: '🥕', category: 'veggie', points: 3 },
  { id: 'broccoli', emoji: '🥦', category: 'veggie', points: 3 },
  { id: 'cookie', emoji: '🍪', category: 'treat', points: 1 },
  { id: 'chips', emoji: '🍟', category: 'junk', points: -2 },
  { id: 'candy', emoji: '🍭', category: 'junk', points: -2 },
  { id: 'water', emoji: '💧', category: 'drink', points: 2 },
  { id: 'juice', emoji: '🧃', category: 'drink', points: 1 },
  { id: 'soda', emoji: '🥤', category: 'junk', points: -1 }
]

const LUNCHBOX_REQUIREMENTS = {
  main: { min: 1, max: 2, name: 'Main Course' },
  fruit: { min: 1, max: 2, name: 'Fruits' },
  veggie: { min: 1, max: 2, name: 'Vegetables' },
  drink: { min: 1, max: 1, name: 'Drink' },
  treat: { min: 0, max: 1, name: 'Treat (Optional)' }
}

const LunchboxGame = ({ character, onComplete }) => {
  const [gameState, setGameState] = useState('instructions')
  const [timeLeft, setTimeLeft] = useState(45)
  const [lunchbox, setLunchbox] = useState([])
  const [availableItems, setAvailableItems] = useState([])
  const [draggedItem, setDraggedItem] = useState(null)

  useEffect(() => {
    if (gameState === 'playing') {
      // Shuffle and set available items
      const shuffled = [...FOOD_ITEMS].sort(() => Math.random() - 0.5)
      setAvailableItems(shuffled)

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
      const result = calculateScore()
      onComplete(result)
    }
  }, [gameState])

  const calculateScore = () => {
    let score = 0
    let maxScore = 15 // Perfect balanced lunch
    
    // Calculate category counts
    const categoryCounts = {}
    lunchbox.forEach(item => {
      categoryCounts[item.category] = (categoryCounts[item.category] || 0) + 1
    })

    // Check requirements and calculate score
    let requirementsMet = 0
    let totalRequirements = 0
    
    Object.entries(LUNCHBOX_REQUIREMENTS).forEach(([category, req]) => {
      const count = categoryCounts[category] || 0
      totalRequirements++
      
      if (count >= req.min && count <= req.max) {
        requirementsMet++
        score += 3 // Bonus for meeting requirements
      } else if (count > req.max) {
        score -= 1 // Penalty for excess
      }
    })

    // Add points from individual items
    lunchbox.forEach(item => {
      score += item.points
    })

    // Ensure score is not negative
    score = Math.max(0, score)

    const performance = requirementsMet === totalRequirements ?
      "Perfect balanced lunch! Your child will be the envy of the cafeteria!" :
      requirementsMet >= totalRequirements * 0.8 ?
      "Great lunch! Just missing a few nutritional elements." :
      requirementsMet >= totalRequirements * 0.6 ?
      "Decent lunch, but could use more balance." :
      "This lunch needs work! Too much junk or missing essentials."

    const funny = lunchbox.length === 0 ?
      "Child: 'Where's my lunch?' You: 'It's... minimalist! Very trendy!'" :
      categoryCounts.junk >= 3 ?
      "Other mums: 'Interesting lunch choices...' You: 'It's called variety!'" :
      requirementsMet === totalRequirements ?
      "Child: 'This looks healthy...' You: 'That's the point!' Child: 'Can I trade it?'" :
      "You: 'I packed with love!' Child: 'Next time pack with more cookies!'"

    return {
      score,
      maxScore,
      performance,
      funny
    }
  }

  const addToLunchbox = (item) => {
    if (lunchbox.length < 8) { // Max 8 items in lunchbox
      setLunchbox(prev => [...prev, item])
    }
  }

  const removeFromLunchbox = (index) => {
    setLunchbox(prev => prev.filter((_, i) => i !== index))
  }

  const handleDragStart = (e, item) => {
    setDraggedItem(item)
    e.dataTransfer.effectAllowed = 'copy'
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
  }

  const handleDrop = (e) => {
    e.preventDefault()
    if (draggedItem) {
      addToLunchbox(draggedItem)
      setDraggedItem(null)
    }
  }

  const getCategoryStatus = () => {
    const categoryCounts = {}
    lunchbox.forEach(item => {
      categoryCounts[item.category] = (categoryCounts[item.category] || 0) + 1
    })

    return Object.entries(LUNCHBOX_REQUIREMENTS).map(([category, req]) => {
      const count = categoryCounts[category] || 0
      const status = count >= req.min && count <= req.max ? 'good' :
                    count < req.min ? 'missing' : 'excess'
      
      return { category, count, req, status }
    })
  }

  const startGame = () => {
    setGameState('playing')
    setTimeLeft(45)
    setLunchbox([])
  }

  if (gameState === 'instructions') {
    return (
      <div className="text-center space-y-6">
        <div className="bg-green-100 rounded-xl p-6">
          <h3 className="text-xl font-bold text-green-700 mb-4">Instructions:</h3>
          <div className="text-left space-y-2 text-gray-700">
            <p>🎯 <strong>Goal:</strong> Pack a balanced lunch for your child!</p>
            <p>🍱 <strong>Requirements:</strong></p>
            <ul className="ml-4 space-y-1">
              <li>• 1-2 Main courses (🍚🥪)</li>
              <li>• 1-2 Fruits (🍎🍌)</li>
              <li>• 1-2 Vegetables (🥕🥦)</li>
              <li>• 1 Drink (💧🧃)</li>
              <li>• 0-1 Treat (🍪) - optional</li>
            </ul>
            <p>⚠️ <strong>Avoid:</strong> Too much junk food!</p>
            <p>⏰ <strong>Time Limit:</strong> 45 seconds</p>
          </div>
        </div>
        
        <button
          onClick={startGame}
          className="tiger-button text-lg px-6 py-3"
        >
          Start Packing! 🍱
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
          <div className="text-lg font-bold text-green-600">
            Items: {lunchbox.length}/8
          </div>
        </div>

        {/* Requirements Status */}
        <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
          <h4 className="font-bold text-gray-700 mb-2">Lunch Requirements:</h4>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm">
            {getCategoryStatus().map(({ category, count, req, status }) => (
              <div key={category} className={`p-2 rounded ${
                status === 'good' ? 'bg-green-100 text-green-700' :
                status === 'missing' ? 'bg-red-100 text-red-700' :
                'bg-yellow-100 text-yellow-700'
              }`}>
                <div className="font-semibold">{req.name}</div>
                <div>{count}/{req.min}-{req.max}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Available Items */}
          <div className="bg-blue-100 rounded-xl p-4">
            <h4 className="font-bold text-blue-700 mb-4">Available Food:</h4>
            <div className="grid grid-cols-4 gap-2">
              {availableItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => addToLunchbox(item)}
                  onDragStart={(e) => handleDragStart(e, item)}
                  draggable
                  className="bg-white rounded-lg p-3 text-3xl hover:scale-110 transition-transform cursor-grab active:cursor-grabbing shadow-md hover:shadow-lg"
                  title={`${item.emoji} (${item.points > 0 ? '+' : ''}${item.points} pts)`}
                >
                  {item.emoji}
                </button>
              ))}
            </div>
            <p className="text-xs text-blue-600 mt-2">Click or drag items to add them to the lunchbox</p>
          </div>

          {/* Lunchbox */}
          <div 
            className="bg-yellow-100 rounded-xl p-4 min-h-64"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <h4 className="font-bold text-yellow-700 mb-4">Lunchbox 🍱:</h4>
            {lunchbox.length === 0 ? (
              <div className="text-center text-gray-500 py-8 border-2 border-dashed border-gray-300 rounded-lg">
                Drop items here or click to add!
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-2">
                {lunchbox.map((item, index) => (
                  <button
                    key={`${item.id}-${index}`}
                    onClick={() => removeFromLunchbox(index)}
                    className="bg-white rounded-lg p-3 text-3xl hover:scale-110 transition-transform shadow-md hover:shadow-lg hover:bg-red-50"
                    title={`Click to remove ${item.emoji}`}
                  >
                    {item.emoji}
                  </button>
                ))}
              </div>
            )}
            <p className="text-xs text-yellow-600 mt-2">Click items to remove them</p>
          </div>
        </div>
      </div>
    )
  }

  return null
}

export default LunchboxGame
