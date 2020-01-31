import { createAction, createReducer } from '@reduxjs/toolkit'
import { setList, getFilteredList } from './list'

export const setSelected = createAction('SET-COLOR')
export const clearSelected = createAction('CLEAR-COLOR')

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
 * Selector to return the color list from a filtered list ignoring the color parameter
 * @param {Object} state application state
 */
export const getColors = (state) => {
  const list = getFilteredList(state, { color: true })
  const colors = new Set()
  list.forEach(element => {
    element.colors.forEach(color => {
      colors.add(color)
    })
  })
  return [...colors]
}

export default selected
