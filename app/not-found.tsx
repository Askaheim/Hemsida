import Button from '@/components/Button/Button'
import Menu from '@/components/Navbar/Menu'
import PageTitle from '@/components/PageTitle/PageTitle'
import Typography from '@/components/Typography/Typography'
import { OctagonAlert } from 'lucide-react'
import Link from 'next/link'

const NotFound = () => {
  return (
    <>
      <Menu />
      <main className='section-contain min-h-screen pt-18'>
        <section className='mx-auto flex max-w-[500px] flex-col items-center gap-4'>
          <PageTitle className='dark:text-text-primary-dark text-text-primary-light font-advisor self-center text-center'>
            404
          </PageTitle>
          <OctagonAlert size={200} color='#f3c55e' />
          <Typography variant='h3' className='font-advisor dark:text-text-primary-dark text-text-primary-light'>
            Sidan finns inte
          </Typography>
          <Typography
            className={'font-poppins dark:text-text-primary-dark text-text-primary-light text-center'}
          >
            Vi kan tyvärr inte hitta sidan du söker. Den kanske inte ens finns. Prova att ladda om sidan, alternativt gå tillbaka och testa en annan sökväg.
          </Typography>
          <Button className={'mt-4 w-full text-center'}>
            <Link href={'/'}>Gå tillbaka</Link>
          </Button>
        </section>
      </main>
    </>
  )
}

export default NotFound
