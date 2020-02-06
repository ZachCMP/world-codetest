import { gql } from 'apollo-boost'

const GET_COUNTRIES = gql`
  query CountriesForRegion($region: String!) {
    # Setting page size to 999 to remove pagination for now
    region(name: $region) {
      name
      countries(pageSize: 999) {
        page
        pages
        count
        hasNext
        hasPrev
        objects {
          code
          name
          cities {
            count
          }
        }
      }
    }
  }
`

export default GET_COUNTRIES