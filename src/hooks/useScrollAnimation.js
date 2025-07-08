'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

export function useScrollAnimation(options = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true,
    staggerDelay = 0.1,
  } = options

  const [inView, setInView] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef(null)
  const observerRef = useRef(null)

  const handleIntersection = useCallback(
    (entries) => {
      const [entry] = entries
      const isIntersecting = entry.isIntersecting

      if (isIntersecting && (!hasAnimated || !triggerOnce)) {
        setInView(true)
        if (triggerOnce) {
          setHasAnimated(true)
        }
      } else if (!triggerOnce) {
        setInView(false)
      }
    },
    [hasAnimated, triggerOnce]
  )

  useEffect(() => {
    const currentRef = ref.current
    if (!currentRef) return

    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
    })

    observerRef.current.observe(currentRef)

    return () => {
      if (observerRef.current && currentRef) {
        observerRef.current.unobserve(currentRef)
      }
    }
  }, [handleIntersection, threshold, rootMargin])

  return { ref, inView, hasAnimated }
}

// Hook for staggered animations (for lists/grids)
export function useStaggeredAnimation(itemCount, options = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    staggerDelay = 0.1,
  } = options

  const [inView, setInView] = useState(false)
  const [visibleItems, setVisibleItems] = useState(new Set())
  const ref = useRef(null)
  const timeoutsRef = useRef([])

  const handleIntersection = useCallback(
    (entries) => {
      const [entry] = entries
      
      if (entry.isIntersecting) {
        setInView(true)
        
        // Clear any existing timeouts
        timeoutsRef.current.forEach(clearTimeout)
        timeoutsRef.current = []
        
        // Stagger the animation of items
        for (let i = 0; i < itemCount; i++) {
          const timeout = setTimeout(() => {
            setVisibleItems(prev => new Set(prev).add(i))
          }, i * staggerDelay * 1000)
          
          timeoutsRef.current.push(timeout)
        }
      }
    },
    [itemCount, staggerDelay]
  )

  useEffect(() => {
    const currentRef = ref.current
    if (!currentRef) return

    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
    })

    observer.observe(currentRef)

    return () => {
      if (observer && currentRef) {
        observer.unobserve(currentRef)
      }
      // Clear timeouts on cleanup
      timeoutsRef.current.forEach(clearTimeout)
    }
  }, [handleIntersection, threshold, rootMargin])

  const isItemVisible = useCallback((index) => {
    return visibleItems.has(index)
  }, [visibleItems])

  return { ref, inView, isItemVisible }
}

// Hook for scroll-triggered counter animations
export function useCounterAnimation(target, options = {}) {
  const {
    duration = 2000,
    threshold = 0.5,
    easing = 'easeOutQuart',
  } = options

  const [count, setCount] = useState(0)
  const { ref, inView } = useScrollAnimation({ threshold, triggerOnce: true })
  const frameRef = useRef()
  const startTimeRef = useRef()

  const easingFunctions = {
    easeOutQuart: (t) => 1 - Math.pow(1 - t, 4),
    easeOutCubic: (t) => 1 - Math.pow(1 - t, 3),
    easeOutExpo: (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
    linear: (t) => t,
  }

  const animate = useCallback((currentTime) => {
    if (!startTimeRef.current) {
      startTimeRef.current = currentTime
    }

    const elapsed = currentTime - startTimeRef.current
    const progress = Math.min(elapsed / duration, 1)
    const easedProgress = easingFunctions[easing](progress)
    
    setCount(Math.floor(target * easedProgress))

    if (progress < 1) {
      frameRef.current = requestAnimationFrame(animate)
    }
  }, [target, duration, easing])

  useEffect(() => {
    if (inView && target > 0) {
      startTimeRef.current = null
      frameRef.current = requestAnimationFrame(animate)
    }

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [inView, target, animate])

  return { ref, count, inView }
}

// Hook for scroll progress tracking
export function useScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const currentScroll = window.scrollY
      const progress = totalHeight > 0 ? currentScroll / totalHeight : 0
      setScrollProgress(Math.min(Math.max(progress, 0), 1))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Set initial value

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return scrollProgress
}