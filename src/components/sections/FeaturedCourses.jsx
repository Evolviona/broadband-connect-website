'use client'

import React from 'react'
import Link from 'next/link'
import GlassmorphCard from '@/components/ui/GlassmorphCard'
import { CurrencyCounter } from '@/components/ui/AnimatedCounter'
import { useStaggeredAnimation } from '@/hooks/useScrollAnimation'
import styles from './FeaturedCourses.module.css'

const courses = [
  {
    id: 'open-cabling',
    title: 'Open Cabling License',
    subtitle: 'Foundation Pathway',
    price: 650,
    duration: '2-3 days',
    description: 'Essential telecommunications cabling training with ACMA Restricted and Open Rules certification.',
    outcomes: [
      'ACMA Open Cabler Registration',
      'Customer premises cabling',
      'Telecommunications reference conductor',
      'Industry compliance standards'
    ],
    highlight: 'Most Popular',
    color: '#0B8FE5'
  },
  {
    id: 'optical-fibre',
    title: 'Optical Fibre Cabling',
    subtitle: 'Advanced Fiber Skills',
    price: 400,
    duration: '1-2 days',
    description: 'nbn™ Skill 33 & 9 certified training in optical fibre installation, testing, and maintenance.',
    outcomes: [
      'nbn™ Skills 33 & 9 certification',
      'Optical fibre installation',
      'Compliance testing',
      'Professional termination'
    ],
    highlight: 'nbn™ Certified',
    color: '#4169E1'
  },
  {
    id: 'pit-pipe',
    title: 'Pit & Pipe Installation',
    subtitle: 'Infrastructure Specialist',
    price: 450,
    duration: '2 days',
    description: 'ACMA Underground Endorsement training for telecommunications infrastructure construction.',
    outcomes: [
      'ACMA Underground Endorsement',
      'Underground cable installation',
      'Infrastructure construction',
      'Safety and compliance'
    ],
    highlight: 'High Demand',
    color: '#FB8686'
  },
  {
    id: 'certificate-iii',
    title: 'Certificate III Programs',
    subtitle: 'Complete Qualification',
    price: 4000,
    duration: '6-12 months',
    description: 'Comprehensive telecommunications qualification with multiple specialization pathways.',
    outcomes: [
      'Nationally recognised qualification',
      'Multiple specialization tracks',
      'Career advancement',
      'Government funding available'
    ],
    highlight: 'AASN Funded',
    color: '#37356A'
  }
]

export default function FeaturedCourses() {
  const { ref, isItemVisible } = useStaggeredAnimation(courses.length, {
    threshold: 0.2,
    staggerDelay: 0.15
  })

  return (
    <section className={styles.section} ref={ref}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            Industry-Leading Training Programs
          </h2>
          <p className={styles.subtitle}>
            Professional telecommunications training designed for real-world success. 
            From foundational skills to advanced specializations.
          </p>
        </div>

        {/* Course Grid */}
        <div className={styles.grid}>
          {courses.map((course, index) => (
            <div
              key={course.id}
              className={`${styles.courseWrapper} ${
                isItemVisible(index) ? styles.visible : ''
              }`}
              style={{
                '--course-color': course.color,
                '--animation-delay': `${index * 0.15}s`
              }}
            >
              <GlassmorphCard
                variant="interactive"
                size="large"
                hover={true}
                className={styles.courseCard}
              >
                {/* Course Highlight Badge */}
                {course.highlight && (
                  <div className={styles.badge}>
                    {course.highlight}
                  </div>
                )}

                {/* Course Header */}
                <div className={styles.courseHeader}>
                  <div className={styles.courseTitle}>
                    <h3>{course.title}</h3>
                    <span className={styles.courseSubtitle}>
                      {course.subtitle}
                    </span>
                  </div>
                  <div className={styles.price}>
                    <CurrencyCounter
                      target={course.price}
                      currency="$"
                      className={styles.priceAmount}
                    />
                    <span className={styles.duration}>
                      {course.duration}
                    </span>
                  </div>
                </div>

                {/* Course Description */}
                <p className={styles.description}>
                  {course.description}
                </p>

                {/* Course Outcomes */}
                <div className={styles.outcomes}>
                  <h4 className={styles.outcomesTitle}>Key Outcomes:</h4>
                  <ul className={styles.outcomesList}>
                    {course.outcomes.map((outcome, outcomeIndex) => (
                      <li 
                        key={outcomeIndex}
                        className={styles.outcome}
                        style={{ 
                          '--outcome-delay': `${(index * 0.15) + (outcomeIndex * 0.05)}s` 
                        }}
                      >
                        <span className={styles.outcomeIcon}>✓</span>
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Course Actions */}
                <div className={styles.actions}>
                  <Link 
                    href={`/courses/${course.id}`}
                    className={styles.primaryButton}
                  >
                    Learn More
                  </Link>
                  <Link 
                    href="/enrol"
                    className={styles.secondaryButton}
                  >
                    Enrol Now
                  </Link>
                </div>

                {/* Fiber Effect Overlay */}
                <div className={styles.fiberOverlay}>
                  <div className={styles.fiberLine} />
                  <div className={styles.fiberPulse} />
                </div>
              </GlassmorphCard>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className={styles.cta}>
          <GlassmorphCard variant="elevated" size="medium">
            <div className={styles.ctaContent}>
              <h3>Not sure which course is right for you?</h3>
              <p>Our expert advisors can help you choose the perfect training pathway for your career goals.</p>
              <Link href="/contact" className={styles.ctaButton}>
                Get Free Consultation
              </Link>
            </div>
          </GlassmorphCard>
        </div>
      </div>
    </section>
  )
}