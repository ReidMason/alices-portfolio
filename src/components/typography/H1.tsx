import { type ReactNode } from 'react'

interface MainHeadingProps {
  children: ReactNode;
}

export const MainHeading = ({ children }: MainHeadingProps) => {
  return (
    <h1 className="text-5xl mb-8 md:mb-12 leading-tight">
      {children}
    </h1>
  )
}
