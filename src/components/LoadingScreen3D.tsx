import React from 'react'
import { Html, useProgress } from '@react-three/drei'

export const LoadingScreen3D: React.FC = () => {
  const { progress } = useProgress()
  
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center p-8 bg-white/90 rounded-2xl shadow-2xl backdrop-blur-sm">
        <div className="text-6xl mb-4 animate-spin">🐅</div>
        <h2 className="text-2xl font-bold text-tiger-red mb-4">Creating Your Mum...</h2>
        
        {/* Progress Bar */}
        <div className="w-64 h-4 bg-gray-200 rounded-full overflow-hidden mb-4">
          <div 
            className="h-full bg-gradient-to-r from-tiger-red to-tiger-gold transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <p className="text-gray-600 text-center max-w-xs">
          {progress < 30 ? 'Loading 3D models...' :
           progress < 60 ? 'Preparing materials...' :
           progress < 90 ? 'Setting up lighting...' :
           'Almost ready!'}
        </p>
        
        {/* Loading Animation */}
        <div className="flex space-x-2 mt-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 bg-tiger-red rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </Html>
  )
}
