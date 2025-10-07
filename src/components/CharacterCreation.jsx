import React from 'react'

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

        {/* Character Preview */}
        <div className="text-center mb-12">
          <div className="bg-white rounded-3xl p-8 shadow-2xl inline-block border-4 border-tiger-gold">
            <div className="text-8xl mb-4">
              {character.look ? CHARACTER_OPTIONS.look.find(l => l.id === character.look)?.emoji : '❓'}
            </div>
            <div className="text-6xl mb-4">
              {character.weapon ? CHARACTER_OPTIONS.weapon.find(w => w.id === character.weapon)?.emoji : '❓'}
            </div>
            <div className="text-2xl font-bold text-tiger-red">
              {character.look ? CHARACTER_OPTIONS.look.find(l => l.id === character.look)?.name : 'Choose Your Look'}
            </div>
            <div className="text-lg text-gray-600 mt-2">
              {character.disciplineStyle ? CHARACTER_OPTIONS.disciplineStyle.find(d => d.id === character.disciplineStyle)?.name : 'Select Discipline Style'}
            </div>
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
