import React, { useMemo } from 'react'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry'
import { createClothMaterial } from '../materials'

interface TorsoProps {
  variant: 'classic' | 'corporate' | 'insta' | 'grandma'
  position?: [number, number, number]
  breathing?: number
}

export const Torso: React.FC<TorsoProps> = ({ 
  variant, 
  position = [0, 0.8, 0], 
  breathing = 0 
}) => {
  // Create cloth material
  const clothMaterial = useMemo(() => createClothMaterial(variant), [variant])

  // Torso geometry with rounded edges for toy-like feel
  const torsoGeometry = useMemo(() => {
    return new RoundedBoxGeometry(0.8, 1.0, 0.4, 6, 0.05)
  }, [])

  // Breathing scale
  const breathingScale = 1 + breathing * 0.015

  return (
    <group position={position}>
      {/* Main torso */}
      <mesh 
        geometry={torsoGeometry} 
        material={clothMaterial}
        scale={[1, breathingScale, 1]}
        castShadow
        receiveShadow
      />
      
      {/* Outfit details based on variant */}
      {variant === 'corporate' && (
        <>
          {/* Collar */}
          <mesh 
            geometry={new RoundedBoxGeometry(0.6, 0.15, 0.41, 4, 0.02)} 
            position={[0, 0.35, 0]}
            castShadow
          >
            <meshPhysicalMaterial color="#FFFFFF" roughness={0.1} />
          </mesh>
          
          {/* Buttons */}
          {[-0.15, 0, 0.15].map((y, i) => (
            <mesh 
              key={i}
              geometry={new RoundedBoxGeometry(0.04, 0.04, 0.02, 2, 0.01)} 
              position={[0, y, 0.21]}
              castShadow
            >
              <meshPhysicalMaterial color="#C0C0C0" metalness={0.8} roughness={0.2} />
            </mesh>
          ))}
        </>
      )}
      
      {variant === 'classic' && (
        <>
          {/* Traditional dress pattern */}
          <mesh 
            geometry={new RoundedBoxGeometry(0.82, 0.2, 0.41, 4, 0.01)} 
            position={[0, 0.2, 0]}
            castShadow
          >
            <meshPhysicalMaterial color="#FFD700" roughness={0.3} />
          </mesh>
        </>
      )}
      
      {variant === 'insta' && (
        <>
          {/* Trendy crop top style */}
          <mesh 
            geometry={new RoundedBoxGeometry(0.82, 0.6, 0.41, 4, 0.02)} 
            position={[0, 0.1, 0]}
            castShadow
          >
            <meshPhysicalMaterial 
              color="#FF69B4" 
              roughness={0.2} 
              clearcoat={0.3}
            />
          </mesh>
        </>
      )}
      
      {variant === 'grandma' && (
        <>
          {/* Cardigan buttons */}
          {[-0.2, -0.1, 0, 0.1, 0.2].map((y, i) => (
            <mesh 
              key={i}
              geometry={new RoundedBoxGeometry(0.03, 0.03, 0.02, 2, 0.01)} 
              position={[0, y, 0.21]}
              castShadow
            >
              <meshPhysicalMaterial color="#8B4513" roughness={0.8} />
            </mesh>
          ))}
        </>
      )}
    </group>
  )
}
