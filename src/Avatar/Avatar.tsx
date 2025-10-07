import React, { useRef, useState, useEffect } from 'react'
import { Group } from 'three'
import { useFrame } from '@react-three/fiber'
import { useSpring, animated } from '@react-spring/three'

import { Head } from './parts/Head'
import { Hair } from './parts/Hair'
import { Torso } from './parts/Torso'
import { Arms } from './parts/Arms'
import { Legs } from './parts/Legs'
import { Shoes } from './parts/Shoes'
import { Weapon } from './parts/Weapon'

import { DISCIPLINE_POSES, BREATHING_ANIMATION, HAIR_SWAY, BLINK_ANIMATION } from './poses'

export interface AvatarConfig {
  look: 'classic' | 'corporate' | 'insta' | 'grandma'
  disciplineStyle: 'silent' | 'verbal' | 'lecture' | 'physical'
  weapon: 'slipper' | 'spoon' | 'duster' | 'stare'
  weaponSide: 'left' | 'right'
}

interface AvatarProps {
  config: AvatarConfig
  isHovered?: boolean
  onPartHover?: (part: string) => void
  onWeaponClick?: () => void
}

export const Avatar: React.FC<AvatarProps> = ({ 
  config, 
  isHovered = false,
  onPartHover,
  onWeaponClick 
}) => {
  const avatarRef = useRef<Group>(null)
  const [animationTime, setAnimationTime] = useState(0)
  const [isBlinking, setIsBlinking] = useState(false)
  const [weaponAnimating, setWeaponAnimating] = useState(false)
  const [nextBlinkTime, setNextBlinkTime] = useState(
    Date.now() + Math.random() * 2000 + 4000
  )

  // Spring animation for hover effects
  const { scale, rotationY } = useSpring({
    scale: isHovered ? 1.05 : 1,
    rotationY: isHovered ? 0.1 : 0,
    config: { tension: 300, friction: 30 }
  })

  // Animation loop
  useFrame((state, delta) => {
    setAnimationTime(prev => prev + delta * 1000)
    
    // Handle blinking
    const now = Date.now()
    if (now >= nextBlinkTime && !isBlinking) {
      setIsBlinking(true)
      setTimeout(() => {
        setIsBlinking(false)
        setNextBlinkTime(now + Math.random() * 2000 + 4000)
      }, BLINK_ANIMATION.duration)
    }
  })

  // Calculate animation values
  const breathingValue = Math.sin(animationTime / BREATHING_ANIMATION.duration * Math.PI * 2)
  const hairSwayValue = Math.sin(animationTime / HAIR_SWAY.duration * Math.PI * 2) * HAIR_SWAY.amplitude
  const blinkValue = isBlinking ? 1 : 0

  // Get pose based on discipline style
  const currentPose = DISCIPLINE_POSES[config.disciplineStyle] || DISCIPLINE_POSES.silent

  // Handle weapon click
  const handleWeaponClick = () => {
    setWeaponAnimating(true)
    onWeaponClick?.()
    
    // Reset animation after duration
    setTimeout(() => {
      setWeaponAnimating(false)
    }, 2000)
  }

  return (
    <animated.group 
      ref={avatarRef}
      scale={scale}
      rotation-y={rotationY}
    >
      {/* Head */}
      <Head 
        variant={config.look}
        position={[currentPose.head.position.x, currentPose.head.position.y, currentPose.head.position.z]}
        breathing={breathingValue}
        blinking={blinkValue}
      />
      
      {/* Hair */}
      <Hair 
        variant={config.look}
        position={[currentPose.head.position.x, currentPose.head.position.y, currentPose.head.position.z]}
        sway={hairSwayValue}
      />
      
      {/* Torso */}
      <Torso 
        variant={config.look}
        position={[currentPose.torso.position.x, currentPose.torso.position.y, currentPose.torso.position.z]}
        breathing={breathingValue}
      />
      
      {/* Arms */}
      <Arms 
        variant={config.look}
        leftPosition={[currentPose.leftArm.position.x, currentPose.leftArm.position.y, currentPose.leftArm.position.z]}
        rightPosition={[currentPose.rightArm.position.x, currentPose.rightArm.position.y, currentPose.rightArm.position.z]}
        leftRotation={[currentPose.leftArm.rotation.x, currentPose.leftArm.rotation.y, currentPose.leftArm.rotation.z]}
        rightRotation={[currentPose.rightArm.rotation.x, currentPose.rightArm.rotation.y, currentPose.rightArm.rotation.z]}
      />
      
      {/* Legs */}
      <Legs 
        variant={config.look}
        position={[0, 0.3, 0]}
      />
      
      {/* Shoes */}
      <Shoes 
        variant={config.look}
        position={[0, -0.8, 0]}
      />
      
      {/* Weapon */}
      <group onClick={handleWeaponClick}>
        <Weapon 
          type={config.weapon}
          position={config.weaponSide === 'right' ? [0.8, 0.5, 0] : [-0.8, 0.5, 0]}
          isAnimating={weaponAnimating}
          side={config.weaponSide}
        />
      </group>
      
      {/* Discipline style badge/aura */}
      {config.disciplineStyle && (
        <mesh position={[0, 2.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.8, 1.0, 32]} />
          <meshBasicMaterial 
            color={
              config.disciplineStyle === 'silent' ? '#4169E1' :
              config.disciplineStyle === 'verbal' ? '#DC143C' :
              config.disciplineStyle === 'lecture' ? '#FFD700' :
              '#9370DB'
            }
            transparent
            opacity={0.2}
          />
        </mesh>
      )}
    </animated.group>
  )
}
