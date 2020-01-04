import React from 'react'
import { connect } from 'react-redux'
import { getFilteredList } from '../../state/list'
import Item from './Item'

const connector = connect(
  state => ({
    items: getFilteredList(state)
  })
)

export const List = ({ items = [] }) => {
  return (
    <div>
      {items.map(item => (
        <Item key={item.id} {...item} />
      ))}
    </div>
  )
}

export default connector(List)
