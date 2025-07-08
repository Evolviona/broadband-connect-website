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

  // Calculate fiber positions with 7 advanced strands
  const fiberPositions = useMemo(() => {
    const width = typeof window !== 'undefined' ? window.innerWidth : 1200
    const isMobile = width < 768
    const isTablet = width < 1024
    
    // Define 7 strands with varied properties
    const fullStrands = [
      { id: 0, left: 8, delay: 0, speed: 8000, thickness: 2 },
      { id: 1, left: 18, delay: 1500, speed: 10000, thickness: 3 },
      { id: 2, left: 32, delay: 3000, speed: 12000, thickness: 4 },
      { id: 3, left: 48, delay: 4500, speed: 9000, thickness: 3 },
      { id: 4, left: 64, delay: 6000, speed: 11000, thickness: 2 },
      { id: 5, left: 78, delay: 2000, speed: 13000, thickness: 4 },
      { id: 6, left: 92, delay: 5000, speed: 7000, thickness: 3 },
    ]
    
    // Adjust count based on viewport
    let count = fullStrands.length
    if (isMobile) count = 4
    else if (isTablet) count = 5
    
    return fullStrands.slice(0, count).map((strand, i) => ({
      ...strand,
      left: `${strand.left}%`,
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
      // Store ref value in local variable for cleanup
      const animationFrame = animationRef.current
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
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