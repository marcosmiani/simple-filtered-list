import React from 'react'
import { connect } from 'react-redux'
import { getFilteredList, getList } from '../../state/list'
import styled from 'styled-components'
import { getAsyncProps } from 'resynchronize'
import { Button, Icon } from 'antd'

import Item from './Item'

const ListWrapper = styled.div`
  max-height: 100vh;
  max-width: 100vw;
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const EventWrapper = styled.div`
  width: 100%;
  height: 100px;
  color: black;
`

const connector = connect(
  state => ({
    items: getFilteredList(state),
    listStatus: getAsyncProps(state.list)
  })
)

export const List = ({ items = [], listStatus, dispatch, ...props }) => {
  const { loading, error } = listStatus
  return (
    <ListWrapper {...props}>
      {!loading && items.map(item => (
        <Item key={item.id} {...item} />
      ))}
      {error && (
        <EventWrapper>
          {error}
          <Button type='primary' shape='circle' onClick={() => dispatch(getList())}>
            <Icon type='rollback' />
          </Button>
        </EventWrapper>
      )}
      {loading && (
        <EventWrapper>
          <Icon type='loading' />
        </EventWrapper>
      )}
    </ListWrapper>
  )
}

export default connector(List)
