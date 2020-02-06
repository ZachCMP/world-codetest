import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const REGIONS = gql`
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

const Regions = ({ continent, children }) => {
  const data = useQuery(REGIONS, { variables: { continent } })

  return children(data)
}

export default Regions