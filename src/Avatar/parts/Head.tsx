import React, { useRef, useMemo } from 'react'
import { Mesh, SphereGeometry } from 'three'
import { useFrame } from '@react-three/fiber'
import { createSkinMaterial, createEyeMaterial, COLORS } from '../materials'

interface HeadProps {
  variant: 'classic' | 'corporate' | 'insta' | 'grandma'
  position?: [number, number, number]
  breathing?: number
  blinking?: number
}

export const Head: React.FC<HeadProps> = ({ 
  variant, 
  position = [0, 1.6, 0], 
  breathing = 0,
  blinking = 0 
}) => {
  const headRef = useRef<Mesh>(null)
  const leftEyeRef = useRef<Mesh>(null)
  const rightEyeRef = useRef<Mesh>(null)

  // Create materials
  const skinMaterial = useMemo(() => createSkinMaterial(variant), [variant])
  const eyeMaterial = useMemo(() => createEyeMaterial(), [])

  // Head geometry with higher detail for smooth curves
  const headGeometry = useMemo(() => {
    return new SphereGeometry(0.45, 64, 64) // Larger and more detailed
  }, [])

  // Eye geometry
  const eyeGeometry = useMemo(() => {
    return new SphereGeometry(0.06, 16, 16)
  }, [])

  // Mouth geometry
  const mouthGeometry = useMemo(() => {
    return new SphereGeometry(0.04, 8, 8)
  }, [])

  // Apply breathing animation
  useFrame(() => {
    if (headRef.current) {
      const breathingScale = 1 + breathing * 0.02
      headRef.current.scale.setScalar(breathingScale)
    }
    
    // Apply blinking
    if (leftEyeRef.current && rightEyeRef.current) {
      const blinkScale = 1 - blinking * 0.9
      leftEyeRef.current.scale.setY(blinkScale)
      rightEyeRef.current.scale.setY(blinkScale)
    }
  })

  return (
    <group position={position}>
      {/* Main Head */}
      <mesh ref={headRef} geometry={headGeometry} material={skinMaterial} castShadow receiveShadow />
      
      {/* Eyes */}
      <mesh 
        ref={leftEyeRef}
        geometry={eyeGeometry} 
        material={eyeMaterial}
        position={[-0.12, 0.08, 0.25]}
        castShadow
      />
      <mesh 
        ref={rightEyeRef}
        geometry={eyeGeometry} 
        material={eyeMaterial}
        position={[0.12, 0.08, 0.25]}
        castShadow
      />
      
      {/* Pupils */}
      <mesh 
        geometry={new SphereGeometry(0.025, 8, 8)} 
        position={[-0.12, 0.08, 0.31]}
      >
        <meshBasicMaterial color="#000000" />
      </mesh>
      <mesh 
        geometry={new SphereGeometry(0.025, 8, 8)} 
        position={[0.12, 0.08, 0.31]}
      >
        <meshBasicMaterial color="#000000" />
      </mesh>
      
      {/* Eye highlights */}
      <mesh 
        geometry={new SphereGeometry(0.01, 6, 6)} 
        position={[-0.115, 0.09, 0.32]}
      >
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>
      <mesh 
        geometry={new SphereGeometry(0.01, 6, 6)} 
        position={[0.125, 0.09, 0.32]}
      >
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>
      
      {/* Nose */}
      <mesh 
        geometry={new SphereGeometry(0.02, 8, 8)} 
        material={skinMaterial}
        position={[0, -0.02, 0.28]}
        scale={[0.8, 1.2, 0.6]}
        castShadow
      />
      
      {/* Mouth */}
      <mesh 
        geometry={mouthGeometry} 
        position={[0, -0.15, 0.25]}
        scale={[1.5, 0.8, 0.5]}
        castShadow
      >
        <meshPhysicalMaterial 
          color="#CD5C5C" 
          roughness={0.3}
          metalness={0.0}
          clearcoat={0.8}
        />
      </mesh>
    </group>
  )
}
