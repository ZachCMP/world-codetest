import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const CONTINENTS = gql`
  {
    continents {
      name
      countries {
        count
      }
    }
  }
`

const Continents = ({ children }) => {
  const data = useQuery(CONTINENTS)

  return children(data)
}

export default Continents