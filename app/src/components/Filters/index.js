import React from 'react'
import { connect } from 'react-redux'
import { isLoading } from 'resynchronize'
import styled from 'styled-components'

import { getTypes, setSelected as setType, clearSelected as clearType } from '../../state/type'
import { getColors, setSelected as setColor, clearSelected as clearColor } from '../../state/color'
import { getBrands, setSelected as setBrand, clearSelected as clearBrand } from '../../state/brand'
import { clearSelected } from '../../state/store'

import { Select as AntdSelect, Button } from 'antd'

const { Option } = AntdSelect

const Wrapper = styled.div`
  width: 100%;
  padding: 0;
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
  display: flex;
  flex-direction: row;
  width: 100%;
  font-size: 16px;
  justify-content: space-between;
  align-items: flex-end;
  text-transform: capitalize;
`

const ClearAllButton = styled(Button)`
  margin-top: 16px;
  text-transform: uppercase;
`

const BasicSelect = ({ options, onChange, onClear, value, ...props }) => (
  <SelectWrapper>
    <Label htmlFor={props.name}>
      <span>{props.name}</span>
      {value && (
        <Button type='primary' size='small' onClick={onClear}>
          clear
        </Button>
      )}
    </Label>
    <Select
      {...props}
      value={value}
      onChange={onChange}
      showSearch
      size='large'
    >
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
    onChange: (option) => dispatch(setColor(option)),
    onClear: () => dispatch(clearColor())
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
    onChange: (option) => dispatch(setType(option)),
    onClear: () => dispatch(clearType())
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
    onChange: (option) => dispatch(setBrand(option)),
    onClear: () => dispatch(clearBrand())
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

      <ClearAllButton
        size='large'
        type='primary'
        icon='delete'
        onClick={() => dispatch(clearSelected())}
      >
        Clear all
      </ClearAllButton>
    </Wrapper>
  )
}

export default connect()(Filters)
