import Menu from '@/components/Navbar/Menu'
import PageTitle from '@/components/PageTitle/PageTitle'
import CenterTextBlock from '@/components/TextSections/CenterTextSection'
import { BlockProps } from '@/components/TextSections/TextSection.types'
import TextBlock from '@/components/TextSections/TextSections'
import apolloClient from '@/lib/apolloClient'
import previewClient from '@/lib/previewClient'
import { GET_OVENS } from '@/queries'
import { DataProps } from '@/utils/globalTypes'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'



export const metadata: Metadata = {
    title: 'Kakelugnar',
    description: `Kakelugnar som tjänst`,
}

const Ovens = async () => {
    const { isEnabled } = await draftMode()
    const client = isEnabled ? previewClient : apolloClient

    const { data } = await client.query({
        query: GET_OVENS,
        variables: {
            preview: isEnabled,
        },
    })

    const featuresData: DataProps[] = data?.tileovenspageTextSectionsCollection?.items
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



    return (
        <main className="bg-primaryBgLight dark:bg-primaryBgDark">
            <Menu withBg={true} />
            <section className=" relative z-10 min-h-screen  ">
                <div className="mx-auto mt-20 md:py-12 px-6 md:px-12">
                    <PageTitle>Kakelugnar</PageTitle>
                    <div className='flex flex-col py-6 '>
                        {mappedFeaturesData &&
                            mappedFeaturesData.map(block => (
                                block.centerTextsection === true ? (
                                    <CenterTextBlock
                                        key={block.sys?.id ?? block.order}
                                        className='py-8 lg:py-10'
                                        block={block}
                                        showImage={true}

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
                </div>
            </section>
        </main>
    )
}
export default Ovens
