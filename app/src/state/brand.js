import { createAction, createReducer } from '@reduxjs/toolkit'
import { setList, filterList } from './list'

export const setSelected = createAction('SET-BRAND')

const selected = createReducer(
  null,
  {
    [setList.RESET]: () => null,
    [setList.DONE]: () => null,
    [setSelected]: (state, { payload }) => payload
  }
)

export const getBrands = (state) => {
  const list = filterList(state, { brand: true })
  const brands = new Set()
  list.forEach(element => {
    brands.add(element.brand)
  })
  return [...brands]
}

export default selected
