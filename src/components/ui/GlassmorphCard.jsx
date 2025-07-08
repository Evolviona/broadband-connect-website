'use client'

import React from 'react'
import styles from './GlassmorphCard.module.css'

export default function GlassmorphCard({
  children,
  className = '',
  variant = 'default', // 'default', 'elevated', 'subtle', 'interactive'
  size = 'medium', // 'small', 'medium', 'large'
  glow = false,
  hover = true,
  onClick,
  ...props
}) {
  const cardClasses = `
    ${styles.card}
    ${styles[variant]}
    ${styles[size]}
    ${glow ? styles.glow : ''}
    ${hover ? styles.hover : ''}
    ${onClick ? styles.clickable : ''}
    ${className}
  `.trim()

  const cardProps = {
    className: cardClasses,
    onClick,
    ...props
  }

  if (onClick) {
    cardProps.role = 'button'
    cardProps.tabIndex = 0
    cardProps.onKeyDown = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onClick(e)
      }
    }
  }

  return (
    <div {...cardProps}>
      <div className={styles.content}>
        {children}
      </div>
      {glow && <div className={styles.glowEffect} />}
    </div>
  )
}