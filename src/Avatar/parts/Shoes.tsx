import React, { useMemo } from 'react'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { createLeatherMaterial } from '../materials'

interface ShoesProps {
  variant: 'classic' | 'corporate' | 'insta' | 'grandma'
  position?: [number, number, number]
}

export const Shoes: React.FC<ShoesProps> = ({ 
  variant, 
  position = [0, -0.9, 0] 
}) => {
  // Create shoe material and geometry based on variant
  const { shoeMaterial, shoeGeometry, heelGeometry } = useMemo(() => {
    switch (variant) {
      case 'classic':
        return {
          shoeMaterial: createLeatherMaterial('#8B4513'), // Brown shoes
          shoeGeometry: new RoundedBoxGeometry(0.25, 0.08, 0.4, 4, 0.02),
          heelGeometry: null
        }
      case 'corporate':
        return {
          shoeMaterial: createLeatherMaterial('#000000'), // Black heels
          shoeGeometry: new RoundedBoxGeometry(0.22, 0.08, 0.35, 4, 0.02),
          heelGeometry: new RoundedBoxGeometry(0.05, 0.15, 0.05, 2, 0.01)
        }
      case 'insta':
        return {
          shoeMaterial: createLeatherMaterial('#FF1493'), // Pink sneakers
          shoeGeometry: new RoundedBoxGeometry(0.28, 0.12, 0.42, 4, 0.03),
          heelGeometry: null
        }
      case 'grandma':
        return {
          shoeMaterial: createLeatherMaterial('#A0522D'), // Brown slippers
          shoeGeometry: new RoundedBoxGeometry(0.26, 0.06, 0.38, 4, 0.03),
          heelGeometry: null
        }
      default:
        return {
          shoeMaterial: createLeatherMaterial('#654321'),
          shoeGeometry: new RoundedBoxGeometry(0.25, 0.08, 0.4, 4, 0.02),
          heelGeometry: null
        }
    }
  }, [variant])

  return (
    <group position={position}>
      {/* Left Shoe */}
      <group position={[-0.15, 0, 0]}>
        <mesh 
          geometry={shoeGeometry} 
          material={shoeMaterial}
          castShadow
          receiveShadow
        />
        
        {/* Heel for corporate */}
        {heelGeometry && variant === 'corporate' && (
          <mesh 
            geometry={heelGeometry} 
            material={shoeMaterial}
            position={[0, -0.08, -0.15]}
            castShadow
          />
        )}
        
        {/* Shoe details */}
        {variant === 'insta' && (
          <>
            {/* Sneaker sole */}
            <mesh 
              geometry={new RoundedBoxGeometry(0.3, 0.04, 0.44, 4, 0.02)} 
              position={[0, -0.08, 0]}
              castShadow
            >
              <meshPhysicalMaterial color="#FFFFFF" roughness={0.8} />
            </mesh>
            
            {/* Laces */}
            {[-0.08, -0.04, 0, 0.04, 0.08].map((z, i) => (
              <mesh 
                key={i}
                geometry={new RoundedBoxGeometry(0.15, 0.01, 0.01, 2, 0.005)} 
                position={[0, 0.04, z]}
                castShadow
              >
                <meshPhysicalMaterial color="#FFFFFF" roughness={0.9} />
              </mesh>
            ))}
          </>
        )}
        
        {variant === 'grandma' && (
          <>
            {/* Slipper fluff */}
            <mesh 
              geometry={new RoundedBoxGeometry(0.24, 0.02, 0.1, 3, 0.01)} 
              position={[0, 0.04, 0.1]}
              castShadow
            >
              <meshPhysicalMaterial 
                color="#F5F5DC" 
                roughness={0.95}
                transmission={0.1}
              />
            </mesh>
          </>
        )}
      </group>

      {/* Right Shoe */}
      <group position={[0.15, 0, 0]}>
        <mesh 
          geometry={shoeGeometry} 
          material={shoeMaterial}
          castShadow
          receiveShadow
        />
        
        {/* Heel for corporate */}
        {heelGeometry && variant === 'corporate' && (
          <mesh 
            geometry={heelGeometry} 
            material={shoeMaterial}
            position={[0, -0.08, -0.15]}
            castShadow
          />
        )}
        
        {/* Shoe details (mirrored) */}
        {variant === 'insta' && (
          <>
            {/* Sneaker sole */}
            <mesh 
              geometry={new RoundedBoxGeometry(0.3, 0.04, 0.44, 4, 0.02)} 
              position={[0, -0.08, 0]}
              castShadow
            >
              <meshPhysicalMaterial color="#FFFFFF" roughness={0.8} />
            </mesh>
            
            {/* Laces */}
            {[-0.08, -0.04, 0, 0.04, 0.08].map((z, i) => (
              <mesh 
                key={i}
                geometry={new RoundedBoxGeometry(0.15, 0.01, 0.01, 2, 0.005)} 
                position={[0, 0.04, z]}
                castShadow
              >
                <meshPhysicalMaterial color="#FFFFFF" roughness={0.9} />
              </mesh>
            ))}
          </>
        )}
        
        {variant === 'grandma' && (
          <>
            {/* Slipper fluff */}
            <mesh 
              geometry={new RoundedBoxGeometry(0.24, 0.02, 0.1, 3, 0.01)} 
              position={[0, 0.04, 0.1]}
              castShadow
            >
              <meshPhysicalMaterial 
                color="#F5F5DC" 
                roughness={0.95}
                transmission={0.1}
              />
            </mesh>
          </>
        )}
      </group>
    </group>
  )
}
