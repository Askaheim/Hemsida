import Button from '@/components/Button/Button'
import Menu from '@/components/Navbar/Menu'
import PageTitle from '@/components/PageTitle/PageTitle'
import CenterTextBlock from '@/components/TextSections/CenterTextSection'
import { BlockProps } from '@/components/TextSections/TextSection.types'
import TextBlock from '@/components/TextSections/TextSections'
import apolloClient from '@/lib/apolloClient'
import previewClient from '@/lib/previewClient'
import { GET_FEATURES } from '@/queries'
import { DataProps } from '@/utils/globalTypes'
import { ContentfulLivePreview } from '@contentful/live-preview'
import Divider from '@/components/Divider/Divider'
import Typography from '@mui/material/Typography'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import JobDetails from '@/components/Jobs/JobDetails'
import ImageCarousel from '@/components/Carousel/Carousel'
import { JobProps } from './features.types'
import { richTextOptions } from '@/components/RichTextOptions/RichTextOptions'


export const metadata: Metadata = {
  title: 'Features',
  description: `Våra tjänster och erbjudanden`,
}

const Features = async () => {
  const { isEnabled } = await draftMode()
  const client = isEnabled ? previewClient : apolloClient

  const { data } = await client.query({
    query: GET_FEATURES,
    variables: {
      preview: isEnabled,
    },
  })

  const featuresData: DataProps[] = data?.servicepageTextsectionsCollection?.items
  const mappedFeaturesData: BlockProps[] = featuresData
    ?.map(section => ({
      _id: section._id,
      sectionTitle: section.sectionTitle,
      sectionText: section.sectionText,
      sectionImage: section.sectionImage,
      order: section.order, // keep the order for layout purposes
      sys: section.sys, // keep sys for Contentful Live Preview
      centerTextsection: section.centerTextsection
    }))
    ?.sort((a, b) => a.order - b.order)

  const jobs = data?.oldJobsCollection?.items

  return (
    <main className="relative z-10 min-h-screen before:absolute before:inset-0 before:-z-10 before:bg-[url('/images/bgFixedNO.png')] before:bg-contain before:opacity-25">
      <Menu withBg={true} />
      <section className="mx-auto mt-20 md:py-12 px-6 md:px-12 ">
        <PageTitle>Våra tjänster</PageTitle>
        <div className='flex flex-col py-6 '>
          {mappedFeaturesData &&
            mappedFeaturesData.map(block => (
              block.centerTextsection === true ? (
                <CenterTextBlock
                  key={block.sys?.id ?? block.order}
                  className='py-8 lg:py-10'
                  block={block}
                  showImage={false}
                  {...ContentfulLivePreview.getProps({
                    entryId: block?._id,
                    fieldId: 'paragraph',
                    locale: 'sv-SE',
                  })}
                />
              ) : (
                <TextBlock.Section
                  key={block.sys?.id ?? block.order}
                  className={'my-12'}
                  reverse={block.order % 2 === 0 ? true : false}
                >
                  <TextBlock block={block} showImage={true} />
                </TextBlock.Section>
              )
            ))}
        </div>

        <div className=''>
          <Typography variant='h2' className='font-advisor font-extrabold' >
            Tidigare arbeten
          </Typography>
          <Divider variant="primary" />

          <div className='mt-6 md:mt-10 flex flex-col gap-16'>
            {jobs.map((job: JobProps, idx: number) => {

              const carouselImages = job.jobImagesCollection?.items || [];

              return (
                <div key={idx} className="w-full flex flex-col gap-8 border-b border-gray-100 pb-12 last:border-0">

                  {/* ÖVRE DEL: Grid med 2 kolumner på dator (Bild vä, Text hö) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

                    {/* VÄNSTER: Karusellen (Kvadrat) */}
                    <div className="w-full">
                      <ImageCarousel images={carouselImages} />
                    </div>

                    {/* HÖGER: Text, rubrik, beskrivning */}
                    <div className="w-full">
                      <JobDetails title={job.jobTitle} description={job.jobDescription} />
                    </div>

                  </div>

                  {/* NEDRE DEL: Client Quote (Full bredd, ligger utanför griddet) */}

                  {job.clientQuote?.json && (
                    <div className="w-full bg-gray-50/70 p-6 md:p-8 rounded-2xl border-l-4 border-primary-accent mt-4">
                      <span className="block text-xs font-bold uppercase tracking-wider text-primary-accent mb-2">
                        Klientens omdöme
                      </span>
                      <blockquote className="text-gray-700 italic font-medium md:text-lg leading-relaxed">
                        "{documentToReactComponents(job.clientQuote.json, richTextOptions)}"
                      </blockquote>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
export default Features
