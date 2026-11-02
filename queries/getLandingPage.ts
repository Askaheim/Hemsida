import { gql } from '@apollo/client'
export const GET_LANDING_DATA = gql`
 query GetData($preview: Boolean) {
   heroSectionCollection(limit: 1, preview: $preview) {
    items {
    _id
      heroTitle
      heroText {
        json
      }
      heroImage {
        url
      }
      heroBgImage {
        url
      }
      heroCtaPrimary
      heroCtaSecondary
      sys {
        __typename
      }
    }
  }

   frontPageTextSectionsCollection(limit: 5, preview: $preview) {
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
          sys {
            id
          }
          url
        }
        order
        centerTextsection
      }
    }
      }
`

export const GET_LANDING_DATA_FALLBACK = gql`
  query GetData($preview: Boolean) {
    heroSectionCollection(limit: 1, preview: $preview) {
      items {
        _id
        heroTitle
        heroText {
          json
        }
        heroImage {
          url
        }
        heroCtaPrimary
        heroCtaSecondary
      }
    }

    frontPageTextSectionsCollection(limit: 5, preview: $preview) {
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
          sys {
            id
          }
          url
        }
        order
        centerTextsection
      }
    }
  }
`