import { gql } from 'apollo-boost'

const GET_REGIONS = gql`
  query RegionsForContinent($continent: String!) {
    continent(name: $continent) {
      name
      regions {
        name
        countries {
          count
        }
      }
    }
  }
`

export default GET_REGIONS