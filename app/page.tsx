import {
  CenterTextBlock,
  LandingpageHeroSection,
  Menu,
  CardSection,
  QuoteSection,
  TextBlock,
  LogoSliderSection,
} from '@/components'
import { BlockProps } from '@/components/TextSections/TextSection.types'
import apolloClient from '@/lib/apolloClient'
import previewClient from '@/lib/previewClient'
import { GET_LANDING_DATA } from '@/queries'
import { ContentfulLivePreview } from '@contentful/live-preview'
import { draftMode } from 'next/headers'

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

  // Get the one with order === 1
  const firstSection = sortedFrontPageTextSections.find(
    section => section.order === 1,
  )

  // Get the rest
  const otherSections = sortedFrontPageTextSections.filter(
    section => section.order !== 1,
  )

  const preTextSection = data?.partnerLogoSliderPreTextCollection?.items[0]

  const preTextMapping: BlockProps = {
    sectionTitle: preTextSection?.textSectionHeader,
    sectionText: preTextSection?.textSectionParagraf,
    order: preTextSection?.order,
  }

  return (
    <>
      <Menu withBg={true} />
      <main>
        <LandingpageHeroSection />

        <div className='section-contain'>
          {firstSection && (
            <CenterTextBlock
              className='my-8 lg:my-10'
              block={firstSection}
              showImage={false}
              {...ContentfulLivePreview.getProps({
                entryId:
                  data?.frontPageTextSectionsCollection?.items[0]?.sys?.id,
                fieldId: 'paragraph',
                locale: 'sv-SE',
              })}
            />
          )}

        </div>
        <div className='section-contain'>
          {otherSections &&
            otherSections.map(block => (
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

          <LogoSliderSection preTextData={preTextMapping} />
        </div>
      </main>
    </>
  )
}
