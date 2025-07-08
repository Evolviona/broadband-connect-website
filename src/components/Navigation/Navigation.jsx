'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import ThemeToggle from '@/components/ThemeToggle'
import styles from './Navigation.module.css'

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [navHoverHandler, setNavHoverHandler] = useState(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDark, setIsDark] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // Get hover handler from window if available
  useEffect(() => {
    const handler = window?.fiberNavHoverHandler
    if (handler) {
      setNavHoverHandler(() => handler)
    }
  }, [])

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
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

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Courses', href: '/courses' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  const navClasses = `
    fixed top-0 left-0 right-0 z-50 
    ${styles.nav} 
    ${isScrolled ? styles.scrolled : ''} 
    ${isDark ? styles.dark : ''}
    bg-red-500
  `.trim()

  return (
    <nav 
      className={navClasses}
      style={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
      }}
      onMouseEnter={() => navHoverHandler?.(true)}
      onMouseLeave={() => navHoverHandler?.(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold font-playfair text-bc-primary">
              Broadband Connect
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${styles.navItem} text-bc-light-text dark:text-bc-dark-text hover:text-bc-primary dark:hover:text-bc-primary transition-colors duration-200 px-3 py-2 text-sm font-medium`}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Enrol Now Button */}
              <Link
                href="/enrol"
                className={`${styles.ctaButton} text-white px-4 py-2 rounded-md text-sm font-medium`}
              >
                Enrol Now
              </Link>
            </div>
          </div>

          {/* Desktop Theme Toggle */}
          <div className="hidden md:block">
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-bc-light-text dark:text-bc-dark-text hover:text-bc-primary dark:hover:text-bc-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-bc-primary"
              aria-expanded="false"
              aria-label="Toggle mobile menu"
            >
              <span className="sr-only">Open main menu</span>
              <div className="space-y-1">
                <div className={`${styles.hamburgerLine} w-6 h-0.5 bg-current ${isMobileMenuOpen ? styles.open : ''}`}></div>
                <div className={`${styles.hamburgerLine} w-6 h-0.5 bg-current ${isMobileMenuOpen ? styles.open : ''}`}></div>
                <div className={`${styles.hamburgerLine} w-6 h-0.5 bg-current ${isMobileMenuOpen ? styles.open : ''}`}></div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className={`${styles.mobileMenu} ${isDark ? styles.dark : ''} px-2 pt-2 pb-3 space-y-1`}>
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`${styles.mobileMenuItem} text-bc-light-text dark:text-bc-dark-text hover:text-bc-primary dark:hover:text-bc-primary block px-3 py-2 text-base font-medium transition-colors duration-200`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          
          {/* Mobile Enrol Now Button */}
          <Link
            href="/enrol"
            className={`${styles.ctaButton} text-white block px-3 py-2 rounded-md text-base font-medium mt-2`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Enrol Now
          </Link>
        </div>
      </div>
    </nav>
  )
}