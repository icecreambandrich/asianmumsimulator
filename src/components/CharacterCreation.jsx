import React, { useState } from 'react'

const CHARACTER_OPTIONS = {
  look: [
    { id: 'classic', name: 'Classic Auntie', emoji: '👩‍🦳', description: 'Traditional wisdom with a side of judgment' },
    { id: 'corporate', name: 'Corporate Mum', emoji: '👩‍💼', description: 'Efficiency expert in heels and spreadsheets' },
    { id: 'insta', name: 'Insta Mum', emoji: '🤳', description: 'Aesthetic parenting with perfect lighting' },
    { id: 'grandma', name: 'Grandma Energy', emoji: '👵', description: 'Ancient wisdom meets unlimited snacks' }
  ],
  disciplineStyle: [
    { id: 'silent', name: 'Silent Guilt', emoji: '😔', description: 'The power of disappointed sighs' },
    { id: 'verbal', name: 'Verbal Uppercut', emoji: '🗣️', description: 'Words that hit harder than fists' },
    { id: 'lecture', name: 'Lecture Combo', emoji: '📢', description: 'Educational beatdowns with historical context' },
    { id: 'physical', name: 'Physical Precision', emoji: '🎯', description: 'Surgical strikes with household items' }
  ],
  weapon: [
    { id: 'slipper', name: 'Flying Slipper', emoji: '🥿', description: 'Heat-seeking household missile' },
    { id: 'spoon', name: 'Wooden Spoon', emoji: '🥄', description: 'Multi-purpose cooking and correction tool' },
    { id: 'duster', name: 'Feather Duster', emoji: '🪶', description: 'Clean house, clean attitude' },
    { id: 'stare', name: 'The Stare', emoji: '👁️', description: 'Soul-piercing optical warfare' }
  ]
}

const CharacterCreation = ({ character, setCharacter, onComplete }) => {
  const [rotationY, setRotationY] = useState(0)
  const [isRotating, setIsRotating] = useState(false)

  const handleSelection = (category, option) => {
    setCharacter(prev => ({
      ...prev,
      [category]: option
    }))
  }

  const rotateCharacter = () => {
    setIsRotating(true)
    setRotationY(prev => prev + 90)
    setTimeout(() => setIsRotating(false), 600)
  }

  const isComplete = character.look && character.disciplineStyle && character.weapon

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-tiger-red mb-4">Create Your Mum 👩‍👧‍👦</h1>
          <p className="text-xl text-gray-700">Choose your parenting superpowers wisely...</p>
        </div>

        {/* 3D Character Preview */}
        <div className="text-center mb-12">
          <div className="relative inline-block">
            {/* 3D Character Container */}
            <div className="character-3d-container bg-gradient-to-b from-blue-200 to-purple-200 rounded-3xl p-8 shadow-2xl border-4 border-tiger-gold relative overflow-hidden">
              {/* Background Elements */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-4 left-4 text-2xl animate-pulse">✨</div>
                <div className="absolute top-4 right-4 text-2xl animate-pulse" style={{animationDelay: '0.5s'}}>⭐</div>
                <div className="absolute bottom-4 left-4 text-2xl animate-pulse" style={{animationDelay: '1s'}}>🌟</div>
                <div className="absolute bottom-4 right-4 text-2xl animate-pulse" style={{animationDelay: '1.5s'}}>💫</div>
              </div>

              {/* 3D Character */}
              <div className="character-3d-figure relative transform-gpu" style={{
                transformStyle: 'preserve-3d',
                transform: `rotateX(10deg) rotateY(${rotationY - 5}deg)`,
                transition: isRotating ? 'transform 0.6s ease-in-out' : 'transform 0.3s ease-in-out'
              }}>
                {/* Character Base/Shadow */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-black/20 rounded-full blur-sm" 
                     style={{transform: 'translateZ(-50px) rotateX(90deg)'}}></div>
                
                {/* Main Character Body */}
                <div className="relative z-10">
                  {/* Head */}
                  <div className="text-9xl mb-2 transform transition-all duration-500 hover:scale-110" 
                       style={{
                         transform: 'translateZ(30px)',
                         filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))'
                       }}>
                    {character.look ? CHARACTER_OPTIONS.look.find(l => l.id === character.look)?.emoji : '❓'}
                  </div>
                  
                  {/* Weapon/Tool Layer */}
                  <div className="absolute top-8 right-8 text-5xl transform transition-all duration-500 hover:rotate-12" 
                       style={{
                         transform: 'translateZ(40px) rotateY(15deg)',
                         filter: 'drop-shadow(0 5px 15px rgba(0,0,0,0.4))'
                       }}>
                    {character.weapon ? CHARACTER_OPTIONS.weapon.find(w => w.id === character.weapon)?.emoji : '❓'}
                  </div>
                  
                  {/* Discipline Style Aura */}
                  {character.disciplineStyle && (
                    <div className="absolute inset-0 pointer-events-none">
                      <div className={`absolute inset-0 rounded-full opacity-30 animate-pulse ${
                        character.disciplineStyle === 'silent' ? 'bg-blue-400' :
                        character.disciplineStyle === 'verbal' ? 'bg-red-400' :
                        character.disciplineStyle === 'lecture' ? 'bg-yellow-400' :
                        'bg-purple-400'
                      }`} style={{
                        transform: 'translateZ(-10px) scale(1.2)',
                        filter: 'blur(20px)'
                      }}></div>
                    </div>
                  )}
                  
                  {/* Power Level Indicators */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 flex space-x-1">
                    {[1,2,3].map(i => (
                      <div key={i} 
                           className={`w-2 h-8 rounded-full transition-all duration-500 ${
                             character.look && character.disciplineStyle && character.weapon ? 'bg-tiger-gold' : 'bg-gray-300'
                           }`}
                           style={{
                             transform: `translateZ(20px) rotateX(${i * 10}deg)`,
                             animationDelay: `${i * 0.2}s`
                           }}>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Character Info Panel */}
              <div className="mt-6 bg-white/90 rounded-2xl p-4 backdrop-blur-sm" style={{transform: 'translateZ(10px)'}}>
                <div className="text-2xl font-bold text-tiger-red mb-2">
                  {character.look ? CHARACTER_OPTIONS.look.find(l => l.id === character.look)?.name : 'Choose Your Look'}
                </div>
                <div className="text-lg text-gray-600 mb-2">
                  {character.disciplineStyle ? CHARACTER_OPTIONS.disciplineStyle.find(d => d.id === character.disciplineStyle)?.name : 'Select Discipline Style'}
                </div>
                <div className="text-md text-gray-500">
                  {character.weapon ? `Wielding: ${CHARACTER_OPTIONS.weapon.find(w => w.id === character.weapon)?.name}` : 'Choose Your Weapon'}
                </div>
                
                {/* Completion Progress */}
                <div className="mt-4">
                  <div className="text-sm text-gray-600 mb-2">Character Completion:</div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-tiger-red to-tiger-gold h-2 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${((character.look ? 1 : 0) + (character.disciplineStyle ? 1 : 0) + (character.weapon ? 1 : 0)) * 33.33}%` 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Character Controls */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              <button
                onClick={rotateCharacter}
                className="bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
                title="Rotate Character"
              >
                <div className="text-xl">🔄</div>
              </button>
              {character.look && (
                <button
                  onClick={() => setRotationY(0)}
                  className="bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
                  title="Reset View"
                >
                  <div className="text-xl">🎯</div>
                </button>
              )}
            </div>

            {/* Floating Action Indicators */}
            {isComplete && (
              <div className="absolute -top-6 -right-6 text-4xl animate-bounce">
                🎉
              </div>
            )}
          </div>
        </div>

        {/* Selection Categories */}
        <div className="space-y-12">
          {Object.entries(CHARACTER_OPTIONS).map(([category, options]) => (
            <div key={category} className="bg-white/80 rounded-2xl p-8 shadow-xl">
              <h2 className="text-3xl font-bold text-tiger-red mb-6 text-center capitalize">
                {category === 'disciplineStyle' ? 'Discipline Style' : category} 
                {category === 'look' && ' 👀'}
                {category === 'disciplineStyle' && ' 💪'}
                {category === 'weapon' && ' ⚔️'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleSelection(category, option.id)}
                    className={`mum-card text-center transition-all duration-300 ${
                      character[category] === option.id 
                        ? 'ring-4 ring-tiger-red bg-red-50 scale-105' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="text-6xl mb-4">{option.emoji}</div>
                    <h3 className="text-xl font-bold text-tiger-red mb-2">{option.name}</h3>
                    <p className="text-sm text-gray-600">{option.description}</p>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Continue Button */}
        <div className="text-center mt-12">
          <button
            onClick={onComplete}
            disabled={!isComplete}
            className={`text-2xl px-12 py-6 rounded-full font-bold transition-all duration-300 ${
              isComplete 
                ? 'tiger-button animate-pulse' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isComplete ? 'Begin the Chaos! 🚀' : 'Complete Your Character First! ⚠️'}
          </button>
        </div>

        {/* Character Stats Preview */}
        {isComplete && (
          <div className="mt-8 bg-white/90 rounded-2xl p-6 shadow-xl max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-tiger-red mb-4 text-center">Your Mum Powers:</h3>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-3xl mb-2">🐅</div>
                <div className="font-semibold">Tiger Points: 50</div>
              </div>
              <div>
                <div className="text-3xl mb-2">🧘‍♀️</div>
                <div className="font-semibold">Zen Points: 50</div>
              </div>
              <div>
                <div className="text-3xl mb-2">😰</div>
                <div className="font-semibold">Stress: 30</div>
              </div>
              <div>
                <div className="text-3xl mb-2">⭐</div>
                <div className="font-semibold">Reputation: 50</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CharacterCreation
