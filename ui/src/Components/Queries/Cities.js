import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const CITIES = gql`
  query getCitiesForCountry($countryCode: ID!, $page: Int, $pageSize: Int) {
    country(code: $countryCode) {
      cities(page: $page, pageSize: $pageSize) {
        count
        page
        pages
        hasNext
        hasPrev
        objects {
          id
          countrycode
          name
          district
          population
        }
      }
    }
  }
`

const Cities = ({ countryCode, page, pageSize, children }) => {
  const data = useQuery(CITIES, { variables: { countryCode, page, pageSize } })
  return children(data)
}

export default Cities