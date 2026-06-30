import { gql } from '@apollo/client'

export const GET_FEATURES = gql`
 query getServiceData($preview: Boolean) {
  servicepageTextsectionsCollection(limit: 10, preview: $preview) {
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
        sys {
          id
        }
        description
      }
      order
      centerTextsection
    }
  }
  oldJobsCollection(limit: 10, preview: $preview) {
    items {
    _id
      sys {
        id
      }
      jobTitle
      jobDescription {
        json
      }
      jobImagesCollection {
        items {
          url
          description
        }
      }
      clientQuote {
        json
      }
    }
  }
}
`
