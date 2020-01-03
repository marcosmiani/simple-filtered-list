import {
  configureStore,
  combineReducers
} from '@reduxjs/toolkit'

import brands from './brands'
import colors from './colors'
import types from './types'
import list from './list'

const store = configureStore({
  reducer: combineReducers({
    brands,
    colors,
    types,
    list
  })
})

export default store
