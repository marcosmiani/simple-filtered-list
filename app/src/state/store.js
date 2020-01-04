import {
  configureStore,
  combineReducers
} from '@reduxjs/toolkit'

import brand from './brand'
import color from './color'
import typeReducer from './type'
import list from './list'

const store = configureStore({
  reducer: combineReducers({
    brand,
    color,
    type: typeReducer,
    list
  })
})

export default store
