import { BlockProps } from '@/components/TextSections/TextSection.types'
import { ContentfulLivePreview } from '@contentful/live-preview'
import { coworkerBlockProps } from './about.types'
import { draftMode } from 'next/headers'
import { GET_ABOUT } from '@/queries'
import { Metadata } from 'next'
import apolloClient from '@/lib/apolloClient'
import CenterTextBlock from '@/components/TextSections/CenterTextSection'
import Image from 'next/image'
import Menu from '@/components/Navbar/Menu'
import PageTitle from '@/components/PageTitle/PageTitle'
import previewClient from '@/lib/previewClient'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { richTextOptions } from '@/components/RichTextOptions/RichTextOptions'

import TextBlock from '@/components/TextSections/TextSections'

export const metadata: Metadata = {
  title: 'About page',
  description: 'The about page of the website, includes information about the company and its history and coworkers...'
}

const About = async () => {
  const { isEnabled } = await draftMode()
  const client = isEnabled ? previewClient : apolloClient

  const { data } = await client.query({
    query: GET_ABOUT,
    variables: {
      preview: isEnabled,
    },
  })

  const aboutTextSections = (data?.aboutpageTextSectionsCollection?.items ??
    []) as BlockProps[]

  // Sort by order
  const sortedAboutPageTextSections = aboutTextSections.sort(
    (a, b) => a.order - b.order,
  )

  const coworkerSection = (data?.coworkersCollection?.items ??
    []) as coworkerBlockProps[]
  return (
    <main className="relative z-10 min-h-screen before:absolute before:inset-0 before:-z-10 before:bg-[url('/images/bgFixedNO.png')] before:bg-contain before:opacity-25">
      <Menu withBg={true} />
      <PageTitle variant='light' className='mt-12 md:mt-18 mx-4 md:mx-8'>
        Om oss
      </PageTitle>
      <section className="section-contain mt-20 " >
        {sortedAboutPageTextSections &&
          sortedAboutPageTextSections.map((block, index) => (

            (block.centerTextsection ? (
              <CenterTextBlock
                key={index}
                className='my-8 lg:my-10'
                block={sortedAboutPageTextSections[0]}
                showImage={false}
                {...ContentfulLivePreview.getProps({
                  entryId:
                    block?._id,
                  fieldId: 'paragraph',
                  locale: 'sv-SE',
                })}
              />
            ) : (

              <TextBlock.Section
                key={index}
                className={
                  'mx-auto my-16 max-w-[1440px] px-6 md:my-32 md:px-16'
                }
                reverse={block.order % 2 === 0 ? true : false}
              >
                <TextBlock block={block} showImage={true} />
              </TextBlock.Section>
            ))))}

        <div className="flex flex-col gap-12 mt-20 max-w-[1440px] mx-auto px-6 md:px-16">
          {coworkerSection.map((worker, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
              {/*LEFT SIDE */}
              {worker.workerProfileImage?.url ? (
                <div className="w-full md:w-[300px] shrink-0">
                  <Image
                    src={worker.workerProfileImage.url}
                    alt={worker.workerProfileImage.description || "Coworker"}
                    width={300}
                    height={300}
                    className="w-full h-auto aspect-square object-cover rounded-lg"
                  />
                </div>
              ) : (
                <div className="w-full md:w-[300px] shrink-0">
                  <Image
                    src='/images/placeholderProfile.jpg'
                    alt="placeholder profile avatar"
                    width={300}
                    height={300}
                    className="w-full h-auto aspect-square object-cover rounded-lg"
                  />
                </div>
              )}

              {/* RIGHT SIDE*/}
              <div className="flex flex-col gap-2 w-full">
                <h2 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark font-advisor">
                  {worker.workerTitle}
                </h2>
                <h3 className="text-xl text-text-primary-light dark:text-text-primary-dark font-advisor font-medium mb-2">
                  {worker.workerName}
                </h3>


                {worker.workerText?.json && (
                  <div className="prose max-w-none ">
                    <article
                      {...ContentfulLivePreview.getProps({
                        assetId: worker?.sys?.id ?? '',
                        fieldId: 'logos',
                        locale: 'en-US',
                      })}
                      className='font-poppins dark:text-text-primary-dark light:text-text-primary-light flex flex-col gap-4 items-start justify-center text-xl font-normal'
                    >
                      {worker.workerText &&
                        documentToReactComponents(worker.workerText.json, richTextOptions)}
                    </article>
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>



      </section>
    </main>
  )
}

export default About
