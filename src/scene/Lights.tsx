import React from 'react'
import { Stage, Environment } from '@react-three/drei'

export type LightingPreset = 'studio' | 'warm' | 'school'

interface LightsProps {
  preset: LightingPreset
  useStage?: boolean
}

export const Lights: React.FC<LightsProps> = ({ preset, useStage = true }) => {
  if (useStage) {
    // Use drei Stage for professional lighting
    const stageProps = {
      studio: {
        preset: 'rembrandt' as const,
        intensity: 1.2,
        environment: 'city' as const
      },
      warm: {
        preset: 'soft' as const,
        intensity: 0.8,
        environment: 'sunset' as const
      },
      school: {
        preset: 'portrait' as const,
        intensity: 1.0,
        environment: 'warehouse' as const
      }
    }

    return (
      <>
        <Stage {...stageProps[preset]} shadows>
          {/* Stage will wrap the avatar automatically */}
        </Stage>
        <Environment files="/hdri/venice_sunset_1k.hdr" />
      </>
    )
  }

  // Custom three-point lighting setup
  const lightConfigs = {
    studio: {
      key: { color: '#FFFFFF', intensity: 2.2, position: [2, 3, 2] as [number, number, number] },
      fill: { color: '#E6F3FF', intensity: 0.7, position: [-2, 1, 1] as [number, number, number] },
      rim: { color: '#FFE6CC', intensity: 1.8, position: [-1, 3, -2] as [number, number, number] }
    },
    warm: {
      key: { color: '#FFE4B5', intensity: 1.8, position: [2, 3, 2] as [number, number, number] },
      fill: { color: '#FFF8DC', intensity: 0.5, position: [-2, 1, 1] as [number, number, number] },
      rim: { color: '#FFD700', intensity: 1.2, position: [-1, 3, -2] as [number, number, number] }
    },
    school: {
      key: { color: '#F0F8FF', intensity: 2.0, position: [2, 4, 2] as [number, number, number] },
      fill: { color: '#F5F5F5', intensity: 0.8, position: [-2, 1, 1] as [number, number, number] },
      rim: { color: '#E0E0E0', intensity: 1.5, position: [-1, 3, -2] as [number, number, number] }
    }
  }

  const config = lightConfigs[preset]

  return (
    <>
      {/* Ambient light for overall illumination */}
      <ambientLight intensity={0.3} color="#F5F5F5" />
      
      {/* Key light (main light source) */}
      <directionalLight
        position={config.key.position}
        intensity={config.key.intensity}
        color={config.key.color}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-bias={-0.0001}
      />
      
      {/* Fill light (softens shadows) */}
      <directionalLight
        position={config.fill.position}
        intensity={config.fill.intensity}
        color={config.fill.color}
      />
      
      {/* Rim light (creates edge definition) */}
      <directionalLight
        position={config.rim.position}
        intensity={config.rim.intensity}
        color={config.rim.color}
      />
      
      {/* Point light for additional warmth */}
      <pointLight
        position={[0, 2, 3]}
        intensity={0.5}
        color={config.key.color}
        distance={10}
        decay={2}
      />
      
      {/* HDRI Environment */}
      <Environment files="/hdri/venice_sunset_1k.hdr" />
    </>
  )
}
