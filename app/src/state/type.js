import { createAction, createReducer } from '@reduxjs/toolkit'
import { setList, filterList } from './list'

export const setSelected = createAction('SET-TYPE')

const selected = createReducer(
  null,
  {
    [setList.RESET]: () => null,
    [setList.DONE]: () => null,
    [setSelected]: (state, { payload }) => payload
  }
)

/**
 * Selector to return the type list from a filtered list ignoring the type parameter
 * @param {Object} state application state
 */
export const getTypes = (state) => {
  const list = filterList(state, { type: true })
  const types = new Set()
  list.forEach(element => {
    types.add(element.type)
  })
  return [...types]
}

export default selected
