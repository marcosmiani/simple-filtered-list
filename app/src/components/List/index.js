import React from 'react'
import { connect } from 'react-redux'
import { getFilteredList, getList } from '../../state/list'
import styled from 'styled-components'
import { getAsyncProps } from 'resynchronize'
import { Button, Icon } from 'antd'

import Item from './Item'

const ListWrapper = styled.div`
  max-width: 100vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
`

const EventWrapper = styled.div`
  width: 100%;
  height: 100px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 16px;

  & button {
    margin: 8px;
  }
`

const connector = connect(
  state => ({
    items: getFilteredList(state),
    listStatus: getAsyncProps(state.list)
  })
)

export const List = ({ items = [], listStatus = {}, dispatch = () => {}, ...props }) => {
  const { status: { loading = true } = {}, error = null } = listStatus

  return (
    <ListWrapper role='list' {...props}>
      {!loading && items.map(item => (
        <Item key={item.id} {...item} />
      ))}
      {error && (
        <EventWrapper role='alert' title='error'>
          {error}
          <Button type='primary' size='large' shape='circle' title='Reload' onClick={() => dispatch(getList())}>
            <Icon type='rollback' />
          </Button>
        </EventWrapper>
      )}
      {loading && (
        <EventWrapper title='loading'>
          <Icon type='loading' style={{ fontSize: '40px' }} />
        </EventWrapper>
      )}
    </ListWrapper>
  )
}

export default connector(List)
