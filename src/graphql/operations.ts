import { gql } from '@apollo/client/core'

export const ITEMS_QUERY = gql`
  query Items {
    items {
      id
      title
      status
    }
  }
`

export const ADD_ITEM_MUTATION = gql`
  mutation AddItem($title: String!, $status: String) {
    addItem(title: $title, status: $status) {
      id
      title
      status
    }
  }
`

export const ITEM_ADDED_SUBSCRIPTION = gql`
  subscription ItemAdded {
    itemAdded {
      id
      title
      status
    }
  }
`

export const ITEM_STATUS_CHANGED_SUBSCRIPTION = gql`
  subscription ItemStatusChanged {
    itemStatusChanged {
      id
      title
      status
    }
  }
`
