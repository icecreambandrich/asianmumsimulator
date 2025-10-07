import React, { useState, Suspense, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, ContactShadows, Loader } from '@react-three/drei'
import { ACESFilmicToneMapping, LinearSRGBColorSpace } from 'three'

import { Avatar, AvatarConfig } from '../Avatar/Avatar'
import { Lights, LightingPreset } from '../scene/Lights'
import { PostFX, QualityLevel } from '../scene/PostFX'
import { useScreenshot } from '../hooks/useScreenshot'

const CHARACTER_OPTIONS = {
  look: [
    { id: 'classic', name: 'Classic Auntie', emoji: '👩‍🦳', description: 'Traditional wisdom with a side of judgment' },
    { id: 'corporate', name: 'Corporate Mum', emoji: '👩‍💼', description: 'Efficiency expert in heels and spreadsheets' },
    { id: 'insta', name: 'Insta Mum', emoji: '🤳', description: 'Aesthetic parenting with perfect lighting' },
    { id: 'grandma', name: 'Grandma Energy', emoji: '👵', description: 'Ancient wisdom meets unlimited snacks' }
  ],
  disciplineStyle: [
    { id: 'silent', name: 'Silent Guilt', emoji: '😔', description: 'The power of disappointed sighs' },
    { id: 'verbal', name: 'Verbal Uppercut', emoji: '🗣️', description: 'Words that cut deeper than any blade' },
    { id: 'lecture', name: 'Lecture Combo', emoji: '📢', description: 'Educational beatdown with historical context' },
    { id: 'physical', name: 'Physical Precision', emoji: '🎯', description: 'Surgical strikes with household items' }
  ],
  weapon: [
    { id: 'slipper', name: 'Flying Slipper', emoji: '🥿', description: 'Heat-seeking household missile' },
    { id: 'spoon', name: 'Wooden Spoon', emoji: '🥄', description: 'Multi-purpose cooking and correction tool' },
    { id: 'duster', name: 'Feather Duster', emoji: '🪶', description: 'Clean house, clean attitude' },
    { id: 'stare', name: 'The Stare', emoji: '👁️', description: 'Soul-piercing optical warfare' }
  ]
}

interface CharacterCreation3DProps {
  character: any
  setCharacter: (character: any) => void
  onComplete: () => void
}

export const CharacterCreation3D: React.FC<CharacterCreation3DProps> = ({
  character,
  setCharacter,
  onComplete
}) => {
  const [quality, setQuality] = useState<QualityLevel>('high')
  const [lightingPreset, setLightingPreset] = useState<LightingPreset>('studio')
  const [hoveredPart, setHoveredPart] = useState<string | null>(null)
  const [isAvatarHovered, setIsAvatarHovered] = useState(false)

  // Screenshot functionality
  const { takeScreenshot } = useScreenshot()

  const handleSelection = useCallback((category: string, option: string) => {
    setCharacter((prev: any) => ({
      ...prev,
      [category]: option
    }))
  }, [setCharacter])

  const handleScreenshot = useCallback(() => {
    const filename = `${character.look || 'my'}-asian-mum-${Date.now()}.png`
    takeScreenshot(filename, 2160)
  }, [takeScreenshot, character.look])

  const isComplete = character.look && character.disciplineStyle && character.weapon

  // Avatar configuration
  const avatarConfig: AvatarConfig = {
    look: character.look || 'classic',
    disciplineStyle: character.disciplineStyle || 'silent',
    weapon: character.weapon || 'slipper',
    weaponSide: 'right'
  }

  // Auto-adjust quality based on device capabilities
  React.useEffect(() => {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
    
    if (!gl) {
      setQuality('low')
      return
    }

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    const hasHighPerformance = gl.getParameter(gl.MAX_TEXTURE_SIZE) >= 4096
    
    if (isMobile) {
      setQuality('medium')
    } else if (!hasHighPerformance) {
      setQuality('medium')
    }
  }, [])

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-slate-100 via-gray-100 to-blue-100">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-tiger-red mb-4">Create Your Mum 👩‍👧‍👦</h1>
          <p className="text-xl text-gray-700">Choose your parenting superpowers wisely...</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 3D Avatar Display */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Quality and Lighting Controls */}
              <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
                <div className="flex space-x-4">
                  <select 
                    value={quality} 
                    onChange={(e) => setQuality(e.target.value as QualityLevel)}
                    className="px-3 py-1 rounded-lg border text-sm"
                  >
                    <option value="high">High Quality</option>
                    <option value="medium">Medium Quality</option>
                    <option value="low">Low Quality</option>
                  </select>
                  
                  <select 
                    value={lightingPreset} 
                    onChange={(e) => setLightingPreset(e.target.value as LightingPreset)}
                    className="px-3 py-1 rounded-lg border text-sm"
                  >
                    <option value="studio">Studio Lighting</option>
                    <option value="warm">Warm Home</option>
                    <option value="school">School Hallway</option>
                  </select>
                </div>
                
                <button
                  onClick={handleScreenshot}
                  className="px-4 py-2 bg-tiger-red text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
                >
                  📸 Share My Mum
                </button>
              </div>

              {/* 3D Canvas */}
              <div className="aspect-square relative">
                <Canvas
                  camera={{ fov: 35, position: [0, 1.5, 5] }}
                  shadows
                  gl={{
                    antialias: true,
                    toneMapping: ACESFilmicToneMapping,
                    outputColorSpace: LinearSRGBColorSpace
                  }}
                  onCreated={({ gl }) => {
                    gl.setPixelRatio(Math.min(window.devicePixelRatio, quality === 'high' ? 2 : 1))
                    gl.shadowMap.enabled = true
                    gl.shadowMap.type = quality === 'high' ? 2 : 0 // PCFSoftShadowMap : BasicShadowMap
                  }}
                >
                  <Suspense fallback={null}>
                    {/* Lighting */}
                    <Lights preset={lightingPreset} useStage={false} />
                    
                    {/* Avatar */}
                    <Avatar 
                      config={avatarConfig}
                      isHovered={isAvatarHovered}
                      onPartHover={setHoveredPart}
                      onWeaponClick={() => console.log('Weapon clicked!')}
                    />
                    
                    {/* Ground shadows */}
                    <ContactShadows 
                      opacity={0.5} 
                      scale={3} 
                      blur={3} 
                      far={2} 
                      resolution={quality === 'high' ? 1024 : 512}
                    />
                    
                    {/* Camera controls */}
                    <OrbitControls
                      enablePan={false}
                      enableZoom={true}
                      enableRotate={true}
                      minDistance={4.5}
                      maxDistance={6.5}
                      minPolarAngle={Math.PI / 2 - 0.4}
                      maxPolarAngle={Math.PI / 2 + 0.4}
                      minAzimuthAngle={-Math.PI / 6}
                      maxAzimuthAngle={Math.PI / 6}
                      target={[0, 1, 0]}
                    />
                    
                    {/* Post-processing effects */}
                    <PostFX quality={quality} enabled={quality !== 'low'} />
                  </Suspense>
                </Canvas>
                
                {/* Loading fallback */}
                <Suspense fallback={<Loader />} />
              </div>
            </div>
          </div>

          {/* Controls Panel */}
          <div className="space-y-6">
            {Object.entries(CHARACTER_OPTIONS).map(([category, options]) => (
              <div key={category} className="bg-white rounded-2xl p-6 shadow-xl">
                <h2 className="text-2xl font-bold text-tiger-red mb-4 text-center capitalize">
                  {category === 'disciplineStyle' ? 'Discipline Style' : category}
                  {category === 'look' && ' 👀'}
                  {category === 'disciplineStyle' && ' 💪'}
                  {category === 'weapon' && ' ⚔️'}
                </h2>
                
                <div className="grid grid-cols-1 gap-3">
                  {options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleSelection(category, option.id)}
                      onMouseEnter={() => setIsAvatarHovered(true)}
                      onMouseLeave={() => setIsAvatarHovered(false)}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                        character[category] === option.id
                          ? 'border-tiger-red bg-red-50 shadow-lg scale-105'
                          : 'border-gray-200 hover:border-tiger-gold hover:bg-yellow-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="text-3xl">{option.emoji}</div>
                        <div>
                          <h3 className="font-bold text-tiger-red">{option.name}</h3>
                          <p className="text-sm text-gray-600">{option.description}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Continue Button */}
            <button
              onClick={onComplete}
              disabled={!isComplete}
              className={`w-full text-xl px-8 py-4 rounded-full font-bold transition-all duration-300 ${
                isComplete
                  ? 'tiger-button animate-pulse'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isComplete ? 'Begin the Chaos! 🚀' : 'Complete Your Character First! ⚠️'}
            </button>
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
