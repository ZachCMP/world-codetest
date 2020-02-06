import { gql } from 'apollo-boost'

const CREATE_CITY = gql`
  mutation createCity($cityData: NewCityInput!) {
    createCity(cityData: $cityData) {
      ok
      city {
        id
        name
        countrycode
        district
        population
      }
    }
  }
`

export default CREATE_CITY