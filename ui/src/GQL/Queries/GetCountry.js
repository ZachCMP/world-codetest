import { gql } from 'apollo-boost'

const GET_COUNTRY = gql`
  query GetCountry($code: ID!) {
    country(code: $code) {
      name
      code
      surfacearea
      indepyear
      population
      lifeexpectancy
      gnp
      localname
      governmentform
      headofstate
      capital {
        id
        name
      }
      languages {
        language
        isofficial
        percentage
      }
      cities {
        count
      }
    }
  }
`

export default GET_COUNTRY