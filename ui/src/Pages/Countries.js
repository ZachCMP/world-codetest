import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Link, useLocation } from 'react-router-dom'

import DataLoader from '../Components/DataLoader'
import { GetCountries } from '../GQL/Queries'

const CountriesLayout = ({ region }) => {
  const countriesData = useQuery(GetCountries, { variables: { region } })
  const { pathname } = useLocation()

  return (
    <div>
      <h1 className="border-bottom text-center">{region} Countries</h1>
      <DataLoader
        {...countriesData}
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
    </div>
  )
}

export default CountriesLayout