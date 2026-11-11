import { gql } from '@apollo/client'

export const GET_INTEGRETY_POLICY = gql`
query getPolicyData($preview: Boolean, $title: String!) {
  integretyPolicyCollection(
    limit: 1
    preview: $preview
    where: { policyTitle_contains: $title }
  ) {
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

/* query getPolicyData($preview: Boolean) {
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
} */