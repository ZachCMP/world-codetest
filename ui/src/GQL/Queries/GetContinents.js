import { gql } from 'apollo-boost'

const GET_CONTINENTS = gql`
  {
    continents {
      name
      countries {
        count
      }
    }
  }
`

export default GET_CONTINENTS