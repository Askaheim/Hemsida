import { Document as RichTextDocument } from '@contentful/rich-text-types'

export interface ContactDataProps {
  _id: string
  sys?: {
    id: string
  }
  sectionTitle?: string
  sectionText?: { json: RichTextDocument }
  sectionImage?: ImageProps
  order: number
  centerTextsection?: boolean
}

export interface ContentfulSys {
  id: string
}

export interface ImageProps {
  url: string
  sys?: ContentfulSys
}
