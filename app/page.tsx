import LandingpageHeroSection from '@/components/LandingpageHeroSection/LandingpageHeroSection'
import Menu from '@/components/Navbar/Menu'
import { BlockProps } from '@/components/TextSections/TextSection.types'
import apolloClient from '@/lib/apolloClient'
import previewClient from '@/lib/previewClient'
import { ContentfulLivePreview } from '@contentful/live-preview'
import { draftMode } from 'next/headers'
import { GET_LANDING_DATA } from '@/queries/getLandingPage'
import Image from 'next/image'
import TextBlock from '@/components/TextSections/TextSections'
import HeroWrapper from '@/components/LandingpageHeroSection/HeroWrapper'
import CenterTextBlock from '@/components/TextSections/CenterTextSection'

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

  const frontPageTextSections = (data?.frontPageTextSectionsCollection?.items ??
    []) as BlockProps[]

  // Sort by order
  const sortedFrontPageTextSections = frontPageTextSections.sort(
    (a, b) => a.order - b.order,
  )

  return (
    <>
      <Menu withBg={true} />
      <main className="light:bg-primaryBgLight dark:bg-primaryBgDark">
        {/* <LandingpageHeroSection {...({ hero: heroData } as any)} /> */}
        <HeroWrapper heroData={heroData} />

        <section className="relative z-10 min-h-screen before:absolute before:inset-0 before:-z-10 before:bg-[url('/images/bgFixedNO.png')] before:bg-stretch before:opacity-25">

          <div className='section-contain mt-0'>
            {sortedFrontPageTextSections &&
              sortedFrontPageTextSections.map(block => (

                (block.centerTextsection ? (
                  <CenterTextBlock
                    key={block.order}
                    className='my-8 lg:my-10'
                    block={sortedFrontPageTextSections[0]}
                    showImage={false}
                    {...ContentfulLivePreview.getProps({
                      entryId:
                        data?.frontPageTextSectionsCollection?.items[0]?.sys?.id,
                      fieldId: 'paragraph',
                      locale: 'sv-SE',
                    })}
                  />
                ) : (

                  <TextBlock.Section
                    key={block.order}
                    className={
                      'mx-auto my-16 max-w-[1440px] px-6 md:my-32 md:px-16'
                    }
                    reverse={block.order % 2 === 0 ? true : false}
                  >
                    <TextBlock block={block} showImage={true} />
                  </TextBlock.Section>
                ))))}
          </div>
        </section>
      </main>
    </>
  )
}
