import { MeshPhysicalMaterial, Color } from 'three'
import { useTexture } from '@react-three/drei'

// Color palette for Asian Mum Simulator
export const COLORS = {
  // Skin tones
  skin: {
    classic: '#DEB887',
    corporate: '#F5DEB3', 
    insta: '#FFDAB9',
    grandma: '#D2B48C'
  },
  // Hair colors
  hair: {
    classic: '#2F4F4F',
    corporate: '#8B4513',
    insta: '#DAA520', 
    grandma: '#C0C0C0'
  },
  // Outfit colors
  outfit: {
    classic: '#DC143C', // Traditional red
    corporate: '#4169E1', // Business blue
    insta: '#FF1493', // Pink trendy
    grandma: '#9370DB' // Purple cardigan
  },
  // Accent colors
  gold: '#FFD700',
  red: '#DC143C',
  charcoal: '#36454F'
}

// Material factory for different surface types
export const createSkinMaterial = (variant: keyof typeof COLORS.skin) => {
  return new MeshPhysicalMaterial({
    color: new Color(COLORS.skin[variant]),
    roughness: 0.8,
    metalness: 0.0,
    transmission: 0.05,
    thickness: 0.1,
    clearcoat: 0.1,
    clearcoatRoughness: 0.8,
    // Subsurface scattering effect
    sheen: 0.2,
    sheenColor: new Color('#FFE4E1')
  })
}

export const createHairMaterial = (variant: keyof typeof COLORS.hair) => {
  return new MeshPhysicalMaterial({
    color: new Color(COLORS.hair[variant]),
    roughness: 0.3,
    metalness: 0.0,
    // Anisotropic sheen for hair
    sheen: 1.0,
    sheenRoughness: 0.25,
    sheenColor: new Color('#FFFFFF'),
    clearcoat: 0.3,
    clearcoatRoughness: 0.4
  })
}

export const createClothMaterial = (variant: keyof typeof COLORS.outfit) => {
  return new MeshPhysicalMaterial({
    color: new Color(COLORS.outfit[variant]),
    roughness: 0.9,
    metalness: 0.0,
    // Fabric-like properties
    sheen: 0.1,
    sheenRoughness: 0.8
  })
}

export const createLeatherMaterial = (color: string = '#8B4513') => {
  return new MeshPhysicalMaterial({
    color: new Color(color),
    roughness: 0.5,
    metalness: 0.0,
    clearcoat: 0.6,
    clearcoatRoughness: 0.3
  })
}

export const createMetalMaterial = (color: string = '#C0C0C0') => {
  return new MeshPhysicalMaterial({
    color: new Color(color),
    roughness: 0.2,
    metalness: 0.9,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1
  })
}

// Eye material with special properties
export const createEyeMaterial = () => {
  return new MeshPhysicalMaterial({
    color: new Color('#4169E1'),
    roughness: 0.1,
    metalness: 0.0,
    transmission: 0.1,
    thickness: 0.05,
    clearcoat: 1.0,
    clearcoatRoughness: 0.0,
    ior: 1.4 // Glass-like refraction
  })
}

// Weapon-specific materials
export const WEAPON_MATERIALS = {
  slipper: () => createLeatherMaterial('#8B4513'),
  spoon: () => createMetalMaterial('#D2691E'),
  duster: () => new MeshPhysicalMaterial({
    color: new Color('#F5F5DC'),
    roughness: 0.95,
    metalness: 0.0,
    // Fluffy feather effect
    transmission: 0.3,
    thickness: 0.2
  }),
  stare: () => new MeshPhysicalMaterial({
    color: new Color('#FFFFFF'),
    roughness: 0.0,
    metalness: 0.0,
    transmission: 0.9,
    thickness: 0.1,
    emissive: new Color('#FFFF00'),
    emissiveIntensity: 0.2
  })
}
