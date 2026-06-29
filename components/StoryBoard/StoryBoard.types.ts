import { Document } from '@contentful/rich-text-types'
export interface StoryBoardProps {
  textsections: storyTextSections
}

export interface storyTextSections {
  sys?: {
    id: string
  }
  sectionHeadText: string
  sectionSubText: string
  sectionText: Document
  sectionImage?: {
    sys: {
      id: string
    }
    url?: string
    description?: string
  }
  centerTextsection?: boolean
}
