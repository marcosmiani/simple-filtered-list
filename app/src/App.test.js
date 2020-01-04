/* global test, expect */

import React from 'react'
import { render, cleanup } from './test-utils'
import App from './App'

test('renders learn react link', async () => {
  const { queryAllByRole } = render(<App />)

  // Header
  const header = await queryAllByRole(/heading/gi)
  expect(header).toBeTruthy()

  cleanup()
})
