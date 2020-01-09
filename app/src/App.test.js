/* global test, expect */

import React from 'react'
import { render, cleanup } from './test-utils'
import App from './App'

test('Renders the main App components', async (done) => {
  const { getByRole } = render(<App />)

  // Header
  const header = await getByRole('heading')
  expect(header).toBeTruthy()

  // List
  const list = await getByRole('list')
  expect(list).toBeTruthy()

  cleanup()
  done()
})
