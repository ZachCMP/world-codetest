import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const COUNTRY = gql`
  query Country($code: ID!) {
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

const Country = ({ countryCode, children }) => {
  const data = useQuery(COUNTRY, { variables: { code: countryCode } })
  return children(data)
}

export default Country