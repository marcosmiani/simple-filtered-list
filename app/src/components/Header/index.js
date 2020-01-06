import React, { useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Drawer as AntDrawer, Button as AntButton, Badge, Icon } from 'antd'

import { getFilteredList } from '../../state/list'

const Header = styled.header`
  background-color: transparent;
`

const Drawer = styled(AntDrawer)`
  & .ant-drawer-content {
    background-color: #282c34;
  }

  & .ant-drawer-body {
    padding: 8px;
  }
`

const Button = styled(AntButton)`
  position: fixed;
  top: 8px;
  left: 8px;
  color: white;
  z-index: 1;
`

const connector = connect(
  state => ({
    count: getFilteredList(state).length
  })
)

export default connector(({ children, count, ...props }) => {
  const [drawer, setDrawer] = useState(false)

  return (
    <Header {...props}>
      <Button type='primary' size='large' shape='circle' onClick={() => setDrawer(true)}>
        <Badge count={count} offset={[8, -4]}>
          <Icon type='filter' />
        </Badge>
      </Button>
      <Drawer
        placement='left'
        closable={false}
        visible={drawer}
        onClose={() => setDrawer(false)}
      >
        {children}
      </Drawer>
    </Header>
  )
})
