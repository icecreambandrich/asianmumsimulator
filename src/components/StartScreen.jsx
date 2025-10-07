import React, { useState, useEffect } from 'react'

const ROTATING_QUOTES = [
  "Discipline builds dynasty! 👑",
  "Why you no study harder? 📚",
  "Other kids already finished homework! 😤",
  "When I was your age... 👵",
  "You think money grows on trees? 🌳💰",
  "Practice makes perfect, lazy makes nothing! 🎯",
  "Aiya! What am I going to do with you? 🤦‍♀️",
  "Success is 1% inspiration, 99% perspiration! 💪"
]

const StartScreen = ({ onStart }) => {
  const [currentQuote, setCurrentQuote] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentQuote((prev) => (prev + 1) % ROTATING_QUOTES.length)
        setIsAnimating(false)
      }, 300)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Floating emojis background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 text-4xl animate-bounce-slow">🥿</div>
        <div className="absolute top-20 right-20 text-3xl animate-bounce-slow" style={{animationDelay: '0.5s'}}>🥢</div>
        <div className="absolute bottom-20 left-20 text-3xl animate-bounce-slow" style={{animationDelay: '1s'}}>📚</div>
        <div className="absolute bottom-10 right-10 text-4xl animate-bounce-slow" style={{animationDelay: '1.5s'}}>👩‍🍳</div>
        <div className="absolute top-1/2 left-5 text-2xl animate-bounce-slow" style={{animationDelay: '2s'}}>🍚</div>
        <div className="absolute top-1/3 right-5 text-2xl animate-bounce-slow" style={{animationDelay: '2.5s'}}>🧹</div>
      </div>

      {/* Main content */}
      <div className="text-center z-10 max-w-4xl">
        {/* Title */}
        <h1 className="text-6xl md:text-8xl font-bold text-tiger-red mb-4 drop-shadow-lg animate-pulse">
          Asian Mum
        </h1>
        <h2 className="text-4xl md:text-6xl font-bold text-tiger-gold mb-8 drop-shadow-lg">
          Simulator
        </h2>
        <h3 className="text-2xl md:text-3xl font-semibold text-red-600 mb-12 italic">
          Day of Discipline 🐅
        </h3>

        {/* Rotating quote */}
        <div className="mb-12 h-20 flex items-center justify-center">
          <p className={`text-xl md:text-2xl font-medium text-gray-700 bg-white/80 rounded-full px-8 py-4 shadow-lg transition-all duration-300 ${
            isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}>
            "{ROTATING_QUOTES[currentQuote]}"
          </p>
        </div>

        {/* Start button */}
        <button
          onClick={onStart}
          className="tiger-button text-2xl md:text-3xl px-12 py-6 mb-8 animate-wiggle hover:animate-none"
        >
          Start My Day! 🌅
        </button>

        {/* Instructions */}
        <div className="bg-white/90 rounded-2xl p-6 shadow-xl max-w-2xl mx-auto">
          <h4 className="text-xl font-bold text-tiger-red mb-4">How to Play:</h4>
          <div className="text-left space-y-2 text-gray-700">
            <p>🎭 <strong>Create</strong> your Asian Mum character</p>
            <p>🎯 <strong>Make choices</strong> in parenting scenarios</p>
            <p>🎮 <strong>Play mini-games</strong> to test your mum skills</p>
            <p>📊 <strong>Earn Tiger Points</strong> and manage your stats</p>
            <p>🏆 <strong>Unlock</strong> one of four hilarious endings!</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StartScreen
