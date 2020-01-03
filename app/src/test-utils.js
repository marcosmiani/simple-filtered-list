// test-utils.js
import { render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import store from './state/store'

const AllTheProviders = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
