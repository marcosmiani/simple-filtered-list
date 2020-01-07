import React, { useState } from 'react'
import styled from 'styled-components'

const ItemWrapper = styled.div`
  width: auto;
  height: 220px;
  width: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: #282c34;
  margin: 8px;
  border-radius: 2px;

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
  width: 100%;
  background-color: white;
  color: gray;
  border-radius: 0;
  position: absolute;
  padding: 4px;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
`

const Colors = styled.div`
  background-color: white;
  display: inline-flex;
  flex-direction: row;
`

const Color = styled.div`
  width: 14px;
  height: 14px;
  background-color: ${({ color }) => color};
  border-radius: 7px;
  margin: 4px;
  border: 1px ${({ color }) => color === 'white' ? 'gray' : color} solid;
`

export const Item = ({ id, img, brand, colors }) => {
  const [image, setImage] = useState(true)
  return (
    <ItemWrapper role='listitem'>
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
        <Colors>
          {colors.map(color => (
            <Color key={color} color={color} />
          ))}
        </Colors>
      </Brand>
    </ItemWrapper>
  )
}

export default Item
