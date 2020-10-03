import React from 'react'

function CountrySelector() {
  return (
    <div>
      <label>
        <h2>Select a country</h2>
        <select defaultValue='none'>
          <option value="none">-</option>
          <option value="us">United States</option>
          <option value="germany">Germany</option>
          <option value="brazil">Brazil</option>
        </select>
      </label>
    </div>
  )
}
export default CountrySelector
