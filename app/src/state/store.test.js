/* global test, expect */
import {
  isLoading,
  isDone,
  getError,
  getPayload
} from 'resynchronize'

import { data } from '../service'
import Store from './store'
import { getList, setList } from './list'

// @TODO move to a different file

const fetchDataCorrectly = () => new Promise((resolve) => {
  setTimeout(() => resolve(data), 1)
})

const fetchDataErroneously = () => new Promise((resolve, reject) => {
  const error = new Error('bad requesst')
  setTimeout(() => reject(error.message), 1)
})

/**
 * Initial fetch
 * Success case
 * Fail case
 * Test different parts of the final state
 * When user selects brand, color or types the other dependant states must be checked and clear if they are incorrect
 * Selectors
 */

test('The store when the data is fetch properly', (done) => {
  const promise = Store.dispatch(getList(fetchDataCorrectly))
  const state = Store.getState()

  // sets state to loading
  expect(isLoading(state.list)).toBeTruthy()

  // and finishes sets state correctly
  promise.then(() => {
    const state = Store.getState()
    // The status is done
    expect(isDone(state.list)).toBeTruthy()
    // The payload is set
    expect(getPayload(state.list)).toHaveLength(12)
    // The lists are loaded
    expect(state.types.list).toHaveLength(3)
    expect(state.colors.list).toHaveLength(8)
    expect(state.brands.list).toHaveLength(12)
    done()
  })
})

test('The store when the data is fetch with errors', (done) => {
  Store.dispatch(setList.RESET())
  const promise = Store.dispatch(getList(fetchDataErroneously))
  const state = Store.getState()

  // sets state to loading
  expect(isLoading(state.list)).toBeTruthy()

  // and finishes sets state incorrectly
  promise.then(() => {
    const state = Store.getState()
    // The status is error
    expect(getError(state.list)).toBeTruthy()
    // The lists are not loaded
    expect(state.types.list).toHaveLength(0)
    expect(state.colors.list).toHaveLength(0)
    expect(state.brands.list).toHaveLength(0)
    done()
  })
})
