import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Badge } from 'reactstrap'

import { GetCountry } from '../../GQL/Queries'
import DataLoader from '../../Components/DataLoader'
import Cities from './Cities'

const CountryLayout = ({ countryCode }) => {
  const countryData = useQuery(GetCountry, { variables: { code: countryCode } })

  return (
    <DataLoader
      {...countryData}
      render={{
        data: ({ country }) => {
          return (
            <div>
              <h1 className="text-center">{country.name} <small className="text-muted">({country.code})</small></h1>
              <h4 className="border-bottom">General Information</h4>
              <div><strong>Local Name:</strong> {country.localname}</div>
              <div><strong>Surface Area:</strong> {country.surfacearea}</div>
              <div><strong>Population:</strong> {country.population}</div>
              <div><strong>Life Expectancy:</strong> {country.lifeexpectancy}</div>
              <div><strong>Gross National Product:</strong> {country.gnp} Million USD</div>
              <div><strong>Form of Government:</strong> {country.governmentform}</div>
              <div><strong>Head of State:</strong> {country.headofstate}</div>
              {country.capital ? <div><strong>Capital City:</strong> {country.capital.name}</div> : null}

              <br/>

              <h4 className="border-bottom">Languages Spoken</h4>
              <div>
                {country.languages.map(lang => (
                <div key={lang.language}>
                  <em>{lang.language}</em> ({lang.percentage}%){' '}
                  {lang.isofficial ? (
                    <Badge color="primary">Official</Badge>
                  ) : null}
                </div>
                ))}
              </div>
              
              <br/>
              
              <Cities countryCode={countryCode} />
            </div>
          )
        }
      }}
    />
  )
}

export default CountryLayout