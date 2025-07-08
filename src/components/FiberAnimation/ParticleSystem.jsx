'use client'

import React, { useState, useEffect, useRef, memo } from 'react'
import styles from './ParticleSystem.module.css'

const Particle = memo(({ id, initialX, initialY, size, delay, speed, color, isDark }) => {
  const particleRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  const particleStyle = {
    left: `${initialX}%`,
    top: `${initialY}%`,
    width: `${size}px`,
    height: `${size}px`,
    background: `radial-gradient(circle, ${color}, transparent)`,
    boxShadow: `0 0 ${size * 2}px ${color}, 0 0 ${size * 4}px ${color}40`,
    animationDelay: `${delay}ms`,
    animationDuration: `${speed}ms`,
    opacity: isVisible ? 1 : 0,
    filter: isDark ? 'brightness(1.3)' : 'brightness(1)',
  }

  return (
    <div
      ref={particleRef}
      className={`${styles.particle} ${isVisible ? styles.floating : ''}`}
      style={particleStyle}
      aria-hidden="true"
    />
  )
})

Particle.displayName = 'Particle'

const ParticleSystem = memo(({ 
  particleCount = 12, 
  isDark = false, 
  scrollPosition = 0,
  mousePosition = { x: 0, y: 0 }
}) => {
  const containerRef = useRef(null)
  const [particles, setParticles] = useState([])
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsReducedMotion(mediaQuery.matches)
    
    const handleChange = (e) => setIsReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Generate particles with varied properties
  useEffect(() => {
    if (isReducedMotion) {
      setParticles([])
      return
    }

    const colors = [
      isDark ? '#37356A' : '#4169E1',
      '#0B8FE5',
      '#FB8686',
      isDark ? '#0B8FE5' : '#37356A',
    ]

    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      initialX: Math.random() * 100,
      initialY: Math.random() * 100,
      size: 2 + Math.random() * 4, // 2-6px
      delay: Math.random() * 5000, // 0-5s
      speed: 8000 + Math.random() * 12000, // 8-20s
      color: colors[Math.floor(Math.random() * colors.length)],
      direction: Math.random() > 0.5 ? 1 : -1,
      amplitude: 20 + Math.random() * 40, // Wave amplitude
    }))

    setParticles(newParticles)
  }, [particleCount, isDark, isReducedMotion])

  // Calculate parallax offset based on scroll
  const getParallaxOffset = () => {
    return scrollPosition * 0.3 // Subtle parallax effect
  }

  // Calculate proximity effect for particles
  const getProximityEffect = (particleX, particleY) => {
    if (!mousePosition.x || !mousePosition.y) return 1

    const particleScreenX = (particleX / 100) * window.innerWidth
    const particleScreenY = (particleY / 100) * window.innerHeight
    
    const distance = Math.sqrt(
      Math.pow(mousePosition.x - particleScreenX, 2) + 
      Math.pow(mousePosition.y - particleScreenY, 2)
    )
    
    const maxDistance = 150
    const effect = Math.max(0, 1 - distance / maxDistance)
    return 1 + effect * 0.5 // 1x to 1.5x scale
  }

  if (isReducedMotion) {
    return null
  }

  return (
    <div 
      ref={containerRef}
      className={styles.particleContainer}
      style={{
        transform: `translateY(${getParallaxOffset()}px)`,
      }}
      aria-hidden="true"
    >
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={styles.particleWrapper}
          style={{
            transform: `scale(${getProximityEffect(particle.initialX, particle.initialY)})`,
            transition: 'transform 0.3s ease',
          }}
        >
          <Particle
            id={particle.id}
            initialX={particle.initialX}
            initialY={particle.initialY}
            size={particle.size}
            delay={particle.delay}
            speed={particle.speed}
            color={particle.color}
            isDark={isDark}
          />
        </div>
      ))}
    </div>
  )
})

ParticleSystem.displayName = 'ParticleSystem'

export default ParticleSystem