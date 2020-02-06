import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Link, useLocation } from 'react-router-dom'

import { GetContinents } from '../GQL/Queries'
import DataLoader from '../Components/DataLoader'

const ContinentsLayout = () => {
  const continentsData = useQuery(GetContinents)
  const { pathname } = useLocation()

  return (
    <div>
      <h1 className="border-bottom text-center">Continents</h1>
      <DataLoader
        {...continentsData}
        render={{
          data: data => (
            data.continents.map(({ name, countries: {count} }) => (
              <h2 key={name} className="text-center">
                <Link to={`${pathname}${name}`}>
                  {name}
                </Link>
              </h2>
            ))
          )
        }}
      />
    </div>
    
  )
}

export default ContinentsLayout