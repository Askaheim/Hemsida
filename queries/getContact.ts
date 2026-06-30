import { gql } from '@apollo/client'

export const GET_CONTACT_DATA = gql`
 query getContactData($preview: Boolean) {
    contactPageTextsectionsCollection(limit: 1, preview: $preview) {
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
      }
    }
  }
`
