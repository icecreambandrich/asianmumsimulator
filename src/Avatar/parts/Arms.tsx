import React, { useMemo } from 'react'
import { CapsuleGeometry } from 'three'
import { createSkinMaterial, createClothMaterial } from '../materials'

interface ArmsProps {
  variant: 'classic' | 'corporate' | 'insta' | 'grandma'
  leftPosition?: [number, number, number]
  rightPosition?: [number, number, number]
  leftRotation?: [number, number, number]
  rightRotation?: [number, number, number]
}

export const Arms: React.FC<ArmsProps> = ({ 
  variant,
  leftPosition = [-0.6, 0.9, 0],
  rightPosition = [0.6, 0.9, 0],
  leftRotation = [0, 0, -0.2],
  rightRotation = [0, 0, 0.2]
}) => {
  // Create materials
  const skinMaterial = useMemo(() => createSkinMaterial(variant), [variant])
  const clothMaterial = useMemo(() => createClothMaterial(variant), [variant])

  // Arm geometry
  const armGeometry = useMemo(() => {
    return new CapsuleGeometry(0.08, 0.5, 4, 16)
  }, [])

  // Hand geometry
  const handGeometry = useMemo(() => {
    return new CapsuleGeometry(0.06, 0.15, 3, 12)
  }, [])

  return (
    <group>
      {/* Left Arm */}
      <group position={leftPosition} rotation={leftRotation}>
        {/* Upper arm (clothed) */}
        <mesh 
          geometry={armGeometry} 
          material={clothMaterial}
          position={[0, -0.15, 0]}
          castShadow
          receiveShadow
        />
        
        {/* Forearm (skin) */}
        <mesh 
          geometry={new CapsuleGeometry(0.07, 0.3, 4, 12)} 
          material={skinMaterial}
          position={[0, -0.45, 0]}
          castShadow
          receiveShadow
        />
        
        {/* Hand */}
        <mesh 
          geometry={handGeometry} 
          material={skinMaterial}
          position={[0, -0.65, 0]}
          castShadow
        />
        
        {/* Fingers */}
        {[-0.03, -0.01, 0.01, 0.03].map((x, i) => (
          <mesh 
            key={i}
            geometry={new CapsuleGeometry(0.01, 0.05, 2, 6)} 
            material={skinMaterial}
            position={[x, -0.72, 0]}
            castShadow
          />
        ))}
      </group>

      {/* Right Arm */}
      <group position={rightPosition} rotation={rightRotation}>
        {/* Upper arm (clothed) */}
        <mesh 
          geometry={armGeometry} 
          material={clothMaterial}
          position={[0, -0.15, 0]}
          castShadow
          receiveShadow
        />
        
        {/* Forearm (skin) */}
        <mesh 
          geometry={new CapsuleGeometry(0.07, 0.3, 4, 12)} 
          material={skinMaterial}
          position={[0, -0.45, 0]}
          castShadow
          receiveShadow
        />
        
        {/* Hand */}
        <mesh 
          geometry={handGeometry} 
          material={skinMaterial}
          position={[0, -0.65, 0]}
          castShadow
        />
        
        {/* Fingers */}
        {[-0.03, -0.01, 0.01, 0.03].map((x, i) => (
          <mesh 
            key={i}
            geometry={new CapsuleGeometry(0.01, 0.05, 2, 6)} 
            material={skinMaterial}
            position={[x, -0.72, 0]}
            castShadow
          />
        ))}
      </group>
    </group>
  )
}
