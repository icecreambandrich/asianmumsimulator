import React, { useRef, useMemo } from 'react'
import { Mesh, RingGeometry } from 'three'
import { useFrame } from '@react-three/fiber'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { WEAPON_MATERIALS } from '../materials'
import { Text } from '@react-three/drei'

interface WeaponProps {
  type: 'slipper' | 'spoon' | 'duster' | 'stare'
  position?: [number, number, number]
  isAnimating?: boolean
  side?: 'left' | 'right'
}

export const Weapon: React.FC<WeaponProps> = ({ 
  type, 
  position = [0.8, 0.5, 0], 
  isAnimating = false,
  side = 'right'
}) => {
  const weaponRef = useRef<Mesh>(null)
  const animationTime = useRef(0)

  // Animation logic
  useFrame((state, delta) => {
    if (!weaponRef.current) return
    
    if (isAnimating) {
      animationTime.current += delta
      
      switch (type) {
        case 'slipper':
          // Boomerang arc animation
          const arc = Math.sin(animationTime.current * 3) * 0.5
          weaponRef.current.position.z = arc
          weaponRef.current.rotation.z = animationTime.current * 5
          break
          
        case 'spoon':
          // Twirl animation
          weaponRef.current.rotation.z = animationTime.current * 8
          break
          
        case 'duster':
          // Dust sparkle (handled by particles)
          weaponRef.current.rotation.y = Math.sin(animationTime.current * 4) * 0.3
          break
          
        case 'stare':
          // Pulsing glow
          const pulse = 1 + Math.sin(animationTime.current * 6) * 0.2
          weaponRef.current.scale.setScalar(pulse)
          break
      }
    } else {
      // Reset animation
      animationTime.current = 0
      if (weaponRef.current) {
        weaponRef.current.position.z = 0
        weaponRef.current.rotation.set(0, 0, 0)
        weaponRef.current.scale.setScalar(1)
      }
    }
  })

  // Create weapon geometry and material
  const { geometry, material } = useMemo(() => {
    const mat = WEAPON_MATERIALS[type]()
    
    switch (type) {
      case 'slipper':
        return {
          geometry: new RoundedBoxGeometry(0.3, 0.05, 0.15, 4, 0.02),
          material: mat
        }
        
      case 'spoon':
        return {
          geometry: new RoundedBoxGeometry(0.05, 0.4, 0.02, 4, 0.01),
          material: mat
        }
        
      case 'duster':
        return {
          geometry: new RoundedBoxGeometry(0.03, 0.3, 0.03, 4, 0.01),
          material: mat
        }
        
      case 'stare':
        return {
          geometry: new RingGeometry(0.1, 0.15, 16),
          material: mat
        }
        
      default:
        return {
          geometry: new RoundedBoxGeometry(0.1, 0.1, 0.1, 4, 0.02),
          material: mat
        }
    }
  }, [type])

  const adjustedPosition: [number, number, number] = side === 'left' 
    ? [-position[0], position[1], position[2]]
    : position

  return (
    <group position={adjustedPosition}>
      <mesh 
        ref={weaponRef}
        geometry={geometry} 
        material={material}
        castShadow
      />
      
      {/* Weapon-specific details */}
      {type === 'slipper' && (
        <>
          {/* Slipper strap */}
          <mesh 
            geometry={new RoundedBoxGeometry(0.25, 0.02, 0.02, 2, 0.01)} 
            material={material}
            position={[0, 0.03, 0]}
            castShadow
          />
        </>
      )}
      
      {type === 'spoon' && (
        <>
          {/* Spoon bowl */}
          <mesh 
            geometry={new RoundedBoxGeometry(0.08, 0.1, 0.03, 4, 0.02)} 
            material={material}
            position={[0, 0.15, 0]}
            castShadow
          />
        </>
      )}
      
      {type === 'duster' && (
        <>
          {/* Feather details */}
          {[-0.02, 0, 0.02].map((x, i) => (
            <mesh 
              key={i}
              geometry={new RoundedBoxGeometry(0.01, 0.08, 0.01, 2, 0.005)} 
              position={[x, 0.12, 0]}
              castShadow
            >
              <meshPhysicalMaterial 
                color="#F5F5DC" 
                roughness={0.95}
                transmission={0.3}
              />
            </mesh>
          ))}
        </>
      )}
      
      {type === 'stare' && (
        <>
          {/* Eye emoji effect */}
          <Text
            position={[0, 0, 0.01]}
            fontSize={0.2}
            color="#FFFF00"
            anchorX="center"
            anchorY="middle"
          >
            👁️
          </Text>
          
          {/* Shockwave rings */}
          {isAnimating && [0.2, 0.4, 0.6].map((radius, i) => (
            <mesh 
              key={i}
              geometry={new RingGeometry(radius, radius + 0.02, 16)} 
              position={[0, 0, -0.1]}
              rotation={[Math.PI / 2, 0, 0]}
            >
              <meshBasicMaterial 
                color="#FFFF00" 
                transparent 
                opacity={0.3 - i * 0.1}
              />
            </mesh>
          ))}
        </>
      )}
    </group>
  )
}
