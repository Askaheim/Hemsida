import Menu from '@/components/Navbar/Menu'
import { BlockProps } from '@/components/TextSections/TextSection.types'
import apolloClient from '@/lib/apolloClient'
import previewClient from '@/lib/previewClient'
import { draftMode } from 'next/headers'
import { GET_LANDING_DATA, GET_LANDING_DATA_FALLBACK } from '@/queries/getLandingPage'
import TextBlock from '@/components/TextSections/TextSections'
import CenterTextBlock from '@/components/TextSections/CenterTextSection'
import LandingpageHeroSection from '@/components/LandingpageHeroSection/LandingpageHeroSection'

export default async function Home() {
  const { isEnabled } = await draftMode()
  const client = isEnabled ? previewClient : apolloClient


  let data

  try {
    const result = await client.query({
      query: GET_LANDING_DATA,
      variables: {
        preview: isEnabled,
      },
    })

    data = result.data

  } catch (error) {
    console.error(
      'GRAPHQL ERRORS:',
      JSON.stringify(
        (error as any).graphQLErrors?.map((e: any) => ({
          message: e.message,
          path: e.path,
          locations: e.locations,
        })),
        null,
        2,
      ),
    )

    const fallbackResult = await client.query({
      query: GET_LANDING_DATA_FALLBACK,
      variables: {
        preview: isEnabled,
      },
    })

    data = fallbackResult.data
  }

  const heroData = data?.heroSectionCollection?.items[0]

  const frontPageTextSections =
    (data?.frontPageTextSectionsCollection?.items ?? []) as BlockProps[]

  const sortedFrontPageTextSections = [...frontPageTextSections].sort(
    (a, b) => a.order - b.order
  )

  return (
    <>
      <Menu withBg={true} />
      <main className="bg-primaryBgLight dark:bg-primaryBgDark">
        <LandingpageHeroSection hero={heroData} />

        <section className="relative z-10 min-h-screen ">

          <div className='section-contain mt-0'>
            {sortedFrontPageTextSections.map(block => {

              return block.centerTextsection ? (
                <CenterTextBlock
                  key={block.order}
                  className='py-8 lg:py-10'
                  block={block}
                  showImage={false}
                />
              ) : (
                <TextBlock.Section
                  key={block.order}
                  className='mx-auto py-16 max-w-360 px-6 md:py-32 md:px-16'
                  reverse={block.order % 2 === 0}
                >
                  <TextBlock block={block} showImage={true} />
                </TextBlock.Section>
              )
            })}
          </div>
        </section>
      </main>
    </>
  )
}
