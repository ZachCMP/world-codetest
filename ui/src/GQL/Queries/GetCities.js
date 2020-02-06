import { gql } from 'apollo-boost'

const GET_CITIES = gql`
  query GetCitiesForCountry($countryCode: ID!, $page: Int, $pageSize: Int, $nameLike: String) {
    country(code: $countryCode) {
      cities(page: $page, pageSize: $pageSize, nameLike: $nameLike) {
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

export default GET_CITIES