import { cva } from 'class-variance-authority'

export const dividerVariants = cva(
  'h-2 w-28 rounded-full',
  {
    variants: {
      variant: {
        light: 'bg-black',
        dark: 'bg-white',
        gradient: 'bg-gradient-to-r from-[#2F3BEA] to-[#B1159F] dark:from-[#B1159F] dark:to-[#2F3BEA] transition-all duration-300',
      },
      defaultVariants: {
        variant: 'gradient',
      },
    },
  }
)