import React from 'react'
import { Spinner } from 'reactstrap'
import { FaExclamationTriangle } from 'react-icons/fa'

import { CitiesData } from '../Queries'
import Pagination from '../Pagination'
import CachedData from '../CachedData'

const Cities = ({ countryCode }) => {
  const [ page, setPage ] = React.useState(1)

  return (
    <CitiesData
      countryCode={countryCode}
      page={page}
    >
      {({ loading, error, data }) => {
        if (error) return (
          <div className="text-center text-danger">
            <h1><FaExclamationTriangle /> Error</h1>
            <p>{error.message}</p>
          </div>
        )
        return (
          <CachedData 
            data={data}
            onNull={() => (
              <div className="text-center text-black-50">
                <h1><Spinner /> Loading</h1>
              </div>
            )}
          >
            {({ country: { cities } }) => {
              return (
                <div>

                  <div style={{ position: 'relative' }}>
                    <table className="table">
                      <thead>
                        <tr>
                          <th className="border-top-0">City</th>
                          <th className="border-top-0">District</th>
                          <th className="border-top-0">Population</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cities.objects.map(city => (
                          <tr key={city.id}>
                            <td>{city.name}</td>
                            <td>{city.district}</td>
                            <td>{city.population}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {loading ? (
                      <div
                        className="d-flex align-items-center"
                        style={{
                          justifyContent: 'center',
                          position: 'absolute',
                          top: '0px',
                          right: '0px',
                          bottom: '0px',
                          left: '0px',
                          backgroundColor: 'rgba(0,0,0,0.5)'
                        }}
                      >
                        <h1><Spinner /> Loading</h1>
                      </div>
                    ) : null}
                    
                  </div>
                  
                  <Pagination
                    page={page}
                    pages={cities.pages}
                    hasNext={cities.hasNext}
                    hasPrev={cities.hasPrev}
                    changePage={setPage}
                  />
                </div>
              )
            }}
          </CachedData>
        )
      }}
    </CitiesData>
  )
}

export default Cities