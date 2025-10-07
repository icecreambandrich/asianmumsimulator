import React, { useState, useEffect } from 'react'

const CHAT_SCENARIOS = [
  {
    message: "Aiya! Your son so tall now! What you feed him?",
    responses: [
      { text: "Lots of rice and vegetables! 🍚", points: 3, reaction: "Wah so good! My son only eat McDonald's!" },
      { text: "Secret is milk and exercise! 🥛", points: 2, reaction: "Ah yes yes, must drink milk!" },
      { text: "He takes after his father! 👨", points: 1, reaction: "Haha, lucky genes!" },
      { text: "Growth hormones in the food! 😅", points: 0, reaction: "Aiya don't say like that!" }
    ]
  },
  {
    message: "Your daughter piano so good! How many hours practice?",
    responses: [
      { text: "2 hours every day, no exception! 🎹", points: 3, reaction: "Wah so disciplined! Good mummy!" },
      { text: "She practices when she feels like it 🤷‍♀️", points: 0, reaction: "Aiya, must be more strict!" },
      { text: "We have a schedule but flexible 📅", points: 2, reaction: "Balance is important too!" },
      { text: "Piano teacher very strict! 👩‍🏫", points: 1, reaction: "Good teacher worth the money!" }
    ]
  },
  {
    message: "Wah your house always so clean! What's your secret?",
    responses: [
      { text: "Kids must clean their own mess! 🧹", points: 3, reaction: "Smart! Teach responsibility!" },
      { text: "I clean when they're at school 🏫", points: 1, reaction: "So hardworking!" },
      { text: "Hire cleaning lady twice a week 💰", points: 0, reaction: "Wah so rich!" },
      { text: "Everyone has assigned chores! 📋", points: 2, reaction: "Organization is key!" }
    ]
  },
  {
    message: "Your kids so well-behaved! How you discipline?",
    responses: [
      { text: "Consistent rules and consequences! ⚖️", points: 3, reaction: "Yes! Structure very important!" },
      { text: "I just give them the look... 👁️", points: 2, reaction: "Haha the mummy stare!" },
      { text: "Reward good behavior! 🎁", points: 1, reaction: "Positive reinforcement good!" },
      { text: "They're just naturally good kids 😇", points: 0, reaction: "You so lucky!" }
    ]
  },
  {
    message: "Your son got into which university? So proud!",
    responses: [
      { text: "Harvard! All that studying paid off! 🎓", points: 3, reaction: "WAH! So impressive! Doctor?" },
      { text: "Local university, but good program! 🏫", points: 2, reaction: "Good also! Save money!" },
      { text: "Still deciding between offers 🤔", points: 1, reaction: "Good problem to have!" },
      { text: "He's taking a gap year... 😅", points: 0, reaction: "Aiya... what he going to do?" }
    ]
  },
  {
    message: "How you manage work and family? So busy!",
    responses: [
      { text: "Time management and planning! 📊", points: 3, reaction: "You so organized! Teach me!" },
      { text: "Family helps with everything! 👨‍👩‍👧‍👦", points: 2, reaction: "Teamwork very important!" },
      { text: "I don't sleep much... ☕", points: 1, reaction: "Aiya must take care yourself!" },
      { text: "Just survive day by day! 😵", points: 0, reaction: "Same same! So stressful!" }
    ]
  }
]

const AuntieChatGame = ({ character, onComplete }) => {
  const [gameState, setGameState] = useState('instructions')
  const [timeLeft, setTimeLeft] = useState(40)
  const [score, setScore] = useState(0)
  const [currentScenario, setCurrentScenario] = useState(0)
  const [scenarios, setScenarios] = useState([])
  const [showReaction, setShowReaction] = useState(false)
  const [lastReaction, setLastReaction] = useState('')

  useEffect(() => {
    if (gameState === 'playing') {
      // Shuffle scenarios
      const shuffled = [...CHAT_SCENARIOS].sort(() => Math.random() - 0.5)
      setScenarios(shuffled)
      setCurrentScenario(0)

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
      const maxScore = scenarios.length * 3 // Max 3 points per scenario
      const performance = score >= maxScore * 0.9 ?
        "Auntie Chat Champion! You know all the right things to say!" :
        score >= maxScore * 0.7 ?
        "Great social skills! The aunties approve!" :
        score >= maxScore * 0.5 ?
        "Not bad! Still learning the auntie ways..." :
        "Aiya! Need more practice with auntie conversations!"

      const funny = score >= maxScore * 0.9 ?
        "Auntie WhatsApp group admin: 'We need you as our spokesperson!'" :
        score >= maxScore * 0.5 ?
        "Auntie: 'You're learning!' You: 'Is this a test?' Auntie: 'Everything is a test!'" :
        "Auntie: 'Young generation don't know how to talk!' You: 'I'm trying!' Auntie: 'Try harder!'"

      onComplete({
        score,
        maxScore,
        performance,
        funny
      })
    }
  }, [gameState, score, scenarios.length])

  const handleResponse = (responseIndex) => {
    if (showReaction || gameState !== 'playing') return

    const scenario = scenarios[currentScenario]
    const response = scenario.responses[responseIndex]
    
    setScore(prev => prev + response.points)
    setLastReaction(response.reaction)
    setShowReaction(true)

    setTimeout(() => {
      setShowReaction(false)
      const nextScenario = currentScenario + 1
      if (nextScenario >= scenarios.length) {
        setGameState('complete')
      } else {
        setCurrentScenario(nextScenario)
      }
    }, 2500)
  }

  const startGame = () => {
    setGameState('playing')
    setTimeLeft(40)
    setScore(0)
    setCurrentScenario(0)
    setShowReaction(false)
  }

  if (gameState === 'instructions') {
    return (
      <div className="text-center space-y-6">
        <div className="bg-pink-100 rounded-xl p-6">
          <h3 className="text-xl font-bold text-pink-700 mb-4">Instructions:</h3>
          <div className="text-left space-y-2 text-gray-700">
            <p>🎯 <strong>Goal:</strong> Respond to auntie chats with the best answers!</p>
            <p>💬 <strong>How:</strong> Choose the most impressive response</p>
            <p>⭐ <strong>Points:</strong> Better answers = more auntie approval points</p>
            <p>🏆 <strong>Strategy:</strong> Show off your parenting success!</p>
            <p>⏰ <strong>Time Limit:</strong> 40 seconds</p>
            <p>👵 <strong>Audience:</strong> Impress the auntie network!</p>
          </div>
        </div>
        
        <button
          onClick={startGame}
          className="tiger-button text-lg px-6 py-3"
        >
          Start Chatting! 💬
        </button>
      </div>
    )
  }

  if (gameState === 'playing' && scenarios.length > 0) {
    const scenario = scenarios[currentScenario]
    
    return (
      <div className="space-y-4">
        {/* Game Stats */}
        <div className="flex justify-between items-center bg-gray-100 rounded-lg p-4">
          <div className="text-lg font-bold text-tiger-red">
            Time: {timeLeft}s
          </div>
          <div className="text-lg font-bold text-pink-600">
            Auntie Points: {score}
          </div>
          <div className="text-sm text-gray-600">
            Chat {currentScenario + 1}/{scenarios.length}
          </div>
        </div>

        {/* Chat Interface */}
        <div className="bg-gradient-to-b from-pink-100 to-purple-100 rounded-xl p-6 border-4 border-pink-300">
          {!showReaction ? (
            <>
              {/* Auntie Message */}
              <div className="bg-white rounded-2xl p-4 mb-6 shadow-lg border-l-4 border-pink-500">
                <div className="flex items-start space-x-3">
                  <div className="text-3xl">👵</div>
                  <div>
                    <div className="font-bold text-pink-700 mb-1">Auntie Karen</div>
                    <div className="text-gray-700">{scenario.message}</div>
                  </div>
                </div>
              </div>

              {/* Response Options */}
              <div className="space-y-3">
                <div className="text-center text-sm text-gray-600 mb-4">
                  Choose your response quickly! ⚡
                </div>
                {scenario.responses.map((response, index) => (
                  <button
                    key={index}
                    onClick={() => handleResponse(index)}
                    className="w-full bg-white hover:bg-pink-50 rounded-xl p-4 text-left shadow-md hover:shadow-lg transition-all duration-200 border-2 border-transparent hover:border-pink-300"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">{response.text}</span>
                      <div className="flex space-x-1">
                        {Array.from({ length: response.points }, (_, i) => (
                          <span key={i} className="text-yellow-500">⭐</span>
                        ))}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </>
          ) : (
            /* Auntie Reaction */
            <div className="text-center space-y-6">
              <div className="text-8xl animate-bounce">👵</div>
              <div className="bg-yellow-100 rounded-2xl p-6 border-4 border-yellow-400">
                <div className="text-xl font-bold text-yellow-700 mb-2">
                  Auntie Karen's Reaction:
                </div>
                <div className="text-lg text-gray-700 italic">
                  "{lastReaction}"
                </div>
              </div>
              <div className="text-sm text-gray-600">
                Moving to next chat...
              </div>
            </div>
          )}
        </div>

        {/* Character Display */}
        <div className="text-center">
          <div className="text-4xl mb-2">
            {character.look === 'classic' && '👩‍🦳'}
            {character.look === 'corporate' && '👩‍💼'}
            {character.look === 'insta' && '🤳'}
            {character.look === 'grandma' && '👵'}
          </div>
          <div className="text-sm text-gray-600">
            Using your {character.disciplineStyle === 'silent' ? 'Silent Guilt' : 
                        character.disciplineStyle === 'verbal' ? 'Verbal Uppercut' :
                        character.disciplineStyle === 'lecture' ? 'Lecture Combo' : 'Physical Precision'} energy!
          </div>
        </div>
      </div>
    )
  }

  return null
}

export default AuntieChatGame
