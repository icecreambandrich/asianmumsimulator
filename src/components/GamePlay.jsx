import React, { useState, useEffect } from 'react'
import QuestionScene from './QuestionScene'
import MiniGame from './MiniGame'
import StatsDisplay from './StatsDisplay'

const TOTAL_ROUNDS = 8

const GamePlay = ({ 
  character, 
  stats, 
  updateStats, 
  currentRound, 
  setCurrentRound, 
  addToHistory, 
  onGameEnd 
}) => {
  const [currentScene, setCurrentScene] = useState('question') // 'question' or 'minigame'
  const [sceneComplete, setSceneComplete] = useState(false)

  const handleSceneComplete = (result) => {
    // Add result to history
    addToHistory(result)
    
    // Update stats based on result
    if (result.statChanges) {
      updateStats(result.statChanges)
    }
    
    setSceneComplete(true)
  }

  const nextScene = () => {
    if (currentScene === 'question') {
      setCurrentScene('minigame')
    } else {
      // Move to next round
      const nextRound = currentRound + 1
      if (nextRound >= TOTAL_ROUNDS) {
        onGameEnd()
      } else {
        setCurrentRound(nextRound)
        setCurrentScene('question')
      }
    }
    setSceneComplete(false)
  }

  const getRoundType = () => {
    return currentScene === 'question' ? 'Parenting Dilemma' : 'Mum Skills Test'
  }

  return (
    <div className="min-h-screen p-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="bg-white/90 rounded-2xl p-4 shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold text-tiger-red">
                Round {currentRound + 1} of {TOTAL_ROUNDS}
              </h1>
              <p className="text-lg text-gray-600">{getRoundType()}</p>
            </div>
            <div className="text-right">
              <div className="text-4xl mb-2">
                {character.look === 'classic' && '👩‍🦳'}
                {character.look === 'corporate' && '👩‍💼'}
                {character.look === 'insta' && '🤳'}
                {character.look === 'grandma' && '👵'}
              </div>
              <div className="text-2xl">
                {character.weapon === 'slipper' && '🥿'}
                {character.weapon === 'spoon' && '🥄'}
                {character.weapon === 'duster' && '🪶'}
                {character.weapon === 'stare' && '👁️'}
              </div>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div 
              className="bg-gradient-to-r from-tiger-red to-tiger-gold h-3 rounded-full transition-all duration-500"
              style={{ width: `${((currentRound * 2 + (currentScene === 'minigame' ? 1 : 0)) / (TOTAL_ROUNDS * 2)) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Stats Display */}
      <StatsDisplay stats={stats} />

      {/* Main Game Content */}
      <div className="max-w-4xl mx-auto">
        {currentScene === 'question' ? (
          <QuestionScene 
            round={currentRound}
            character={character}
            onComplete={handleSceneComplete}
            sceneComplete={sceneComplete}
          />
        ) : (
          <MiniGame 
            round={currentRound}
            character={character}
            onComplete={handleSceneComplete}
            sceneComplete={sceneComplete}
          />
        )}

        {/* Continue Button */}
        {sceneComplete && (
          <div className="text-center mt-8">
            <button
              onClick={nextScene}
              className="tiger-button text-xl px-8 py-4 animate-bounce"
            >
              {currentScene === 'question' ? 'Time for Action! 🎮' : 
               currentRound + 1 >= TOTAL_ROUNDS ? 'See My Results! 🏆' : 'Next Challenge! ➡️'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default GamePlay
