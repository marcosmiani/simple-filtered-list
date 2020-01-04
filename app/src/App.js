import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { getList } from './state/list'

const Main = styled.div`
  text-align: center;
  background-color: #282c34;
  min-height: 100vh;

  & > header {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
  }
`

function App ({ dispatch }) {
  useEffect(() => {
    dispatch(getList())
  })

  return (
    <Main className='App'>
      <header role='heading'>
        The Traffic Meister
      </header>
    </Main>
  )
}

export default connect()(App)
