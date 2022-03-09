import React from 'react'
import { Link } from 'react-router-dom'
import { countries } from './Countries'

function BBNNPage() {

  return (
      <div className="bbnn">
        <h2 className="bbnn-title">BBNN Model</h2>
        {countries.map(country => <Link to={`/bbnn/${country.id}`}>{country.name}</Link>)}
      </div>
  )
}

export default BBNNPage
