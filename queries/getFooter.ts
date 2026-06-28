import { gql } from '@apollo/client'

export const GET_FOOTER = gql`
  query getData($preview: Boolean) {
  socialMediaDataCollection(limit: 5, preview: $preview) {
    items {
      socialmediaTitle
      socialMediaIcon {
        url
      }
      socialmediaLink
    }
  }
}
`
