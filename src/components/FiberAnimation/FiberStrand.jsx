'use client'

import React, { useState, useEffect, useRef, memo } from 'react'
import styles from './FiberAnimation.module.css'

const FiberStrand = memo(({ 
  position, 
  delay, 
  speed, 
  thickness = 2,
  isReducedMotion, 
  pulseIntensity, 
  pulseColor,
  isDark,
  proximityEffect = 0,
  scrollIntensity = 0
}) => {
  const [pulseActive, setPulseActive] = useState(false)
  const [secondaryPulse, setSecondaryPulse] = useState(false)
  const animationRef = useRef()
  const timeoutRef = useRef()
  const strandRef = useRef()

  useEffect(() => {
    if (isReducedMotion) return

    const startPulseAnimation = () => {
      setPulseActive(true)
      
      // Trigger secondary pulse with slight delay
      setTimeout(() => setSecondaryPulse(true), 300)
      
      timeoutRef.current = setTimeout(() => {
        setPulseActive(false)
        setSecondaryPulse(false)
        
        // Schedule next pulse with intensity and proximity-based timing
        const proximityBoost = 1 + (proximityEffect * 0.5)
        const scrollBoost = 1 + (scrollIntensity * 0.3)
        const nextDelay = speed * (2 - pulseIntensity) / (proximityBoost * scrollBoost)
        timeoutRef.current = setTimeout(startPulseAnimation, nextDelay)
      }, 2500) // Extended pulse duration
    }

    // Initial delay
    timeoutRef.current = setTimeout(startPulseAnimation, delay)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [delay, speed, pulseIntensity, isReducedMotion, proximityEffect, scrollIntensity])

  // Dynamic gradient colors with transitions
  const getGradientColors = () => {
    const baseColor = isDark ? '#37356A' : '#4169E1'
    const secondaryColor = '#0B8FE5'
    const accentColor = '#FB8686'
    
    // Blend colors based on interactions
    const colorIntensity = 0.3 + (proximityEffect * 0.4) + (scrollIntensity * 0.3)
    
    return {
      start: baseColor,
      middle: secondaryColor,
      end: accentColor,
      intensity: colorIntensity
    }
  }

  const colors = getGradientColors()
  
  const strandStyle = {
    left: position,
    width: `${thickness}px`,
    background: `linear-gradient(180deg, 
      transparent 0%, 
      ${colors.start} 10%, 
      ${colors.middle} 50%, 
      ${colors.end} 90%, 
      transparent 100%)`,
    filter: `brightness(${1 + proximityEffect * 0.5}) contrast(${1 + scrollIntensity * 0.2})`,
    boxShadow: proximityEffect > 0.3 ? `0 0 ${10 + proximityEffect * 20}px ${colors.middle}` : 'none',
    transition: 'all 0.3s ease',
  }

  const pulseStyle = {
    background: `radial-gradient(ellipse, ${pulseColor}, transparent)`,
    boxShadow: `
      0 0 ${15 + proximityEffect * 15}px ${pulseColor}, 
      0 0 ${30 + proximityEffect * 30}px ${pulseColor},
      0 0 ${50 + proximityEffect * 50}px ${pulseColor}40
    `,
    opacity: pulseActive ? (pulseIntensity + proximityEffect * 0.3) : 0,
    transform: pulseActive ? 'translateY(0) scale(1)' : 'translateY(-100%) scale(0.8)',
    width: `${6 + thickness}px`,
    height: `${20 + thickness * 2}px`,
    left: `${-3 - thickness / 2}px`,
    transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
  }

  const secondaryPulseStyle = {
    background: `radial-gradient(ellipse, ${pulseColor}60, transparent)`,
    boxShadow: `0 0 ${8 + proximityEffect * 8}px ${pulseColor}60`,
    opacity: secondaryPulse ? (pulseIntensity * 0.6 + proximityEffect * 0.2) : 0,
    transform: secondaryPulse ? 'translateY(0) scale(1.2)' : 'translateY(-100%) scale(0.6)',
    width: `${4 + thickness}px`,
    height: `${15 + thickness}px`,
    left: `${-2 - thickness / 2}px`,
    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
  }

  const glowStyle = {
    position: 'absolute',
    top: '0',
    left: `${-thickness}px`,
    width: `${thickness * 3}px`,
    height: '100%',
    background: `linear-gradient(180deg, 
      transparent 0%, 
      ${colors.middle}20 30%, 
      ${colors.end}30 70%, 
      transparent 100%)`,
    opacity: proximityEffect * 0.6,
    filter: 'blur(2px)',
    transition: 'opacity 0.3s ease',
  }

  return (
    <div 
      ref={strandRef}
      className={`${styles.fiberStrand} ${isReducedMotion ? styles.static : ''}`}
      style={strandStyle}
      aria-hidden="true"
    >
      {!isReducedMotion && (
        <>
          <div 
            className={styles.pulse}
            style={pulseStyle}
          />
          <div 
            className={styles.pulse}
            style={secondaryPulseStyle}
          />
          <div 
            className={styles.glowEffect}
            style={glowStyle}
          />
        </>
      )}
    </div>
  )
})

FiberStrand.displayName = 'FiberStrand'

export default FiberStrand