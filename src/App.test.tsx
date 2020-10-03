import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders header', () => {
  const { getByText } = render(<App />)
  const title = getByText(/Populism Alert/i)
  expect(title).toBeInTheDocument()
})

test('renders selector', () => {
  const { getByText } = render(<App />)
  const selectorInfo = getByText(/Select a country/i)
  expect(selectorInfo).toBeInTheDocument()
})

test('renders', () => {
  const { getByText } = render(<App />)
  const bbnnPanel = getByText(/BBNN Model/i)
  expect(bbnnPanel).toBeInTheDocument()
})


