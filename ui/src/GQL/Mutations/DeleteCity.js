import { gql } from 'apollo-boost'

const DELETE_CITY = gql`
  mutation deleteCity($id: ID!) {
    deleteCity(id: $id) {
      ok
    }
  }
`

export default DELETE_CITY