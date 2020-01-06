import React, { useState } from 'react'
import styled from 'styled-components'

const ItemWrapper = styled.div`
  width: auto;
  height: 200px;
  width: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: #282c34;
  margin: 8px;
  border-radius: 4px;
  border: 1px lightgray solid;

  @media (min-width: 800px) {
    height: 200px;
    width: 320px;
  }
`

const Img = styled.img`
  width: 100%;
  min-width: 120px;
`

const Brand = styled.div`
  width: auto;
  background-color: white;
  color: gray;
  border-radius: 2px;
  position: absolute;
  padding: 4px;
  bottom: 16px;
  right: 16px;
`

export const Item = ({ id, img, brand }) => {
  const [image, setImage] = useState(true)
  return (
    <ItemWrapper>
      {image && (
        <Img
          alt={`${id}`}
          src={img}
          onError={() => {
            setImage(false)
          }}
        />
      )}
      {!image && (
        <span>Sorry no image available</span>
      )}
      <Brand>
        {brand}
      </Brand>
    </ItemWrapper>
  )
}

export default Item
