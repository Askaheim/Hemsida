import { gql } from '@apollo/client'

export const GET_ABOUT = gql`
  query GetData($preview: Boolean) {
  aboutpageTextSectionsCollection(limit: 5, preview: $preview) {
    items {
    _id
      sys {
        id
      }
      sectionTitle
      sectionText {
        json
      }
      sectionImage {
        url
        description
      }
      centerTextsection
      order
    }
  }
  coworkersCollection(limit: 3, preview: $preview) {
    items {
    _id
      sys {
        id
      }
      workerName
      workerTitle
      workerProfileImage {
        url
        description
      }
      workerText {
        json       
      }
    }
  }
}
`
