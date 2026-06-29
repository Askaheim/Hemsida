import ContactFormProvider from '@/components/ContactForm/ContactFormProvider'
import Menu from '@/components/Navbar/Menu'
import PageTitle from '@/components/PageTitle/PageTitle'
import TextBlock from '@/components/TextSections/TextSections'
import apolloClient from '@/lib/apolloClient'
import { customerData } from '@/lib/customerData'
import previewClient from '@/lib/previewClient'
import { GET_CONTACT_DATA } from '@/queries'
import { draftMode } from 'next/headers'
import { ContactDataProps } from './contact.types'
import CenterTextBlock from '@/components/TextSections/CenterTextSection'
import { ContentfulLivePreview } from '@contentful/live-preview'


export const metadata = {
  title: 'Contact',
  description: `${customerData.contactMessage}`,
}

const Contact = async () => {
  const { isEnabled } = await draftMode()
  const client = isEnabled ? previewClient : apolloClient

  const { data } = await client.query({
    query: GET_CONTACT_DATA,
    variables: {
      preview: isEnabled,
    },
  })

  const contactData: ContactDataProps[] =
    data?.contactPageTextsectionsCollection?.items
  const mappedContactData = contactData?.map(section => ({
    sectionTitle: section.sectionTitle, // rename to what TextBlock expects
    sectionText: section.sectionText, // rename to what TextBlock expects
    sectionImage: section.sectionImage, // rename
    order: section.order, // keep the order for layout purposes
    sys: section.sys, // keep sys for Contentful Live Preview
    center: section.centerTextsection,
  }))
  return (
    <main className="relative z-10 min-h-screen before:absolute before:inset-0 before:-z-10 before:bg-[url('/images/bgFixedNO.png')] before:bg-contain before:opacity-25">
      <Menu withBg={true} />
      <section className='section-contain mt-20'>
        <PageTitle>Kontakt</PageTitle>
        <div className='flex flex-col py-12 md:py-20'>
          {mappedContactData &&
            mappedContactData.map((section, idx) => (
              section.center ? (
                <CenterTextBlock
                  key={idx}
                  className='my-8 lg:my-10'
                  block={section}
                  showImage={false}
                  {...ContentfulLivePreview.getProps({
                    entryId: 'section.sys.id',
                    fieldId: 'paragraph',
                    locale: 'sv-SE',
                  })}
                />
              ) : (
                <TextBlock.Section
                  key={idx}
                  className='mx-auto my-16 max-w-[1440px] px-6 md:my-32 md:px-16'
                  reverse={section.order % 2 === 0 ? true : false}
                >
                  <TextBlock block={section} showImage={true} />
                </TextBlock.Section>
              )

            ))}
        </div>
        <div className='flex flex-col items-center justify-center'>
          <ContactFormProvider classNames='mb-20' />
        </div>
      </section>
    </main>
  )
}
export default Contact
