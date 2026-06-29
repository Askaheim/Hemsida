import { cva } from 'class-variance-authority'

export const buttonVariants = cva(
  'cursor-pointer outline-none rounded-full select-none transition duration-200 disabled:cursor-default disabled:brightness-50',
  {
    variants: {
      variant: {
        primary: 'bg-primary-accent text-white hover:bg-white hover:border-1 hover:border-primary-accent hover:text-primary-accent',
        secondary: 'bg-transparent border-2 border-primary-accent text-primary-accent hover:bg-primary-accent hover:text-white',

      },
      size: {
        sm: 'px-4 py-2 text-sm font-medium',
        md: 'px-4 py-3 text-base font-medium',
        lg: 'px-4 py-3 text-lg font-medium',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)