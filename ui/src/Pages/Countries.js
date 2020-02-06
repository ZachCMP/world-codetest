import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import DataLoader from '../Components/DataLoader'
import { CountriesData } from '../Components/Queries'

const CountriesLayout = ({ region }) => {
  const { pathname } = useLocation()

  return (
    <div>
      <h1 className="border-bottom text-center">{region} Countries</h1>
      <CountriesData region={region}>
        {queryData => (
          <DataLoader
            {...queryData}
            render={{
              data: data => (
                data.region.countries.objects.map(({ code, name }) => (
                  <h3 key={code} className="text-center">
                    <Link to={`${pathname}/${code}`}>
                      {name}
                    </Link>
                  </h3>
                ))
              )
            }}
          />
        )}
      </CountriesData>
    </div>
  )
}

export default CountriesLayout