'use client'

import { useState, useEffect, useCallback, useMemo, useRef } from 'react'

export function useFiberAnimation() {
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  const [hoveredElement, setHoveredElement] = useState(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const animationRef = useRef()
  const pulseStateRef = useRef({})

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsReducedMotion(mediaQuery.matches)
    
    const handleChange = (e) => setIsReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Mouse tracking for fiber interaction
  const handleMouseMove = useCallback((e) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }, [])

  useEffect(() => {
    if (!isReducedMotion) {
      window.addEventListener('mousemove', handleMouseMove)
      return () => window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [handleMouseMove, isReducedMotion])

  // Hover interaction handlers
  const handleCTAHover = useCallback((isHovering) => {
    setHoveredElement(isHovering ? 'cta' : null)
  }, [])

  const handleNavHover = useCallback((isHovering) => {
    setHoveredElement(isHovering ? 'nav' : null)
  }, [])

  // Calculate fiber positions based on viewport
  const fiberPositions = useMemo(() => {
    const width = typeof window !== 'undefined' ? window.innerWidth : 1200
    const isMobile = width < 768
    const count = isMobile ? 3 : Math.min(6, Math.max(4, Math.floor(width / 300)))
    
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${(100 / (count + 1)) * (i + 1)}%`,
      delay: i * 2000, // Stagger timing
      speed: 8000 + (i % 3) * 2000, // Variable speeds
    }))
  }, [])

  // Pulse intensity based on interactions
  const getPulseIntensity = useCallback((fiberId) => {
    if (isReducedMotion) return 0
    
    let intensity = 0.6 // Base intensity
    
    if (hoveredElement === 'cta') {
      intensity = 1.2 // Increased frequency on CTA hover
    } else if (hoveredElement === 'nav') {
      intensity = 0.9 // Gentle response on nav hover
    }
    
    return intensity
  }, [hoveredElement, isReducedMotion])

  // Get pulse color based on fiber and interactions
  const getPulseColor = useCallback((fiberId) => {
    const colors = {
      primary: '#0B8FE5',
      secondary: '#FB8686',
      accent: '#4169E1',
    }
    
    if (hoveredElement === 'cta') {
      return fiberId % 2 === 0 ? colors.primary : colors.secondary
    }
    
    return colors.primary
  }, [hoveredElement])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return {
    isReducedMotion,
    fiberPositions,
    mousePosition,
    hoveredElement,
    getPulseIntensity,
    getPulseColor,
    handleCTAHover,
    handleNavHover,
  }
}