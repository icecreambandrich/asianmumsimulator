import { useCallback } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'

export const useScreenshot = () => {
  const { gl, scene, camera } = useThree()

  const takeScreenshot = useCallback(async (
    filename: string = 'my-asian-mum.png',
    resolution: number = 2160 // 4K resolution
  ) => {
    // Store original size
    const originalSize = gl.getSize(new THREE.Vector2())
    const originalPixelRatio = gl.getPixelRatio()

    try {
      // Set high resolution for screenshot
      gl.setPixelRatio(1)
      gl.setSize(resolution, resolution, false)

      // Create offscreen render target
      const renderTarget = new THREE.WebGLRenderTarget(resolution, resolution, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        type: THREE.UnsignedByteType,
        samples: 8 // Anti-aliasing
      })

      // Render to target
      gl.setRenderTarget(renderTarget)
      gl.render(scene, camera)
      gl.setRenderTarget(null)

      // Read pixels from render target
      const pixels = new Uint8Array(resolution * resolution * 4)
      gl.readRenderTargetPixels(renderTarget, 0, 0, resolution, resolution, pixels)

      // Create canvas and flip image (WebGL renders upside down)
      const canvas = document.createElement('canvas')
      canvas.width = resolution
      canvas.height = resolution
      const ctx = canvas.getContext('2d')!

      const imageData = ctx.createImageData(resolution, resolution)
      
      // Flip vertically and copy pixels
      for (let y = 0; y < resolution; y++) {
        for (let x = 0; x < resolution; x++) {
          const srcIndex = (y * resolution + x) * 4
          const dstIndex = ((resolution - 1 - y) * resolution + x) * 4
          
          imageData.data[dstIndex] = pixels[srcIndex]     // R
          imageData.data[dstIndex + 1] = pixels[srcIndex + 1] // G
          imageData.data[dstIndex + 2] = pixels[srcIndex + 2] // B
          imageData.data[dstIndex + 3] = pixels[srcIndex + 3] // A
        }
      }

      ctx.putImageData(imageData, 0, 0)

      // Convert to blob and download
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.download = filename
          link.href = url
          link.click()
          URL.revokeObjectURL(url)
        }
      }, 'image/png', 1.0)

      // Cleanup
      renderTarget.dispose()

    } finally {
      // Restore original settings
      gl.setPixelRatio(originalPixelRatio)
      gl.setSize(originalSize.x, originalSize.y, false)
    }
  }, [gl, scene, camera])

  return { takeScreenshot }
}
