import React from 'react'
import styled, { keyframes } from 'styled-components'
import { connect } from 'react-redux'
import { isLoading } from 'resynchronize'

import logoImg from './logo.png'

const appear = keyframes`
  0% {
    filter: none;
    opacity: 1;
  }
  100% {
    filter: none;
    opacity: 1;
  }
`

const disappear = keyframes`
  0% {
    filter: none;
    opacity: 1;
  }
  100% {
    filter: blur(8px);
    opacity: 0.2;
  }
`

const ItemWrapper = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  opacity: ${({ loading }) => loading ? '1' : '.2'};
  filter: ${({ loading }) => loading ? 'none' : 'blur(8px)'};
  animation: 100ms ${({ loading }) => loading ? appear : disappear};
`

const Img = styled.img`
  width: 300px;

  @media (min-width: 800px) {
    width: 600px;
  }
`

const connector = connect(
  state => ({
    loading: isLoading(state.list) ? 'true' : undefined
  })
)

export const Logo = (props) => {
  return (
    <ItemWrapper title='logo!' {...props}>
      <Img
        alt='the app logo!'
        src={logoImg}
      />
    </ItemWrapper>
  )
}

export default connector(Logo)
