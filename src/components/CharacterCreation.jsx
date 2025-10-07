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

// Helper functions for full person representation
const getFullPersonEmoji = (look) => {
  switch(look) {
    case 'classic': return '👩‍🦳'  // Classic Asian woman
    case 'corporate': return '👩‍💼'  // Business woman
    case 'insta': return '🤳'  // Selfie woman
    case 'grandma': return '👵'  // Grandmother
    default: return '👤'  // Default person silhouette
  }
}

const getOutfitEmoji = (look) => {
  switch(look) {
    case 'classic': return '👗'  // Traditional dress
    case 'corporate': return '💼'  // Briefcase for corporate
    case 'insta': return '📱'  // Phone for social media
    case 'grandma': return '🧶'  // Knitting for grandma
    default: return '👕'  // Default shirt
  }
}

const getPersonalityEmoji = (disciplineStyle) => {
  switch(disciplineStyle) {
    case 'silent': return '🤫'  // Silent
    case 'verbal': return '🗣️'  // Speaking
    case 'lecture': return '📢'  // Megaphone
    case 'physical': return '💪'  // Strong
    default: return ''
  }
}

const CharacterCreation = ({ character, setCharacter, onComplete }) => {
  const handleSelection = (category, option) => {
    setCharacter(prev => ({
      ...prev,
      [category]: option
    }))
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

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Side - Full Body Character */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="character-3d-container bg-gradient-to-b from-blue-200 to-purple-200 rounded-3xl p-6 shadow-2xl border-4 border-tiger-gold relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-4 left-4 text-2xl animate-pulse">✨</div>
                  <div className="absolute top-4 right-4 text-2xl animate-pulse" style={{animationDelay: '0.5s'}}>⭐</div>
                  <div className="absolute bottom-4 left-4 text-2xl animate-pulse" style={{animationDelay: '1s'}}>🌟</div>
                  <div className="absolute bottom-4 right-4 text-2xl animate-pulse" style={{animationDelay: '1.5s'}}>💫</div>
                </div>

                {/* Full Body Character */}
                <div className="text-center relative">
                  <div className="character-3d-figure transform-gpu animate-spin" style={{
                    animationDuration: '8s',
                    transformStyle: 'preserve-3d'
                  }}>
                    {/* Character Shadow */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-black/20 rounded-full blur-sm"></div>
                    
                    {/* Full Person Representation */}
                    <div className="relative">
                      {/* Main Person - Large central figure */}
                      <div className="text-9xl mb-4 transition-all duration-500 relative z-10">
                        {character.look ? getFullPersonEmoji(character.look) : '👤'}
                      </div>
                      
                      {/* Character Accessories */}
                      <div className="flex justify-center items-center space-x-4 mb-4">
                        {/* Outfit/Style Indicator */}
                        <div className="text-3xl transition-all duration-500">
                          {character.look ? getOutfitEmoji(character.look) : ''}
                        </div>
                        
                        {/* Personality Indicator */}
                        <div className="text-3xl transition-all duration-500">
                          {character.disciplineStyle ? getPersonalityEmoji(character.disciplineStyle) : ''}
                        </div>
                      </div>
                      
                      {/* Weapon floating beside */}
                      <div className="absolute top-8 -right-12 text-5xl animate-bounce">
                        {character.weapon ? CHARACTER_OPTIONS.weapon.find(w => w.id === character.weapon)?.emoji : ''}
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
                            transform: 'scale(2)',
                            filter: 'blur(25px)'
                          }}></div>
                        </div>
                      )}
                      
                      {/* Character Name/Title */}
                      <div className="text-center mt-2">
                        <div className="text-sm font-bold text-white bg-black/50 rounded-full px-3 py-1 inline-block">
                          {character.look ? CHARACTER_OPTIONS.look.find(l => l.id === character.look)?.name : 'Choose Your Look'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Character Info */}
                  <div className="mt-6 bg-white/90 rounded-2xl p-4 backdrop-blur-sm">
                    <div className="text-xl font-bold text-tiger-red mb-2">
                      {character.look ? CHARACTER_OPTIONS.look.find(l => l.id === character.look)?.name : 'Choose Your Look'}
                    </div>
                    <div className="text-md text-gray-600 mb-2">
                      {character.disciplineStyle ? CHARACTER_OPTIONS.disciplineStyle.find(d => d.id === character.disciplineStyle)?.name : 'Select Discipline Style'}
                    </div>
                    <div className="text-sm text-gray-500 mb-4">
                      {character.weapon ? `Wielding: ${CHARACTER_OPTIONS.weapon.find(w => w.id === character.weapon)?.name}` : 'Choose Your Weapon'}
                    </div>
                    
                    {/* Completion Progress */}
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

                {/* Floating Action Indicators */}
                {isComplete && (
                  <div className="absolute -top-6 -right-6 text-4xl animate-bounce">
                    🎉
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Side - Selection Options */}
          <div className="lg:col-span-2">
            {/* Selection Categories */}
            <div className="space-y-8">
              {Object.entries(CHARACTER_OPTIONS).map(([category, options]) => (
                <div key={category} className="bg-white/80 rounded-2xl p-6 shadow-xl">
                  <h2 className="text-2xl font-bold text-tiger-red mb-4 text-center capitalize">
                    {category === 'disciplineStyle' ? 'Discipline Style' : category} 
                    {category === 'look' && ' 👀'}
                    {category === 'disciplineStyle' && ' 💪'}
                    {category === 'weapon' && ' ⚔️'}
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        <div className="text-4xl mb-2">{option.emoji}</div>
                        <h3 className="text-lg font-bold text-tiger-red mb-2">{option.name}</h3>
                        <p className="text-sm text-gray-600">{option.description}</p>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Button */}
            <div className="text-center mt-8">
              <button
                onClick={onComplete}
                disabled={!isComplete}
                className={`text-xl px-8 py-4 rounded-full font-bold transition-all duration-300 ${
                  isComplete 
                    ? 'tiger-button animate-pulse' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isComplete ? 'Begin the Chaos! 🚀' : 'Complete Your Character First! ⚠️'}
              </button>
            </div>
          </div>
        </div>

        {/* Character Stats Preview */}
        {isComplete && (
          <div className="mt-8 bg-white/90 rounded-2xl p-6 shadow-xl max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-tiger-red mb-4 text-center">Your Mum Powers:</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-3xl mb-2">🐅</div>
                <div className="font-semibold">Tiger Points: 50</div>
              </div>
              <div>
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
