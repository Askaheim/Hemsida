'use client'

import { cn } from '@/utils/utils'
import type { DividerProps } from './Divider.types'
import { dividerVariants } from './Divider.variants'
import { useTheme } from '@/context/ThemeContext'

const Divider = ({
  className,
  variant,
  ...props
}: DividerProps) => {
  const { isDark } = useTheme()


  const activeVariant = variant || (isDark ? 'dark' : 'light')

  return (
    <div
      className={cn(dividerVariants({ variant: activeVariant, className }))}
      {...props}
    />
  )
}

export default Divider