import Menu from '@/components/Navbar/Menu'
import PageTitle from '@/components/PageTitle/PageTitle'
import { richTextOptions } from '@/components/RichTextOptions/RichTextOptions'
import Typography from '@/components/Typography/Typography'
import apolloClient from '@/lib/apolloClient'
import previewClient from '@/lib/previewClient'
import { GET_INTEGRETY_POLICY } from '@/queries'
import { ContentfulLivePreview } from '@contentful/live-preview'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { draftMode } from 'next/headers'
import Image from 'next/image'

const policy = async () => {
    const { isEnabled } = await draftMode()
    const client = isEnabled ? previewClient : apolloClient


    return (
        <>
            <Menu />
            {/* relative och z-10 på main sätter basen */}
            <main className='section-contain mt-20 min-h-screen relative z-10 max-w-[1024px] overflow-hidden'>

                {/* Textinnehållet får z-20 och relative så det garanterat ligger ovanpå bilden */}
                <div className='relative z-20 max-w-xl'>
                    <PageTitle>Cookie Policy</PageTitle>
                    <Typography variant="p">
                        Eftersom Askaheim.com inte använder några kakor alls, varken för att lagra information eller i något annat syfte, behövs det ingen kak policy.
                    </Typography>
                </div>

                {/* BAKGRUNDSANIMATIONEN */}
                <div className='absolute inset-0 -z-10 pointer-events-none flex items-center justify-center opacity-30'>
                    <Image
                        src="/cookie.svg"
                        alt="cookie animation"
                        width={800}
                        height={800}
                        unoptimized
                        className='object-contain max-w-full max-h-full'
                    />
                </div>

            </main>
        </>
    )
}
export default policy
