import React from 'react'
import { FaExclamationTriangle } from 'react-icons/fa'
import {
  Spinner
} from 'reactstrap'

const defaultRenders = {
  loading: () => (
    <div className="text-center text-black-50">
      <h1>
        <Spinner /> Loading
      </h1>
    </div>
  ),
  error: err => (
    <div className="text-center text-danger">
      <h1><FaExclamationTriangle /> Error</h1>
      <p>{err.message}</p>
    </div>
  ),
  data: data => (
    <pre>
      {JSON.stringify(data, null, 4)}
    </pre>
  )
}

const DataLoader = ({ loading, error, data, render }) => {
  if (loading) return render.loading ? render.loading() : defaultRenders.loading()
  if (error) return render.error ? render.error(error) : defaultRenders.error(error)
  return render.data ? render.data(data) : defaultRenders.data(data)
}

export default DataLoader