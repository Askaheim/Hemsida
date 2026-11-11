import { gql } from '@apollo/client'

export const GET_OVENS = gql`
query getServiceData($preview: Boolean) {
  tileovenspageTextSectionsCollection(limit: 10, preview: $preview) {
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
}
`
