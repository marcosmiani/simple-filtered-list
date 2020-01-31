import { createAction, createReducer } from '@reduxjs/toolkit'
import { setList, getFilteredList } from './list'

export const setSelected = createAction('SET-BRAND')
export const clearSelected = createAction('CLEAR-BRAND')

const selected = createReducer(
  null,
  {
    [setList.reset]: () => null,
    [setList.done]: () => null,
    [clearSelected]: () => null,
    [setSelected]: (state, { payload }) => payload
  }
)

/**
 * Selector to return the brand list from a filtered list ignoring the brand parameter
 * @param {Object} state application state
 */
export const getBrands = (state) => {
  const list = getFilteredList(state, { brand: true })
  const brands = new Set()
  list.forEach(element => {
    brands.add(element.brand)
  })
  return [...brands]
}

export default selected
