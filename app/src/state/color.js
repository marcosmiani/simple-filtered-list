import { createAction, createReducer } from '@reduxjs/toolkit'
import { setList, filterList } from './list'

export const setSelected = createAction('SET-COLOR')

const selected = createReducer(
  null,
  {
    [setList.RESET]: () => null,
    [setList.DONE]: () => null,
    [setSelected]: (state, { payload }) => payload
  }
)

export const getColors = (state) => {
  const list = filterList(state, { color: true })
  const colors = new Set()
  list.forEach(element => {
    element.colors.forEach(color => {
      colors.add(color)
    })
  })
  return [...colors]
}

export default selected
