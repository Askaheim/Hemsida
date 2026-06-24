'use client'
import Typography from '@/components/Typography/Typography'
import { cn } from '@/utils/utils'
import {
  FooterProps,
  SectionContentProps,
  SectionProps,
  SectionTitleProps,
  SocialMediaSection,
  TextSection,
} from './Footer.types'



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
      className={'text-primaryText text-3xl font-semibold md:text-xl'}
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

const Footer = () => {


  return (
    <footer className='bg-primaryBg text-primaryText'>

    </footer>
  )
}

export default Footer
