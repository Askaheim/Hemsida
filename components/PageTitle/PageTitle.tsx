import Divider from '@/components/Divider/Divider'
import Skeleton from '@/components/Skeleton/Skeleton'
import Typography from '@/components/Typography/Typography'
import { cn } from '@/utils/utils'
import { cva } from 'class-variance-authority'
import { PageTitleProps } from './PageTitle.types'

const title = cva('flex flex-col gap-1 break-words pt-20 pb-10 font-advisor', {
  variants: {
    variant: {
      light: 'text-text-primary-light',
      dark: 'text-text-primary-dark',
    },
  },
  defaultVariants: {
    variant: 'dark',
  },
})

const PageTitle = ({
  children,
  className,
  variant = 'light',
  ...props
}: PageTitleProps) => {
  return (
    <Typography
      variant='h1'
      className={cn(title({ variant, className }))}
      {...props}
    >
      {children}
      <Divider variant='primary' />
    </Typography>
  )
}

export const PageTitleSkeleton = ({ dark = false }) => {
  return <Skeleton className={'my-32 h-20'} dark={dark} />
}

export default PageTitle
