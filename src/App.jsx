import React, { useState, useEffect } from 'react'
import StartScreen from './components/StartScreen'
import CharacterCreation from './components/CharacterCreation'
import GamePlay from './components/GamePlay'
import EndingScreen from './components/EndingScreen'

const GAME_STATES = {
  START: 'start',
  CHARACTER_CREATION: 'character_creation',
  GAMEPLAY: 'gameplay',
  ENDING: 'ending'
}

function App() {
  const [gameState, setGameState] = useState(GAME_STATES.START)
  const [character, setCharacter] = useState({
    look: '',
    disciplineStyle: '',
    weapon: ''
  })
  const [stats, setStats] = useState({
    tigerPoints: 50,
    zenPoints: 50,
    stress: 30,
    reputation: 50
  })
  const [currentRound, setCurrentRound] = useState(0)
  const [gameHistory, setGameHistory] = useState([])

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
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-red-100">
      {gameState === GAME_STATES.START && (
        <StartScreen onStart={() => setGameState(GAME_STATES.CHARACTER_CREATION)} />
      )}
      
      {gameState === GAME_STATES.CHARACTER_CREATION && (
        <CharacterCreation 
          character={character}
          setCharacter={setCharacter}
          onComplete={() => setGameState(GAME_STATES.GAMEPLAY)}
        />
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
