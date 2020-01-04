/* global describe, beforeEach, test, expect */
import {
  isLoading,
  isDone,
  getError,
  getPayload
} from 'resynchronize'

import { data } from '../service'
import Store from './store'
import { getList, setList, getFilteredList } from './list'
import { setSelected as setSelectedBrand, getBrands } from './brand'
import { setSelected as setSelectedColor, getColors } from './color'
import { setSelected as setSelectedType, getTypes } from './type'

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

describe('When data is fetch', () => {
  test('properly', (done) => {
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
      expect(getTypes(state)).toHaveLength(3)
      expect(getColors(state)).toHaveLength(8)
      expect(getBrands(state)).toHaveLength(12)
      // The selections are reseted
      expect(state.type).toBeFalsy()
      expect(state.color).toBeFalsy()
      expect(state.brand).toBeFalsy()
      done()
    })
  })

  test('reseted', () => {
    Store.dispatch(setList.RESET())
    const state = Store.getState()
    expect(isLoading(state.list)).toBeFalsy()
    expect(isDone(state.list)).toBeFalsy()
    expect(getError(state.list)).toBeFalsy()

    // The lists are not loaded
    expect(getTypes(state)).toHaveLength(0)
    expect(getColors(state)).toHaveLength(0)
    expect(getBrands(state)).toHaveLength(0)
    // The selections are reseted
    expect(state.type).toBeFalsy()
    expect(state.color).toBeFalsy()
    expect(state.brand).toBeFalsy()
  })

  test('with errors', (done) => {
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
      expect(getTypes(state)).toHaveLength(0)
      expect(getColors(state)).toHaveLength(0)
      expect(getBrands(state)).toHaveLength(0)
      // The selections are reseted
      expect(state.type).toBeFalsy()
      expect(state.color).toBeFalsy()
      expect(state.brand).toBeFalsy()
      done()
    })
  })
})

describe('When selections is made on', () => {
  beforeEach(() => {
    Store.dispatch(setList.DONE(data))
  })

  describe('types the value changes and the lists are filtered  to', () => {
    test('some values if the type exists', () => {
      Store.dispatch(setSelectedType('car'))
      const state = Store.getState()
      expect(state.type).toBe('car')
      // the lists are filtered
      expect(getFilteredList(state)).toHaveLength(4)
      expect(getBrands(state)).toHaveLength(4)
      expect(getColors(state)).toHaveLength(5)
      expect(getTypes(state)).toHaveLength(3)
    })
    test('no values if the type doesnt exists, except the type list (edge case with bad js usage)', () => {
      Store.dispatch(setSelectedType('spaceship'))
      const state = Store.getState()
      expect(state.type).toBe('spaceship')
      // the lists are filtered
      expect(getFilteredList(state)).toHaveLength(0)
      expect(getBrands(state)).toHaveLength(0)
      expect(getColors(state)).toHaveLength(0)
      expect(getTypes(state)).toHaveLength(3)
    })
  })

  describe('colors the value changes and the lists are filtered to', () => {
    test('some values if the color exists', () => {
      Store.dispatch(setSelectedColor('white'))
      const state = Store.getState()
      expect(state.color).toBe('white')
      // the list is filtered
      expect(getFilteredList(state)).toHaveLength(6)
      expect(getBrands(state)).toHaveLength(6)
      expect(getColors(state)).toHaveLength(8)
      expect(getTypes(state)).toHaveLength(3)
    })
    test('no values if the color doesnt exists, except the colors list (edge case with bad js usage)', () => {
      Store.dispatch(setSelectedColor('lavender'))
      const state = Store.getState()
      expect(state.color).toBe('lavender')
      // the list is filtered
      expect(getFilteredList(state)).toHaveLength(0)
      expect(getBrands(state)).toHaveLength(0)
      expect(getColors(state)).toHaveLength(8)
      expect(getTypes(state)).toHaveLength(0)
    })
  })

  describe('brands value changes and the lists are filtered to', () => {
    test('some values if the brand exists', () => {
      Store.dispatch(setSelectedBrand('Bugatti Veyron'))
      const state = Store.getState()
      expect(state.brand).toBe('Bugatti Veyron')

      // the list is filtered
      expect(getFilteredList(state)).toHaveLength(1)
      expect(getBrands(state)).toHaveLength(12)
      expect(getColors(state)).toHaveLength(2)
      expect(getTypes(state)).toHaveLength(1)
    })

    test('no values if the brand doesnt exists, except the brands list (edge case with bad js usage)', () => {
      Store.dispatch(setSelectedBrand('Renault Veyron'))
      const state = Store.getState()
      expect(state.brand).toBe('Renault Veyron')

      // the list is filtered
      expect(getFilteredList(state)).toHaveLength(0)
      expect(getBrands(state)).toHaveLength(12)
      expect(getColors(state)).toHaveLength(0)
      expect(getTypes(state)).toHaveLength(0)
    })
  })

  describe('different lists the values changes and the list is filtered to', () => {
    test('some values if the combination values exists', () => {
      Store.dispatch(setSelectedType('car'))
      Store.dispatch(setSelectedColor('black'))
      const state = Store.getState()
      expect(state.color).toBe('black')
      expect(state.type).toBe('car')
      // the list is filtered
      expect(getFilteredList(state)).toHaveLength(2)
      expect(getBrands(state)).toHaveLength(2)
      expect(getColors(state)).toHaveLength(5)
      expect(getTypes(state)).toHaveLength(3)
    })

    test('one value, except the color that because every item posses at least two', () => {
      Store.dispatch(setSelectedBrand('Porsche Carrera GT'))
      Store.dispatch(setSelectedColor('green'))
      Store.dispatch(setSelectedType('car'))
      const state = Store.getState()
      expect(state.color).toBe('green')
      expect(state.type).toBe('car')
      // the list is filtered
      expect(getFilteredList(state)).toHaveLength(1)
      expect(getBrands(state)).toHaveLength(1)
      expect(getColors(state)).toHaveLength(2)
      expect(getTypes(state)).toHaveLength(1)
    })

    test('no values if the combination of values doesnt exists (edge scenario)', () => {
      Store.dispatch(setSelectedBrand('Amer 4-4-0'))
      Store.dispatch(setSelectedColor('gray'))
      Store.dispatch(setSelectedType('car'))
      const state = Store.getState()
      expect(state.color).toBe('gray')
      expect(state.type).toBe('car')
      // the list is filtered
      expect(getFilteredList(state)).toHaveLength(0)
      expect(getBrands(state)).toHaveLength(0)
      expect(getColors(state)).toHaveLength(0)
      expect(getTypes(state)).toHaveLength(0)
    })
  })
})
