'use client'

import { useState } from 'react'
import Link from 'next/link'
import ThemeToggle from '@/components/ThemeToggle'

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Courses', href: '/courses' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bc-light-bg/90 dark:bg-bc-dark-bg/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
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
                  className="text-bc-light-text dark:text-bc-dark-text hover:text-bc-primary dark:hover:text-bc-primary transition-colors duration-200 px-3 py-2 text-sm font-medium"
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Enrol Now Button */}
              <Link
                href="/enrol"
                className="bg-bc-primary hover:bg-bc-primary/90 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
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
                <div className={`w-6 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
                <div className={`w-6 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></div>
                <div className={`w-6 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-bc-light-bg dark:bg-bc-dark-bg border-t border-gray-200 dark:border-gray-700">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-bc-light-text dark:text-bc-dark-text hover:text-bc-primary dark:hover:text-bc-primary block px-3 py-2 text-base font-medium transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          
          {/* Mobile Enrol Now Button */}
          <Link
            href="/enrol"
            className="bg-bc-primary hover:bg-bc-primary/90 text-white block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 mt-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Enrol Now
          </Link>
        </div>
      </div>
    </nav>
  )
}