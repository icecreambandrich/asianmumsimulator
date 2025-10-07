import React from 'react'
import { EffectComposer, SSAO, Bloom, FXAA, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

export type QualityLevel = 'high' | 'medium' | 'low'

interface PostFXProps {
  quality: QualityLevel
  enabled?: boolean
}

export const PostFX: React.FC<PostFXProps> = ({ quality, enabled = true }) => {
  if (!enabled) return null

  // Quality-based settings
  const settings = {
    high: {
      ssao: {
        samples: 32,
        rings: 4,
        distanceThreshold: 1.0,
        distanceFalloff: 0.0,
        rangeThreshold: 0.5,
        rangeFalloff: 0.1,
        luminanceInfluence: 0.9,
        radius: 20,
        scale: 0.5,
        bias: 0.5
      },
      bloom: {
        intensity: 0.4,
        luminanceThreshold: 0.9,
        luminanceSmoothing: 0.025,
        mipmapBlur: true
      },
      fxaa: true,
      vignette: true
    },
    medium: {
      ssao: {
        samples: 16,
        rings: 3,
        distanceThreshold: 1.0,
        distanceFalloff: 0.0,
        rangeThreshold: 0.5,
        rangeFalloff: 0.1,
        luminanceInfluence: 0.9,
        radius: 15,
        scale: 0.5,
        bias: 0.5
      },
      bloom: {
        intensity: 0.3,
        luminanceThreshold: 0.95,
        luminanceSmoothing: 0.025,
        mipmapBlur: false
      },
      fxaa: true,
      vignette: false
    },
    low: {
      ssao: null, // Disable SSAO on low quality
      bloom: {
        intensity: 0.2,
        luminanceThreshold: 1.0,
        luminanceSmoothing: 0.025,
        mipmapBlur: false
      },
      fxaa: true,
      vignette: false
    }
  }

  const config = settings[quality]

  return (
    <EffectComposer multisampling={quality === 'high' ? 8 : quality === 'medium' ? 4 : 0}>
      {/* Screen Space Ambient Occlusion */}
      {config.ssao && (
        <SSAO
          blendFunction={BlendFunction.MULTIPLY}
          samples={config.ssao.samples}
          rings={config.ssao.rings}
          distanceThreshold={config.ssao.distanceThreshold}
          distanceFalloff={config.ssao.distanceFalloff}
          rangeThreshold={config.ssao.rangeThreshold}
          rangeFalloff={config.ssao.rangeFalloff}
          luminanceInfluence={config.ssao.luminanceInfluence}
          radius={config.ssao.radius}
          bias={config.ssao.bias}
        />
      )}
      
      {/* Bloom for glowing highlights */}
      <Bloom
        blendFunction={BlendFunction.ADD}
        intensity={config.bloom.intensity}
        luminanceThreshold={config.bloom.luminanceThreshold}
        luminanceSmoothing={config.bloom.luminanceSmoothing}
        mipmapBlur={config.bloom.mipmapBlur}
      />
      
      {/* Anti-aliasing */}
      {config.fxaa && <FXAA blendFunction={BlendFunction.NORMAL} />}
      
      {/* Vignette for cinematic feel */}
      {config.vignette && (
        <Vignette
          blendFunction={BlendFunction.NORMAL}
          eskil={false}
          offset={0.1}
          darkness={0.5}
        />
      )}
    </EffectComposer>
  )
}
