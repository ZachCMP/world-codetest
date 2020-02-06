import { gql } from 'apollo-boost'

const GET_CITY = gql`
  query getCity($id: ID!) {
    city(id: $id) {
      id
      countrycode
      name
      district
      population
    }
  }
`

export default GET_CITY