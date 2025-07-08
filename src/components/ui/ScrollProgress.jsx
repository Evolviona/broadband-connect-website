'use client'

import React from 'react'
import { useScrollProgress } from '@/hooks/useScrollAnimation'
import styles from './ScrollProgress.module.css'

export default function ScrollProgress({
  showPercentage = false,
  position = 'top', // 'top', 'bottom'
  variant = 'fiber', // 'fiber', 'simple', 'gradient'
  className = '',
}) {
  const progress = useScrollProgress()

  const progressClasses = `
    ${styles.progress}
    ${styles[position]}
    ${styles[variant]}
    ${className}
  `.trim()

  if (variant === 'fiber') {
    return (
      <div className={progressClasses}>
        <div className={styles.track}>
          <div 
            className={styles.fiberBar}
            style={{ transform: `scaleX(${progress})` }}
          >
            <div className={styles.pulse} />
            <div className={styles.glow} />
          </div>
        </div>
        {showPercentage && (
          <div className={styles.percentage}>
            {Math.round(progress * 100)}%
          </div>
        )}
      </div>
    )
  }

  if (variant === 'gradient') {
    return (
      <div className={progressClasses}>
        <div className={styles.track}>
          <div 
            className={styles.gradientBar}
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>
        {showPercentage && (
          <div className={styles.percentage}>
            {Math.round(progress * 100)}%
          </div>
        )}
      </div>
    )
  }

  // Simple variant
  return (
    <div className={progressClasses}>
      <div className={styles.track}>
        <div 
          className={styles.simpleBar}
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
      {showPercentage && (
        <div className={styles.percentage}>
          {Math.round(progress * 100)}%
        </div>
      )}
    </div>
  )
}