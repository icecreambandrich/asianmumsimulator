import React, { useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'

interface PerformanceMonitorProps {
  onPerformanceChange?: (fps: number, quality: 'high' | 'medium' | 'low') => void
}

export const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({ 
  onPerformanceChange 
}) => {
  const { gl } = useThree()
  const [fps, setFps] = useState(60)
  const [frameCount, setFrameCount] = useState(0)
  const [lastTime, setLastTime] = useState(performance.now())
  const [showStats, setShowStats] = useState(false)

  useFrame(() => {
    setFrameCount(prev => prev + 1)
    
    const now = performance.now()
    if (now - lastTime >= 1000) {
      const currentFps = Math.round((frameCount * 1000) / (now - lastTime))
      setFps(currentFps)
      setFrameCount(0)
      setLastTime(now)
      
      // Auto-adjust quality based on performance
      if (onPerformanceChange) {
        if (currentFps < 30) {
          onPerformanceChange(currentFps, 'low')
        } else if (currentFps < 45) {
          onPerformanceChange(currentFps, 'medium')
        } else {
          onPerformanceChange(currentFps, 'high')
        }
      }
    }
  })

  // Toggle stats with keyboard shortcut
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'p' && e.ctrlKey) {
        setShowStats(prev => !prev)
      }
    }
    
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  if (!showStats) {
    return (
      <div className="fixed bottom-4 right-4 text-xs text-gray-500 bg-black/20 px-2 py-1 rounded">
        Ctrl+P for stats
      </div>
    )
  }

  const getPerformanceColor = (fps: number) => {
    if (fps >= 45) return 'text-green-500'
    if (fps >= 30) return 'text-yellow-500'
    return 'text-red-500'
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-3 rounded-lg text-sm font-mono">
      <div className="flex items-center space-x-4">
        <div>
          <span className="text-gray-400">FPS:</span>
          <span className={`ml-1 font-bold ${getPerformanceColor(fps)}`}>
            {fps}
          </span>
        </div>
        
        <div>
          <span className="text-gray-400">Renderer:</span>
          <span className="ml-1">{gl.capabilities.isWebGL2 ? 'WebGL2' : 'WebGL'}</span>
        </div>
        
        <div>
          <span className="text-gray-400">Triangles:</span>
          <span className="ml-1">{gl.info.render.triangles}</span>
        </div>
      </div>
      
      <div className="text-xs text-gray-400 mt-1">
        Press Ctrl+P to hide
      </div>
    </div>
  )
}
