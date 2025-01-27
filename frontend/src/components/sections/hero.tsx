import React from 'react';
import Image from 'next/image';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { Button } from '@/components/ui/button';
import { CustomSeparator } from '@/components/ui/customSeparator';
import { BoxReveal } from '@/components/ui/box-reveal';
import Link from 'next/link';

const Hero = () => {
  return (
      <section
          id="home"
          className="relative z-10 bg-gradient-to-b from-blue-50 via-white to-blue-100 overflow-hidden pb-16 pt-32 md:pb-24 md:pt-36 xl:pb-28 xl:pt-40 2xl:pb-32 2xl:pt-48"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center">
            <div className="w-full text-center">
              <div className="wow fadeInUp mx-auto max-w-3xl" data-wow-delay=".2s">
                <h1 className="mb-6 text-4xl font-extrabold leading-snug text-gray-900 dark:text-gray-700 sm:text-5xl sm:leading-tight md:text-6xl md:leading-tight">
                  Automatisez votre travail avec l'intelligence artificielle.
                </h1>
                <p className="mb-10 text-lg leading-relaxed text-gray-600 dark:text-gray-600 sm:text-xl md:text-2xl">
                  La première plateforme qui révolutionne l'analyse et
                  l'exploitation des baux commerciaux reçus par les avocats en
                  droit immobilier.
                </p>
                <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <Link
                      href="/dashboard"
                      className="rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition duration-300 hover:bg-blue-700"
                  >
                    🔥 Lancer une analyse
                  </Link>
                  <Link
                      href="https://github.com/NextJSTemplates/startup-nextjs"
                      className="rounded-lg bg-gray-800 px-8 py-4 text-lg font-semibold text-white shadow-lg transition duration-300 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600"
                  >
                    Historique des projets
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-0 -z-10 opacity-30">
          <svg
              width="450"
              height="556"
              viewBox="0 0 450 556"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="277" cy="63" r="225" fill="url(#paint0_linear)" />
            <defs>
              <linearGradient
                  id="paint0_linear"
                  x1="-54.5"
                  y1="-178"
                  x2="222"
                  y2="288"
                  gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A90E2" />
                <stop offset="1" stopColor="#4A90E2" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 -z-10 opacity-30">
          <svg
              width="364"
              height="201"
              viewBox="0 0 364 201"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path
                d="M5.88928 72.3303C33.6599 66.4798 101.397 64.9086 150.178 105.427C211.155 156.076 229.59 162.093 264.333 166.607C299.076 171.12 337.718 183.657 362.889 212.24"
                stroke="url(#paint1_linear)"
            />
            <defs>
              <linearGradient
                  id="paint1_linear"
                  x1="184.389"
                  y1="69.2405"
                  x2="184.389"
                  y2="212.24"
                  gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A90E2" stopOpacity="0" />
                <stop offset="1" stopColor="#4A90E2" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>
  );
};

export default Hero;