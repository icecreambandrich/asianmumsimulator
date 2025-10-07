import React, { useMemo } from 'react'
import { CapsuleGeometry } from 'three'
import { createClothMaterial } from '../materials'

interface LegsProps {
  variant: 'classic' | 'corporate' | 'insta' | 'grandma'
  position?: [number, number, number]
}

export const Legs: React.FC<LegsProps> = ({ 
  variant, 
  position = [0, 0, 0] 
}) => {
  // Create materials based on variant
  const legMaterial = useMemo(() => {
    const colors = {
      classic: '#2F4F4F', // Dark pants
      corporate: '#000080', // Navy pants
      insta: '#4169E1', // Blue jeans
      grandma: '#8B4513' // Brown pants
    }
    
    return createClothMaterial(variant)
  }, [variant])

  // Leg geometry
  const legGeometry = useMemo(() => {
    return new CapsuleGeometry(0.12, 0.8, 4, 16)
  }, [])

  return (
    <group position={position}>
      {/* Left Leg */}
      <mesh 
        geometry={legGeometry} 
        material={legMaterial}
        position={[-0.15, -0.4, 0]}
        castShadow
        receiveShadow
      />
      
      {/* Right Leg */}
      <mesh 
        geometry={legGeometry} 
        material={legMaterial}
        position={[0.15, -0.4, 0]}
        castShadow
        receiveShadow
      />
      
      {/* Variant-specific details */}
      {variant === 'insta' && (
        <>
          {/* Jeans seams */}
          <mesh 
            geometry={new CapsuleGeometry(0.005, 0.8, 2, 8)} 
            position={[-0.18, -0.4, 0]}
            castShadow
          >
            <meshPhysicalMaterial color="#1E90FF" roughness={0.8} />
          </mesh>
          <mesh 
            geometry={new CapsuleGeometry(0.005, 0.8, 2, 8)} 
            position={[0.18, -0.4, 0]}
            castShadow
          >
            <meshPhysicalMaterial color="#1E90FF" roughness={0.8} />
          </mesh>
        </>
      )}
      
      {variant === 'corporate' && (
        <>
          {/* Dress pants crease */}
          <mesh 
            geometry={new CapsuleGeometry(0.002, 0.8, 2, 6)} 
            position={[-0.15, -0.4, 0.12]}
            castShadow
          >
            <meshPhysicalMaterial color="#000040" roughness={0.9} />
          </mesh>
          <mesh 
            geometry={new CapsuleGeometry(0.002, 0.8, 2, 6)} 
            position={[0.15, -0.4, 0.12]}
            castShadow
          >
            <meshPhysicalMaterial color="#000040" roughness={0.9} />
          </mesh>
        </>
      )}
    </group>
  )
}
