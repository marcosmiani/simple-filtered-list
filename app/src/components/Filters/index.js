import React from 'react'
import { connect } from 'react-redux'
import { isLoading } from 'resynchronize'
import styled from 'styled-components'

import { getTypes, setSelected as setSelectedType } from '../../state/type'
import { getColors, setSelected as setSelectedColor } from '../../state/color'
import { getBrands, setSelected as setSelectedBrand } from '../../state/brand'
import { clearSelected } from '../../state/store'

import { Select as AntdSelect, Button as AntButton } from 'antd'

const { Option } = AntdSelect

const Wrapper = styled.div`
  width: 100%;
  padding: 16px 0;
  display: flex;
  flex-direction: column;
`

const SelectWrapper = styled.div`
  padding: 8px 0;
  display: flex;
  flex-direction: column;
`

const Select = styled(AntdSelect)`
  padding-top: 8px;
`

const Label = styled.label`
  color: white;
  text-transform: capitalize;
`

const Button = styled(AntButton)`
  margin-top: 16px;
  text-transform: uppercase;
`

const BasicSelect = ({ options, onChange, value, ...props }) => (
  <SelectWrapper>
    <Label htmlFor={props.name}>
      {props.name}
    </Label>
    <Select
      {...props}
      value={value}
      onChange={onChange}
      showSearch
      size='large'
    >
      <Option className='something' key='none' value={null}>- clear -</Option>
      {options.map(option => (
        <Option key={option} value={option}>{option}</Option>
      ))}
    </Select>
  </SelectWrapper>
)

const colorConnector = connect(
  state => ({
    name: 'color',
    value: state.color,
    loading: isLoading(state.list),
    options: getColors(state)
  }),
  dispatch => ({
    onChange: (option) => dispatch(setSelectedColor(option))
  })
)

const typeConnector = connect(
  state => ({
    name: 'type',
    value: state.type,
    loading: isLoading(state.list),
    options: getTypes(state)
  }),
  dispatch => ({
    onChange: (option) => dispatch(setSelectedType(option))
  })
)

const brandConnector = connect(
  state => ({
    name: 'brand',
    value: state.brand,
    loading: isLoading(state.list),
    options: getBrands(state)
  }),
  dispatch => ({
    onChange: (option) => dispatch(setSelectedBrand(option))
  })
)

const TypeSelect = typeConnector(BasicSelect)
const ColorSelect = colorConnector(BasicSelect)
const BrandSelect = brandConnector(BasicSelect)

const Filters = ({ dispatch }) => {
  return (
    <Wrapper>
      <TypeSelect />
      <ColorSelect />
      <BrandSelect />

      <Button size='large' type='primary' icon='delete' onClick={() => dispatch(clearSelected())}>
        Clear all
      </Button>
    </Wrapper>
  )
}

export default connect()(Filters)
