import { createAction, createReducer, combineReducers } from '@reduxjs/toolkit'
import { setList } from '../list'

const setSelected = createAction('SET-TYPE')

const selected = createReducer(
  null,
  {
    [setList.RESET]: () => null,
    [setList.DONE]: () => null,
    [setSelected]: (state, payload) => {
      return payload
    }
  }
)

const list = createReducer(
  [],
  {
    [setList.RESET]: () => [],
    [setList.DONE]: (state, { payload }) => {
      // use transducers to filter repeated and map, puts the items to disabled o enabled but shows them all
      // This allows the user to see the full available options even when the selection filters some, giving a clue on how it works
      const brands = new Map()
      payload.forEach(element => {
        brands.set(element.brand, true)
      })
      return [...brands]
    }
  }
)

export default combineReducers({
  list,
  selected
})
