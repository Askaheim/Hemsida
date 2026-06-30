'use client'
import { useRouter } from 'next/navigation'



const FooterClient = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const handleClickOnLogo = () => {
        router.push('/');
    }

    return (
        <div className='flex items-center justify-center py-4 cursor-pointer' onClick={handleClickOnLogo}>
            {children}
        </div>
    )
}
export default FooterClient;