'use client'

import React from 'react'
import { useCounterAnimation } from '@/hooks/useScrollAnimation'

export default function AnimatedCounter({
  target,
  duration = 2000,
  threshold = 0.5,
  easing = 'easeOutQuart',
  prefix = '',
  suffix = '',
  className = '',
  formatter = null,
  ...props
}) {
  const { ref, count, inView } = useCounterAnimation(target, {
    duration,
    threshold,
    easing,
  })

  const formatValue = (value) => {
    if (formatter && typeof formatter === 'function') {
      return formatter(value)
    }
    
    // Default formatting for large numbers
    if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + 'M'
    } else if (value >= 1000) {
      return (value / 1000).toFixed(1) + 'K'
    }
    
    return value.toString()
  }

  return (
    <span
      ref={ref}
      className={`animated-counter ${className}`}
      {...props}
    >
      {prefix}{formatValue(count)}{suffix}
    </span>
  )
}

// Specialized counter for currency
export function CurrencyCounter({
  target,
  currency = '$',
  showCents = false,
  ...props
}) {
  const formatter = (value) => {
    if (showCents) {
      return value.toLocaleString('en-AU', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    }
    return value.toLocaleString('en-AU')
  }

  return (
    <AnimatedCounter
      target={target}
      prefix={currency}
      formatter={formatter}
      {...props}
    />
  )
}

// Specialized counter for percentages
export function PercentageCounter({
  target,
  decimals = 0,
  ...props
}) {
  const formatter = (value) => {
    return value.toFixed(decimals)
  }

  return (
    <AnimatedCounter
      target={target}
      suffix="%"
      formatter={formatter}
      {...props}
    />
  )
}

// Specialized counter for years
export function YearCounter({
  target,
  ...props
}) {
  const formatter = (value) => {
    return value.toString()
  }

  const suffix = target === 1 ? ' year' : ' years'

  return (
    <AnimatedCounter
      target={target}
      suffix={suffix}
      formatter={formatter}
      {...props}
    />
  )
}