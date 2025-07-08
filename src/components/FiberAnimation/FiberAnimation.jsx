'use client'

import React, { useEffect, useState } from 'react'
import FiberStrand from './FiberStrand'
import ParticleSystem from './ParticleSystem'
import { useFiberAnimation } from './useFiberAnimation'
import styles from './FiberAnimation.module.css'

export default function FiberAnimation({ onHoverHandlers }) {
  const [isDark, setIsDark] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollPosition, setScrollPosition] = useState(0)
  const {
    isReducedMotion,
    fiberPositions,
    getPulseIntensity,
    getPulseColor,
    handleCTAHover,
    handleNavHover,
  } = useFiberAnimation()

  // Mouse tracking for proximity effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Scroll tracking for intensity changes
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

  // Calculate proximity effect for each fiber
  const getProximityEffect = (fiberPosition) => {
    const fiberX = (fiberPosition / 100) * window.innerWidth
    const distance = Math.abs(mousePosition.x - fiberX)
    const maxDistance = 200
    return Math.max(0, 1 - distance / maxDistance)
  }

  // Calculate scroll intensity
  const getScrollIntensity = () => {
    const maxScroll = 1000
    return Math.min(scrollPosition / maxScroll, 1)
  }

  return (
    <div className={styles.fiberContainer} aria-hidden="true">
      {/* Background gradient overlay */}
      <div className={styles.backgroundGradient} />
      
      {/* Particle system for floating orbs */}
      <ParticleSystem
        particleCount={12}
        isDark={isDark}
        scrollPosition={scrollPosition}
        mousePosition={mousePosition}
      />
      
      {/* Fiber strands */}
      {fiberPositions.map((fiber) => (
        <FiberStrand
          key={fiber.id}
          position={fiber.left}
          delay={fiber.delay}
          speed={fiber.speed}
          thickness={fiber.thickness}
          isReducedMotion={isReducedMotion}
          pulseIntensity={getPulseIntensity(fiber.id)}
          pulseColor={getPulseColor(fiber.id)}
          isDark={isDark}
          proximityEffect={getProximityEffect(fiber.left)}
          scrollIntensity={getScrollIntensity()}
        />
      ))}
    </div>
  )
}