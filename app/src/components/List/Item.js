import React from 'react'
import styled from 'styled-components'

const Img = styled.img`
  width: 100vw;
  max-width: 320px;
  min-height: 120px;
`

export const Item = ({ id, img }) => {
  return (
    <div>
      <Img alt={`${id}`} src={img} />
    </div>
  )
}

export default Item
