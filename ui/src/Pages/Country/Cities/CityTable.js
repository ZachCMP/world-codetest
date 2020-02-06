import React from 'react'
import {
  Button,
  Spinner,
} from 'reactstrap'

const CityTable = ({ cities, selectCity, loading=false }) => (
  <div style={{ position: 'relative' }}>
    {!cities || cities.length > 0 ? (
      <table className="table">
        <thead>
          <tr>
            <th className="border-top-0">City</th>
            <th className="border-top-0">District</th>
            <th className="border-top-0">Population</th>
          </tr>
        </thead>
        <tbody>
          {cities.map(city => (
            <tr key={city.id}>
              <td>
                <Button color="link" className="p-0" onClick={() => selectCity(city)}>
                  {city.name}
                </Button>
              </td>
              <td>{city.district}</td>
              <td>{city.population}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <div className="text-center p-4 text-black-50">
        <h3>No Cities</h3>
      </div>
    )}
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
)

export default CityTable