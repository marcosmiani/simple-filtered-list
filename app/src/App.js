import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import 'antd/dist/antd.css'
import styled from 'styled-components'

import { getList } from './state/list'

import Header from './components/Header'
import _List from './components/List'
import Filters from './components/Filters'
import Logo from './components/Logo'

const Main = styled.div`
  text-align: center;
  min-height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  font-family: 'Open sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #282c34;
`

const List = styled(_List)`
  width: 100%;
  padding: 8px;
  max-height: 100vh;
  padding: 50px 0;
`

function App ({ dispatch }) {
  useEffect(() => {
    dispatch(getList())
  })

  return (
    <Main className='App'>
      <Logo />
      <Header role='heading'>
        <Filters />
      </Header>
      <List />
    </Main>
  )
}

export default connect()(App)
