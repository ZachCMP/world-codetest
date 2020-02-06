import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { FaExclamationTriangle, FaPlus } from 'react-icons/fa'
import { Spinner, Badge, Button } from 'reactstrap'

import CachedData from '../../../Components/CachedData'
import Pagination from '../../../Components/Pagination'

import { GetCities, GetCity } from '../../../GQL/Queries'
import { UpdateCity, DeleteCity, CreateCity } from '../../../GQL/Mutations'

import CitySearch from './CitySearch'
import CityTable from './CityTable'
import CityModal from './CityModal'

const Cities = ({ countryCode }) => {
  const [ page, setPage ] = React.useState(1)
  const [ nameLike, setNameLike ] = React.useState('')
  const [ selectedCity, setSelectedCity ] = React.useState(null)

  const selectCity = city => setSelectedCity(city)
  const deselectCity = () => setSelectedCity(null)

  const citiesData = useQuery(GetCities, { variables: { countryCode, page, nameLike } })

  const [ updateCityMutation ] = useMutation(UpdateCity)
  const [ deleteCityMutation ] = useMutation(DeleteCity)
  const [ createCityMutation ] = useMutation(CreateCity)

  const updateCity = city => {
    if (city) updateCityMutation({ 
      variables: { 
        id: city.id,
        cityData: {
          name: city.name,
          district: city.district,
          population: city.population,
        }
      },
      refetchQueries: [
        { query: GetCity, variables: { id: city.id } }
      ],
      update: (cache, { data: { updateCity } }) => {
        deselectCity()
      }
    })
  }

  const createCity = city => {
    if (city) createCityMutation({
      variables: {
        cityData: {
          name: city.name,
          countrycode: city.countrycode,
          district: city.district,
          population: city.population
        }
      },
      refetchQueries: [
        { query: GetCities, variables: { countryCode, page, nameLike } }
      ],
      update: () => {
        deselectCity()
      }
    })
  }

  const addNewCity = () => {
    selectCity({
      countrycode: countryCode
    })
  }

  const deleteCity = city => {
    if (city) {
      deleteCityMutation({
        variables: {
          id: city.id
        },
        refetchQueries: [
          { query: GetCities, variables: { countryCode, page, nameLike } }
        ],
        update: () => {
          deselectCity()
        }
      })
    }
  }

  if (citiesData.error) {
    return (
      <div className="text-center text-danger">
        <h1><FaExclamationTriangle /> Error</h1>
        <p>{citiesData.error.message}</p>
      </div>
    )
  }

  return (
    <CachedData
      data={citiesData.data}
      onNull={() => (
        <div className="text-center text-black-50">
          <h1><Spinner /> Loading</h1>
        </div>
      )}
    >
      {({ country: { cities } }) => (
        <div>

          <h4 className="border-bottom pb-1">
            Cities <Badge>{cities.count}</Badge>
            <div className="float-right">
              <Button 
                color="success" 
                size="sm"
                onClick={addNewCity}
              >
                <FaPlus /> Add City
              </Button>
            </div>
          </h4>

          <CitySearch 
            value={nameLike} 
            onChange={setNameLike} 
          />
          
          <CityTable
            cities={cities.objects}
            selectCity={selectCity}
            loading={citiesData.loading}
          />
          
          <Pagination
            page={page}
            pages={cities.pages}
            hasNext={cities.hasNext}
            hasPrev={cities.hasPrev}
            changePage={setPage}
          />

          <CityModal
            city={selectedCity}
            toggle={deselectCity}
            saveCity={city => city.id ? updateCity(city) : createCity(city)}
            deleteCity={deleteCity}
          />
          
        </div>
      )}
    </CachedData>
  )
}

export default Cities