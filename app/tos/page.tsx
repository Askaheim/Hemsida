import Menu from '@/components/Navbar/Menu'
import PageTitle from '@/components/PageTitle/PageTitle'
import { richTextOptions } from '@/components/RichTextOptions/RichTextOptions'
import apolloClient from '@/lib/apolloClient'
import previewClient from '@/lib/previewClient'
import { GET_TOS_POLICY } from '@/queries'
import { ContentfulLivePreview } from '@contentful/live-preview'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { draftMode } from 'next/headers'

const tos = async () => {
  const { isEnabled } = await draftMode()
  const client = isEnabled ? previewClient : apolloClient

  const { data } = await client.query({
    query: GET_TOS_POLICY,
    variables: {
      preview: isEnabled,
    },
  })

  const tosContent = data?.termsOfServiceCollection?.items ?? []
  const tosEntry = tosContent[0]

  return (
    <>
      <Menu />
      <main className='section-contain mt-20 min-h-screen max-w-5xl'>
        {tosEntry && (
          <>
            <PageTitle>{tosEntry.policyTitle}</PageTitle>

            <article
              {...ContentfulLivePreview.getProps({
                entryId: tosEntry.sys.id,
                fieldId: 'policyText',
                locale: 'sv-SE',
              })}
              className='my-16 px-4 md:my-32'
            >
              {documentToReactComponents(
                tosEntry.policyText.json,
                richTextOptions,
              )}
            </article>
          </>
        )}
      </main>
    </>
  )
}
export default tos
