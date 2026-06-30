import { gql } from '@apollo/client'

export const GET_TOS_POLICY = gql`
 query getPolicyData($preview: Boolean) {
  termsOfServiceCollection(limit: 1, preview: $preview) {
    items {
    _id
      sys {
        id
      }
      policyTitle
      policyText {
        json
      }
    }
  }
}
`
