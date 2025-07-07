'use client'

import React, { useEffect, useState } from 'react'
import FiberStrand from './FiberStrand'
import { useFiberAnimation } from './useFiberAnimation'
import styles from './FiberAnimation.module.css'

export default function FiberAnimation({ onHoverHandlers }) {
  const [isDark, setIsDark] = useState(false)
  const {
    isReducedMotion,
    fiberPositions,
    getPulseIntensity,
    getPulseColor,
    handleCTAHover,
    handleNavHover,
  } = useFiberAnimation()

  // Detect theme changes
  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }
    
    checkTheme()
    
    // Watch for theme changes
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })
    
    return () => observer.disconnect()
  }, [])

  // Provide hover handlers to parent component
  useEffect(() => {
    if (onHoverHandlers) {
      onHoverHandlers({
        handleCTAHover,
        handleNavHover,
      })
    }
    
    // Make nav hover handler globally available
    window.fiberNavHoverHandler = handleNavHover
    
    return () => {
      delete window.fiberNavHoverHandler
    }
  }, [onHoverHandlers, handleCTAHover, handleNavHover])

  return (
    <div className={styles.fiberContainer} aria-hidden="true">
      {fiberPositions.map((fiber) => (
        <FiberStrand
          key={fiber.id}
          position={fiber.left}
          delay={fiber.delay}
          speed={fiber.speed}
          isReducedMotion={isReducedMotion}
          pulseIntensity={getPulseIntensity(fiber.id)}
          pulseColor={getPulseColor(fiber.id)}
          isDark={isDark}
        />
      ))}
    </div>
  )
}