'use client'

/* import {Menu, PageTitle, Typography, Button } from '@/components' */
import Menu from '@/components/Navbar/Menu'
import PageTitle from '@/components/PageTitle/PageTitle'
import Typography from '@/components/Typography/Typography'
import Button from '@/components/Button/Button'
import { OctagonX } from 'lucide-react'
import Link from 'next/link'

type ErrorProps = {
  error: Error
  reset: () => void
}
export default function Error({ error, reset }: ErrorProps) {
  console.error('An error occurred:', error)
  if (error instanceof Error) {
    console.error('Error message:', error.message)
  }
  return (
    <>
      <Menu />
      <main className='section-contain min-h-screen'>
        <section className='mx-auto my-12 flex max-w-[500px] flex-col items-center gap-2 text-center md:mt-16'>
          <PageTitle className='dark:text-text-primary-dark text-text-primary-light font-advisor self-center text-center'>
            ERROR
          </PageTitle>
          <OctagonX size={200} color='#f3c55e' />
          <Typography variant='h3' className='font-advisor dark:text-text-primary-dark text-text-primary-light'>
            Sidan kunde inte laddas
          </Typography>
          <Typography
            className={'font-poppins dark:text-text-primary-dark text-text-primary-light text-center'}
          >
            Ett fel uppstod och sidan laddades inte ordentligt. Testa att ladda
            om sidan med knappen eller återgå till startsidan.
          </Typography>
          <div className='mt-8 flex w-full flex-col gap-4 sm:flex-row'>
            <Button variant='primary' className={'grow text-center'}>
              <Link href={'/'}>Gå tillbaka hem</Link>
            </Button>
            <Button
              variant='secondary'
              className={'grow'}
              onClick={() => reset()}
            >
              Ladda om sidan
            </Button>
          </div>
        </section>
      </main>
    </>
  )
}
