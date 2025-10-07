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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-900 via-pink-800 to-indigo-900">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0">
        {/* Geometric Shapes */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-pink-400 to-red-500 transform rotate-45 opacity-25 animate-bounce-slow"></div>
        <div className="absolute bottom-32 left-32 w-40 h-40 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl opacity-15 animate-spin" style={{animationDuration: '20s'}}></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-gradient-to-r from-green-400 to-teal-500 rounded-full opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute text-3xl opacity-30 animate-bounce-slow"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            >
              {['🌸', '⭐', '💫', '✨', '🎋', '🏮'][Math.floor(Math.random() * 6)]}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-8">
        <div className="max-w-5xl mx-auto text-center">
          
          {/* Hero Section */}
          <div className="mb-16">
            {/* Main Title with Gradient Text */}
            <div className="mb-8">
              <h1 className="text-7xl md:text-9xl font-black mb-4 bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent drop-shadow-2xl animate-pulse">
                ASIAN MUM
              </h1>
              <div className="relative">
                <h2 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-xl">
                  SIMULATOR
                </h2>
                <div className="absolute -top-4 -right-8 text-6xl animate-spin" style={{animationDuration: '3s'}}>
                  🐅
                </div>
              </div>
              <h3 className="text-2xl md:text-4xl font-semibold text-yellow-300 italic drop-shadow-lg">
                Day of Discipline
              </h3>
            </div>

          </div>

          {/* Quote Section */}
          <div className="mb-12">
            <div className="bg-black/30 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl max-w-3xl mx-auto">
              <p className={`text-2xl md:text-3xl font-medium text-white transition-all duration-500 ${
                isAnimating ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'
              }`}>
                <span className="text-yellow-300">"</span>
                {ROTATING_QUOTES[currentQuote]}
                <span className="text-yellow-300">"</span>
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mb-12">
            <button
              onClick={onStart}
              className="group relative bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white font-black text-2xl md:text-4xl px-16 py-6 rounded-full shadow-2xl transform transition-all duration-300 hover:scale-110 hover:shadow-3xl active:scale-95 animate-pulse hover:animate-none"
            >
              <span className="relative z-10 flex items-center justify-center space-x-3">
                <span>START MY DAY</span>
                <span className="text-3xl group-hover:animate-bounce">🌅</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Game Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {[
              { icon: '🎭', title: 'Create Character', desc: 'Build your mum persona' },
              { icon: '🎯', title: 'Make Choices', desc: 'Navigate parenting chaos' },
              { icon: '🎮', title: 'Play Games', desc: 'Test your mum skills' },
              { icon: '📊', title: 'Earn Points', desc: 'Build your Tiger Meter' },
              { icon: '🏆', title: 'Get Ending', desc: 'Discover your mum type' }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h4 className="text-white font-bold text-lg mb-2">{feature.title}</h4>
                <p className="text-gray-300 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Bottom Tagline */}
          <div className="mt-16">
            <p className="text-white/80 text-lg italic">
              Ready to unleash your inner Tiger Mum? 🐅✨
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StartScreen
