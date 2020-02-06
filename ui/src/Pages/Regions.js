import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import DataLoader from '../Components/DataLoader'
import { RegionsData } from '../Components/Queries'

const RegionsLayout = ({ continent }) => {
  const { pathname } = useLocation()

  return (
    <div>
      <h1 className="text-center border-bottom">{continent} Regions</h1>
      <RegionsData continent={continent}>
        {queryData => (
          <DataLoader
            {...queryData}
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
        )}
      </RegionsData>
    </div>
  )
}

export default RegionsLayout