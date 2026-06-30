import { ImageProps } from '@/utils/globalTypes'
import { Document as RichTextDocument } from '@contentful/rich-text-types'

export interface CenterDataProps {
  title: string
  text: { json: RichTextDocument }
  image: ImageProps
}

export type JobProps = {
  _id: string
  jobTitle: string
  jobDescription: {
    json: RichTextDocument
  }
  jobImagesCollection: {
    items: {
      url: string
      description: string

    }[]
  }
  clientQuote: {
    json: RichTextDocument
  }
}