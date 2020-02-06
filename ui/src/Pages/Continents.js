import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import { ContinentsData } from '../Components/Queries'
import DataLoader from '../Components/DataLoader'

const ContinentsLayout = () => {
  const { pathname } = useLocation()

  return (
    <div>
      <h1 className="border-bottom text-center">Continents</h1>
      <ContinentsData>
        {(queryData) => (
          <DataLoader
            {...queryData}
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
        )}
      </ContinentsData>
    </div>
    
  )
}

export default ContinentsLayout