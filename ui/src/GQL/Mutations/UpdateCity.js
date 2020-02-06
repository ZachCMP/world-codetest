import { gql } from 'apollo-boost'

const UPDATE_CITY = gql`
  mutation updateCity($id: ID!, $cityData: CityInput!) {
    updateCity(id: $id, cityData: $cityData) {
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

export default UPDATE_CITY