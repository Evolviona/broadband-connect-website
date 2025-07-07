'use client'

import React, { useState, useEffect, useRef, memo } from 'react'
import styles from './FiberAnimation.module.css'

const FiberStrand = memo(({ 
  position, 
  delay, 
  speed, 
  isReducedMotion, 
  pulseIntensity, 
  pulseColor,
  isDark 
}) => {
  const [pulseActive, setPulseActive] = useState(false)
  const animationRef = useRef()
  const timeoutRef = useRef()

  useEffect(() => {
    if (isReducedMotion) return

    const startPulseAnimation = () => {
      setPulseActive(true)
      
      timeoutRef.current = setTimeout(() => {
        setPulseActive(false)
        
        // Schedule next pulse with intensity-based timing
        const nextDelay = speed * (2 - pulseIntensity)
        timeoutRef.current = setTimeout(startPulseAnimation, nextDelay)
      }, 2000) // Pulse duration
    }

    // Initial delay
    timeoutRef.current = setTimeout(startPulseAnimation, delay)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [delay, speed, pulseIntensity, isReducedMotion])

  const strandColor = isDark ? '#37356A' : '#4169E1'

  const strandStyle = {
    left: position,
    background: `linear-gradient(180deg, transparent 0%, ${strandColor} 20%, ${strandColor} 80%, transparent 100%)`,
  }

  const pulseStyle = {
    background: pulseColor,
    boxShadow: `0 0 15px ${pulseColor}, 0 0 30px ${pulseColor}`,
    opacity: pulseActive ? pulseIntensity : 0,
    transform: pulseActive ? 'translateY(0)' : 'translateY(-100%)',
  }

  return (
    <div 
      className={`${styles.fiberStrand} ${isReducedMotion ? styles.static : ''}`}
      style={strandStyle}
      aria-hidden="true"
    >
      {!isReducedMotion && (
        <div 
          className={styles.pulse}
          style={pulseStyle}
        />
      )}
    </div>
  )
})

FiberStrand.displayName = 'FiberStrand'

export default FiberStrand