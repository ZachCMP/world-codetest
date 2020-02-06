import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const COUNTRIES = gql`
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

const Countries = ({ region, children }) => {
  const data = useQuery(COUNTRIES, { variables: { region } })

  return children(data)
}

export default Countries