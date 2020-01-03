/* global test, expect */

import React from 'react'
import { render, cleanup } from './test-utils'
import App from './App'

test('renders learn react link', () => {
  const { getByText } = render(<App />)
  const linkElement = getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()

  cleanup()
})
