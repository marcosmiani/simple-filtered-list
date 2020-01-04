import {
  createAsyncActions,
  createAsyncReducer,
  getPayload
} from 'resynchronize'

import trafficMeister from '../service'

export const setList = createAsyncActions('SET-LIST')

/**
 * Default Fetcher, returns the service data
 */
const fetchData = () => new Promise((resolve, reject) => {
  try {
    trafficMeister.fetchData((err, data) => {
      if (err) {
        console.warn(err)
        reject(err.message)
      } else {
        resolve(data)
      }
    })
  } catch (ex) {
    reject(ex.message)
  }
})

/**
 * Main thunk to set the main list
 * @param {Function} fetcher Fetcher function: it should return a promise when called
 */
export const getList = (fetcher = fetchData) => (dispatch) => {
  dispatch(setList.START())
  return fetcher()
    .then(data => dispatch(setList.DONE(data)))
    .catch(ex => dispatch(setList.ERROR(ex)))
}

/**
 * Selector to return a list of filtered items by the selected properties.
 * The properties are ordered from general to more specifics: Type, Colors, Brand
 * This affects the lists on general and how the filter behaves
 * @param {Object} state application state
 * @param {Object} skipOptions config object to skip filtering by one of the properties
 */
export const filterList = (state, skipOptions = {}) => {
  const list = getPayload(state.list) || []

  return list.filter(element =>
    (skipOptions.type || !state.type || element.type === state.type) &&
    (skipOptions.color || !state.color || element.colors.includes(state.color)) &&
    (skipOptions.brand || !state.brand || element.brand === state.brand)
  )
}

export default createAsyncReducer(
  setList,
  { reset: () => null }
)
