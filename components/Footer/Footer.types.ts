export type SectionProps = React.HTMLAttributes<HTMLElement> & {
  children: React.ReactNode
}

export type SectionTitleProps = React.HTMLAttributes<HTMLHeadingElement> & {
  children: React.ReactNode
}

export type SectionContentProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode
}

export type FooterData = {
  logo: {
    footerLogo: { url: string }
  }[]
  socialMedia: SocialMediaSectionProps[]
}

export type SocialMediaSectionProps = {
  socialmediaTitle: string
  socialMediaIcon: {
    url: string
  }
  socialmediaLink: string
}

export type FooterLogoData = {
  logo: string
  logoDark: string
}
export type TextSection = {
  sectionTitle: string
  linkTexts: string[]
}