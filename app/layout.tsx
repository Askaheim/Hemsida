import Footer from '@/components/Footer/Footer'
import MenuList from '@/components/Navbar/MenuList'
import LivePreviewProvider from '@/context/LivePreviewProvider'
import { MenuContextProvider } from '@/context/MenuProvider'
import apolloClient from '@/lib/apolloClient'
import previewClient from '@/lib/previewClient'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { draftMode } from 'next/headers'
import Script from 'next/script'
import './globals.css'

const advisor = localFont({
  src: [
    {
      path: '../public/fonts/Advisor_SSi.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/Advisor_SSi_Bold.ttf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../public/fonts/Advisor_Black_SSi_Black_Italic.ttf',
      weight: '900',
      style: 'italic',
    },
    {
      path: '../public/fonts/AdvisorMedium.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../public/fonts/AdvisorItalic.ttf',
      weight: '400',
      style: 'italic',
    }
  ],
  variable: '--font-advisor',
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
      className={`${advisor.variable} antialiased`}
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
