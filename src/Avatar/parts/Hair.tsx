import React, { useRef, useMemo } from 'react'
import { Mesh, CapsuleGeometry } from 'three'
import { useFrame } from '@react-three/fiber'
import { createHairMaterial } from '../materials'

interface HairProps {
  variant: 'classic' | 'corporate' | 'insta' | 'grandma'
  position?: [number, number, number]
  sway?: number
}

export const Hair: React.FC<HairProps> = ({ 
  variant, 
  position = [0, 1.6, 0], 
  sway = 0 
}) => {
  const hairRef = useRef<Mesh>(null)

  // Create hair material
  const hairMaterial = useMemo(() => createHairMaterial(variant), [variant])

  // Hair geometry based on variant
  const hairGeometry = useMemo(() => {
    switch (variant) {
      case 'classic':
        // Short, neat hair
        return new CapsuleGeometry(0.4, 0.3, 4, 16)
      case 'corporate':
        // Professional bob cut
        return new CapsuleGeometry(0.38, 0.35, 4, 16)
      case 'insta':
        // Trendy layered hair
        return new CapsuleGeometry(0.42, 0.4, 4, 16)
      case 'grandma':
        // Shorter, more rounded
        return new CapsuleGeometry(0.36, 0.25, 4, 16)
      default:
        return new CapsuleGeometry(0.4, 0.3, 4, 16)
    }
  }, [variant])

  // Apply hair sway animation
  useFrame(() => {
    if (hairRef.current) {
      hairRef.current.rotation.z = sway * 0.05
      hairRef.current.rotation.x = Math.sin(sway * 2) * 0.02
    }
  })

  return (
    <group position={position}>
      {/* Main hair volume */}
      <mesh 
        ref={hairRef}
        geometry={hairGeometry} 
        material={hairMaterial}
        position={[0, 0.15, -0.05]}
        castShadow
        receiveShadow
      />
      
      {/* Hair details based on variant */}
      {variant === 'insta' && (
        <>
          {/* Side bangs */}
          <mesh 
            geometry={new CapsuleGeometry(0.15, 0.2, 3, 8)} 
            material={hairMaterial}
            position={[-0.3, 0.1, 0.1]}
            rotation={[0, 0, -0.3]}
            castShadow
          />
          <mesh 
            geometry={new CapsuleGeometry(0.15, 0.2, 3, 8)} 
            material={hairMaterial}
            position={[0.3, 0.1, 0.1]}
            rotation={[0, 0, 0.3]}
            castShadow
          />
        </>
      )}
      
      {variant === 'grandma' && (
        <>
          {/* Hair bun */}
          <mesh 
            geometry={new CapsuleGeometry(0.12, 0.08, 3, 8)} 
            material={hairMaterial}
            position={[0, 0.25, -0.2]}
            castShadow
          />
        </>
      )}
      
      {variant === 'corporate' && (
        <>
          {/* Professional side part */}
          <mesh 
            geometry={new CapsuleGeometry(0.08, 0.15, 2, 8)} 
            material={hairMaterial}
            position={[-0.2, 0.2, 0.15]}
            rotation={[0, 0, -0.2]}
            castShadow
          />
        </>
      )}
    </group>
  )
}
