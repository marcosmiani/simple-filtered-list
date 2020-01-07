
/* global describe, beforeEach, afterEach, test, expect */
import React from 'react'
import { render, cleanup } from '../../test-utils'
import { data } from '../../service'
import { List } from '.'

/**
 * TODO:
 * Happy scenario
 * Error scenario
 * Loading scenario
 */
describe('When the list is starting', () => {
  let renderedList = null

  beforeEach(() => {
    renderedList = render(<List listStatus={{ loading: true }} />)
  })

  afterEach(() => {
    cleanup()
  })

  test('has a list', async (done) => {
    const { getByRole } = renderedList

    const list = await getByRole('list')
    expect(list).toBeTruthy()

    done()
  })

  test('its loading', async (done) => {
    const { getByTitle } = renderedList

    const loading = await getByTitle(/loading/i)
    expect(loading).toBeTruthy()

    done()
  })
})

describe('When the has errors', () => {
  let renderedList = null

  beforeEach(() => {
    renderedList = render(<List listStatus={{ loading: false, error: true }} />)
  })

  afterEach(() => {
    cleanup()
  })

  test('has a list', async (done) => {
    const { getByRole } = renderedList

    const list = await getByRole('list')
    expect(list).toBeTruthy()

    done()
  })

  test('the error is visible with a reload button', async (done) => {
    const { getByTitle } = renderedList

    const error = await getByTitle(/error/i)
    expect(error).toBeTruthy()

    const reloadButton = await getByTitle(/Reload/i)
    expect(reloadButton).toBeTruthy()

    done()
  })
})

describe('When has items', () => {
  let renderedList = null

  beforeEach(() => {
    renderedList = render(<List listStatus={{ loading: false, error: false }} items={data} />)
  })

  afterEach(() => {
    cleanup()
  })

  test('has a list', async (done) => {
    const { getByRole } = renderedList

    const list = await getByRole('list')
    expect(list).toBeTruthy()

    done()
  })

  test('has list items', async (done) => {
    const { getAllByRole } = renderedList

    const listItems = await getAllByRole('listitem')
    expect(listItems).toHaveLength(12)

    done()
  })
})
