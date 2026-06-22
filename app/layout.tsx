import Footer from '@/components/Footer/Footer'
import MenuList from '@/components/Navbar/MenuList'
import LivePreviewProvider from '@/context/LivePreviewProvider'
import { MenuContextProvider } from '@/context/MenuProvider'
import apolloClient from '@/lib/apolloClient'
import previewClient from '@/lib/previewClient'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import type { Metadata } from 'next'
import { Bebas_Neue, Inria_Serif, Poppins } from 'next/font/google'
import { draftMode } from 'next/headers'
import Script from 'next/script'
import './globals.css'


const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})
const bebasNeue = Bebas_Neue({
  variable: '--font-bebas-neue',
  subsets: ['latin'],
  weight: ['400'],
})
const inriaSerif = Inria_Serif({
  variable: '--font-inria-serif',
  subsets: ['latin'],
  weight: ['300', '400', '700'],
})

export async function generateMetadata(): Promise<Metadata> {
  const { isEnabled } = await draftMode()
  const client = isEnabled ? previewClient : apolloClient


  const metadataBase =
    process.env.NEXT_LOCAL_BASE_URL ||
    process.env.NEXT_PUBLIC_URL ||
    'http://localhost:3000'
  const metaCustomer =
    process.env.NEXT_PUBLIC_META_CUSTOMER || 'Alexander&son customer'

  return {
    title: {
      template: 'Askaheim | %s',
      default: 'Askaheim Kakelugnsmakeri',
    },
    description: `Created by Alexander&son for ${metaCustomer}`,
    icons: {
      icon: '/favicon.ico',
    },
    keywords: [
      'kakelugnsmakeri',
      'kakelugnar',
      'eldstäder',
      'spisar',
      'kaminer',
      'vedspisar',
      'kakelugnsrenovering',
      'skräddarsydda kakelugnar',
      'hållbara värmelösningar',
    ],
    metadataBase: new URL(metadataBase),
    authors: [{ name: 'Alexander&son' }],
    creator: 'Alexander&son',
  }
}


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { isEnabled } = await draftMode()
  const client = isEnabled ? previewClient : apolloClient


  const navbarData = {
    logo: '/logotypes/logotype_BIG_TEXT.png',
    logoDark: '/logotypes/logotype_BIG_TEXT_WHITE.png',
  }
  return (
    <html
      lang='sv'
      className={`${poppins.variable} ${bebasNeue.variable} ${inriaSerif} antialiased`}
    >
      <body className={'max-w-[100vw] overflow-x-hidden'}>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <MenuContextProvider navbarData={navbarData}>
            <MenuList />
            <LivePreviewProvider isEnabled={isEnabled}>
              {children}
            </LivePreviewProvider>
          </MenuContextProvider>
          <Footer />
        </AppRouterCacheProvider>
      </body>
      {isEnabled && <Script src='/live-preview.mjs' />}
    </html>
  )
}
