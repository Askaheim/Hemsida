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
      <main>
        <LandingpageHeroSection {...({ hero: heroData } as any)} />

        <section className="light:bg-primaryBgLight dark:bg-primaryBgDark relative z-10 bg-[url(/images/bgFixedNO.png)] bg-cover bg-center bg-no-repeat">
          <div className='absolute bottom-0 z-10 w-full overflow-hidden'>
            <Image
              src='/images/wave.png'
              alt='Background Image'
              width={1400}
              height={50}
              className='z-99 w-full'
              priority
            />
          </div>
          <div className='section-contain'>
            {sortedFrontPageTextSections &&
              sortedFrontPageTextSections.map(block => (
                <TextBlock.Section
                  key={block.order}
                  className={
                    'mx-auto my-16 max-w-[1440px] px-6 md:my-32 md:px-16'
                  }
                  reverse={block.order % 2 === 0 ? true : false}
                >
                  <TextBlock block={block} showImage={true} />
                </TextBlock.Section>
              ))}
          </div>
        </section>
      </main>
    </>
  )
}
