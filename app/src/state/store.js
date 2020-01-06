import {
  configureStore,
  combineReducers
} from '@reduxjs/toolkit'

import brand, { clearSelected as clearBrand } from './brand'
import color, { clearSelected as clearColor } from './color'
import typeReducer, { clearSelected as clearType } from './type'
import list from './list'

export const clearSelected = () => dispatch => {
  dispatch(clearBrand())
  dispatch(clearColor())
  dispatch(clearType())
}

const store = configureStore({
  reducer: combineReducers({
    brand,
    color,
    type: typeReducer,
    list
  })
})

export default store
