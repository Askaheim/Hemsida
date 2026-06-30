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
import FooterClient from './FooterClient'



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
      },
      {
        sectionTitle: 'Kontaktvägar',
        links: [
          {
            title: 'E-post: info@askaheim.se',
            path: 'info@askaheim.se'
          },
          {
            title: 'Telefon: 0737077142',
            path: '0737077142'
          },
          {
            title: 'Address: Nordenskiöldsgatan 13, Göteborg',
            path: 'https://share.google/RHoQuP5RuBRbE9MDU'
          }
        ]
      }
    ],
    socialMedia: socialMediaData,
  }

  return (
    <footer className='dark:bg-accent-100 bg-bronze-1/20 dark:text-text-primary-dark text-text-primary-light border-t-2 border-t-border-2 ' >
      <div className='pb-12 px-12 md:px-8 lg:px-10 bg-[url(/images/footerBG.png)] bg-no-repeat bg-cover flex flex-col'>
        <div className='relative flex flex-col justify-around gap-4 overflow-hidden my-8 md:my-12 md:flex-row md:items-start md:gap-0 md:overflow-visible'>

          {/* columns */}
          {footerData.sections.map((section, index) => (
            <Section key={index}>
              <Section.Title className='dark:text-text-primary-dark text-text-primary-light font-advisor underline sm:mt-2'>
                {section.sectionTitle}
              </Section.Title>
              <Section.Content>
                {section.links.map((link, linkIndex) => (
                  link.title === 'E-post: info@askaheim.se' ? (
                    <Link
                      key={linkIndex}
                      href={`mailto:${link.path}`}
                    >
                      <Typography
                        size='sm'
                        className='dark:text-text-primary-dark text-text-primary-light font-poppins text-lg transition-colors hover:text-slate-900 hover:underline'
                      >
                        {link.title}
                      </Typography>
                    </Link>
                  ) : link.title === 'Telefon: 0737077142' ? (
                    <Link
                      key={linkIndex}
                      href={`tel:${link.path}`}
                    >
                      <Typography
                        size='sm'
                        className='dark:text-text-primary-dark text-text-primary-light font-poppins text-lg transition-colors hover:text-slate-900 hover:underline'
                      >
                        {link.title}
                      </Typography>
                    </Link>
                  ) : (
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
                  )
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

        </div>
        <FooterClient>
          {/* Footer logo */}
          {variant === 'dark' ? (
            <Image
              src='/logotypes/logotype_BIG_TEXT_WHITE.png'
              alt='Logo'
              width={500}
              height={500}
              className='w-48 h-auto md:w-64 lg:w-80 transition-all'
            />
          ) : (
            <Image
              src='/logotypes/logotype_BIG_TEXT.png'
              alt='Logo'
              width={500}
              height={500}
              className='w-48 h-auto md:w-64 lg:w-80 transition-all'
            />
          )}
        </FooterClient>
      </div>
      <div className='w-full '>
        <div className='w-full flex justify-end'>
          <Link href='https://www.alexanderochson.vercel.app/' >
            <Typography size='md' variant='p' className='font-poppins dark:text-text-primary-dark text-text-primary-light p-1' >
              Website powered by: Alexander&son
            </Typography>
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer