import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Link, useLocation } from 'react-router-dom'

import DataLoader from '../Components/DataLoader'
import { GetRegions } from '../GQL/Queries'

const RegionsLayout = ({ continent }) => {
  const regionsData = useQuery(GetRegions, { variables: { continent } })
  const { pathname } = useLocation()

  return (
    <div>
      <h1 className="text-center border-bottom">{continent} Regions</h1>
      <DataLoader
        {...regionsData}
        render={{
          data: data => {
            return (
              data.continent.regions.map(({ name }) => (
                <h2 key={name} className="text-center">
                  <Link to={`${pathname}/${name}`}>
                    {name}
                  </Link>
                </h2>
              ))
            )
          }
        }}
      />
    </div>
  )
}

export default RegionsLayout