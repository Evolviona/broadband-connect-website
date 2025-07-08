'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import FiberAnimation from '@/components/FiberAnimation/FiberAnimation'
import FeaturedCourses from '@/components/sections/FeaturedCourses'

export default function Home() {
  const [hoverHandlers, setHoverHandlers] = useState(null)

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
      {/* Fiber Optic Background */}
      <FiberAnimation onHoverHandlers={setHoverHandlers} />

      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 sm:px-12 lg:px-24">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-bc-light-text dark:text-bc-dark-text font-playfair">
          Powering the Next Generation of Technicians
        </h1>
        
        <p className="text-lg sm:text-xl lg:text-2xl mb-12 text-bc-light-text/90 dark:text-bc-dark-text/90 font-inter max-w-3xl mx-auto">
          Accredited Telecommunications Training. Hands-On. Industry Ready.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Link
            href="/courses"
            className="bg-bc-primary hover:bg-bc-primary/90 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            onMouseEnter={() => hoverHandlers?.handleCTAHover?.(true)}
            onMouseLeave={() => hoverHandlers?.handleCTAHover?.(false)}
          >
            View Courses
          </Link>
          <Link
            href="/enrol"
            className="border-2 border-bc-secondary text-bc-secondary hover:bg-bc-secondary hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105"
            onMouseEnter={() => hoverHandlers?.handleCTAHover?.(true)}
            onMouseLeave={() => hoverHandlers?.handleCTAHover?.(false)}
          >
            Get Started
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-col items-center">
          <p className="text-sm text-bc-light-text/70 dark:text-bc-dark-text/70 mb-4 font-inter">
            Nationally Recognised Training
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8">
            <div className="flex items-center opacity-80 hover:opacity-100 transition-opacity">
              <Image
                src="/assets/Australian Qalification Framework.svg"
                alt="Australian Qualifications Framework"
                width={60}
                height={60}
                className="filter brightness-0 dark:brightness-100"
              />
            </div>
            <div className="flex items-center opacity-80 hover:opacity-100 transition-opacity">
              <Image
                src="/assets/Nationally Recognised Training.svg"
                alt="Nationally Recognised Training"
                width={60}
                height={60}
                className="filter brightness-0 dark:brightness-100"
              />
            </div>
            <div className="flex items-center opacity-80 hover:opacity-100 transition-opacity">
              <Image
                src="/assets/skills-assure.svg"
                alt="Skills Assure"
                width={60}
                height={60}
                className="filter brightness-0 dark:brightness-100"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
    <FeaturedCourses />
  )
}