import React, { useState, useEffect } from 'react'
import StartScreen from './components/StartScreen'
import CharacterCreation from './components/CharacterCreation'
import { CharacterCreation3D } from './components/CharacterCreation3D'
import { detectWebGLSupport } from './utils/webglSupport'
import GamePlay from './components/GamePlay'
import EndingScreen from './components/EndingScreen'

const GAME_STATES = {
  START: 'start',
  CHARACTER_CREATION: 'character_creation',
  GAMEPLAY: 'gameplay',
}

function App() {
  const [gameState, setGameState] = useState(GAME_STATES.START)
  const [character, setCharacter] = useState({
    look: null,
    disciplineStyle: null,
    weapon: null
  })
  const [hasWebGL, setHasWebGL] = useState(true)
  const [use3D, setUse3D] = useState(true)
  const [stats, setStats] = useState({
    tigerPoints: 50,
    zenPoints: 50,
    stress: 30,
    reputation: 50
  })
  const [currentRound, setCurrentRound] = useState(0)
  const [gameHistory, setGameHistory] = useState([])

  // Check WebGL support on component mount
  useEffect(() => {
    const webglSupported = detectWebGLSupport()
    setHasWebGL(webglSupported)
    if (!webglSupported) {
      setUse3D(false)
    }
  }, [])

  const updateStats = (changes) => {
    setStats(prevStats => {
      const newStats = { ...prevStats }
      Object.keys(changes).forEach(key => {
        newStats[key] = Math.max(0, Math.min(100, newStats[key] + changes[key]))
      })
      return newStats
    })
  }

  const addToHistory = (moment) => {
    setGameHistory(prev => [...prev, moment])
  }

  const calculateTigerMeter = () => {
    const { tigerPoints, zenPoints, stress, reputation } = stats
    // Tiger meter calculation: more tiger points and reputation, less zen and stress
    return Math.round((tigerPoints * 0.4) + (reputation * 0.3) + ((100 - zenPoints) * 0.2) + (stress * 0.1))
  }

  const getEnding = () => {
    const tigerMeter = calculateTigerMeter()
    if (tigerMeter <= 25) return 'zen'
    if (tigerMeter <= 50) return 'balanced'
    if (tigerMeter <= 75) return 'tiger'
    return 'matriarch'
  }

  const resetGame = () => {
    setGameState(GAME_STATES.START)
    setCharacter({ look: '', disciplineStyle: '', weapon: '' })
    setStats({ tigerPoints: 50, zenPoints: 50, stress: 30, reputation: 50 })
    setCurrentRound(0)
    setGameHistory([])
  }

  const gameProps = {
    character,
    setCharacter,
    stats,
    updateStats,
    currentRound,
    setCurrentRound,
    gameHistory,
    addToHistory,
    calculateTigerMeter,
    getEnding,
    resetGame,
    setGameState,
    GAME_STATES
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-100 to-blue-100">
      {gameState === GAME_STATES.START && (
        <StartScreen onStart={() => setGameState(GAME_STATES.CHARACTER_CREATION)} />
      )}
      
      {gameState === GAME_STATES.CHARACTER_CREATION && (
        <>
          {/* 3D Toggle Button */}
          {hasWebGL && (
            <div className="fixed top-4 right-4 z-50">
              <button
                onClick={() => setUse3D(!use3D)}
                className="bg-tiger-red text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-600 transition-colors"
              >
                {use3D ? '2D View' : '3D View'}
              </button>
            </div>
          )}
          
          {/* Character Creation Component */}
          {use3D && hasWebGL ? (
            <CharacterCreation3D 
              character={character}
              setCharacter={setCharacter}
              onComplete={() => setGameState(GAME_STATES.GAMEPLAY)}
            />
          ) : (
            <CharacterCreation 
              character={character}
              setCharacter={setCharacter}
              onComplete={() => setGameState(GAME_STATES.GAMEPLAY)}
            />
          )}
        </>
      )}
      
      {gameState === GAME_STATES.GAMEPLAY && (
        <GamePlay 
          {...gameProps}
          onGameEnd={() => setGameState(GAME_STATES.ENDING)}
        />
      )}
      
      {gameState === GAME_STATES.ENDING && (
        <EndingScreen {...gameProps} />
      )}
    </div>
  )
}

export default App
