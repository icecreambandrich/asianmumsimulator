export const detectWebGLSupport = (): boolean => {
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
    return !!gl
  } catch (e) {
    return false
  }
}

export const getDeviceCapabilities = () => {
  const canvas = document.createElement('canvas')
  const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
  
  if (!gl) {
    return {
      hasWebGL: false,
      maxTextureSize: 0,
      isMobile: false,
      recommendedQuality: 'low' as const
    }
  }

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE)
  const hasHighPerformance = maxTextureSize >= 4096

  let recommendedQuality: 'high' | 'medium' | 'low' = 'high'
  
  if (isMobile) {
    recommendedQuality = 'medium'
  } else if (!hasHighPerformance) {
    recommendedQuality = 'medium'
  }

  return {
    hasWebGL: true,
    maxTextureSize,
    isMobile,
    recommendedQuality
  }
}
