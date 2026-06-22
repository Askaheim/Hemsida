import LandingpageHeroSection from '@/components/LandingpageHeroSection/LandingpageHeroSection'
import Menu from '@/components/Navbar/Menu'
import { BlockProps } from '@/components/TextSections/TextSection.types'
import apolloClient from '@/lib/apolloClient'
import previewClient from '@/lib/previewClient'
import { ContentfulLivePreview } from '@contentful/live-preview'
import { draftMode } from 'next/headers'
import { GET_LANDING_DATA } from '@/queries/getLandingPage'

export default async function Home() {
  const { isEnabled } = await draftMode()
  const client = isEnabled ? previewClient : apolloClient

  const { data } = await client.query({
    query: GET_LANDING_DATA,
    variables: {
      preview: isEnabled,
    },
  })

  const heroData = data?.heroSectionCollection?.items[0]


  return (
    <>
      <Menu withBg={true} />
      <main>
        <LandingpageHeroSection />


      </main>
    </>
  )
}
