import { gql } from '@apollo/client'

export const GET_INTEGRETY_POLICY = gql`
  query getPolicyData($preview: Boolean) {
  integretyPolicyCollection(limit: 1, preview: $preview) {
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
