'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import LandingpageHeroSection from './LandingpageHeroSection'

export default function HeroWrapper({ heroData }: { heroData: any }) {
    const waveRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleScroll = () => {
            if (!waveRef.current) return

            // Visa wave så fort användaren scrollat minsta lilla (>5px precis som navbar)
            if (window.scrollY > 5) {
                waveRef.current.classList.add('opacity-100')
                waveRef.current.classList.remove('opacity-0')
            } else {
                waveRef.current.classList.add('opacity-0')
                waveRef.current.classList.remove('opacity-100')
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div className="relative">
            <LandingpageHeroSection hero={heroData} />

            <div
                ref={waveRef}
                className="absolute bottom-0 left-0 w-full overflow-hidden opacity-0 transition-opacity duration-500 z-10"
            >
                <Image
                    src='/images/wave.png'
                    alt=''
                    width={1400}
                    height={50}
                    className='w-full'
                    priority
                />
            </div>
        </div>
    )
}