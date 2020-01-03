import { createAction, createReducer, combineReducers } from '@reduxjs/toolkit'
import { requestList } from '../list'

const setSelected = createAction('SET-TYPE')

const selected = createReducer(
  null,
  {
    [setSelected]: (state, payload) => {
      return payload
    }
  }
)

const list = createReducer(
  null,
  {
    [requestList.DONE]: (state, { payload }) => {
      // use transducers to filter repeated and map, puts the items to disabled o enabled but shows them all
      // This allows the user to see the full available options even when the selection filters some, giving a clue on how it works
      return payload
    }
  }
)

export default combineReducers({
  list,
  selected
})
