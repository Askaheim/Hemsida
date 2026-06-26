'use client'
import Typography from '@/components/Typography/Typography'
import { cn } from '@/utils/utils'
import {
  SectionContentProps,
  SectionProps,
  SectionTitleProps,
  SocialMediaSectionProps,
  TextSection,
  FooterLogoData
} from './Footer.types'
import Image from 'next/image'
import Link from 'next/link'
import pageLinks from '@/lib/pageLinks'
import { MenuContext } from '@/context/MenuProvider'
import { useContext } from 'react'



const Section = ({ children, ...props }: SectionProps) => {
  return (
    <section {...props} className='flex flex-col md:min-w-40 md:gap-3'>
      {children}
    </section>
  )
}

const Title = ({ children, ...props }: SectionTitleProps) => {
  return (
    <Typography
      variant={'h4'}
      className={'dark:text-text-primary-dark light:text-text-primary-light text-3xl font-semibold md:text-xl'}
      {...props}
    >
      {children}
    </Typography>
  )
}

Section.Title = Title

const Content = ({ children, className, ...props }: SectionContentProps) => {
  return (
    <div className={cn('flex flex-col md:gap-2', className)} {...props}>
      {children}
    </div>
  )
}

Section.Content = Content

const Footer = ({ socialMediaData, variant = 'light' }: { socialMediaData: SocialMediaSectionProps[], variant?: 'light' | 'dark' }) => {
  const context = useContext(MenuContext)
  if (!context) {
    throw new Error('Menu must be used within a MenuContextProvider')
  }
  const { navbarData } = context
  const footerData = {
    sections: [
      {
        sectionTitle: 'Sajtkarta',
        links: pageLinks.map((link) => ({ title: link.title, path: link.path })),
      },
      {
        sectionTitle: 'Policys',
        links: [
          { title: 'Integritetspolicy', path: '/integritetspolicy' },
          { title: 'Cookiepolicy', path: '/cookiepolicy' },
          { title: 'Användarvillkor', path: '/anvandarvillkor' },
        ],
      }
    ],
    socialMedia: socialMediaData,
  }

  return (
    <footer className='dark:bg-accent-100 bg-bronze-1/20 dark:text-text-primary-dark text-text-primary-light  ' >
      <div className='pb-12 pl-12 md:px-8 lg:px-10 bg-[url(/images/footerBG.png)]'>
        <div className='relative mx-auto flex max-w-[1200px] flex-col justify-between gap-4 overflow-hidden md:flex-row md:items-start md:gap-0 md:overflow-visible'>
          {/* columns */}
          {footerData.sections.map((section, index) => (
            <Section key={index}>
              <Section.Title className='dark:text-text-primary-dark text-text-primary-light font-advisor underline sm:mt-2'>
                {section.sectionTitle}
              </Section.Title>
              <Section.Content>
                {section.links.map((link, linkIndex) => (
                  <Link
                    key={linkIndex}
                    href={link.path}
                  >
                    <Typography
                      size='sm'
                      className='dark:text-text-primary-dark text-text-primary-light font-poppins text-lg transition-colors hover:text-slate-900 hover:underline'
                    >
                      {link.title}
                    </Typography>
                  </Link>
                ))}
              </Section.Content>
            </Section>
          ))}

          {/* Sociala medier */}
          <Section className='flex flex-col'>
            <Section.Title className='dark:text-text-primary-dark text-text-primary-light font-advisor underline sm:mt-2'>
              Sociala medier
            </Section.Title>
            {footerData.socialMedia.map(
              (section: SocialMediaSectionProps, index: number) => (
                <Section.Content
                  key={index}
                  className='flex items-start md:gap-4'
                >
                  <a
                    href={section.socialmediaLink}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='dark:text-text-primary-dark text-text-primary-light flex items-center gap-2 transition-colors w-full hover:text-slate-900 hover:underline'
                  >
                    <Image
                      src={section.socialMediaIcon.url}
                      alt={section.socialmediaTitle}
                      width={24}
                      height={24}
                      className='h-6 w-6'
                    />
                    <Typography
                      size='sm'
                      className='dark:text-text-primary-dark text-text-primary-light font-poppins text-lg transition-colors hover:text-slate-900 hover:underline'
                    >
                      {section.socialmediaTitle}
                    </Typography>
                  </a>
                </Section.Content>
              ),
            )}
          </Section>
          {/* Footer logo */}
          {variant === 'dark' ? (
            <Image
              src={navbarData.logoDark}
              alt='Logo'
              width={1000}
              height={1000}
              className='absolute right-0 z-10 translate-x-1/2 md:hidden'
            />
          ) : (
            <Image
              src={navbarData.logo}
              alt='Logo'
              width={1000}
              height={1000}
              className='absolute right-0 z-10 translate-x-1/2 md:hidden'
            />
          )
          }
        </div>
      </div>

    </footer >
  )
}

export default Footer
