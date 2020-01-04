import React from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import { isLoading } from 'resynchronize'
import styled from 'styled-components'

import { getTypes, setSelected as setSelectedType } from '../../state/type'
import { getColors, setSelected as setSelectedColor } from '../../state/color'
import { getBrands, setSelected as setSelectedBrand } from '../../state/brand'

const Wrapper = styled.div`
  width: calc(100% - 16px);
  max-width: 300px;
  padding: 8px;

  & .basic-single {
    width: 100%;
    padding: 8px 0;
  }

  & .select__control {
    border-color: grey;
    border-radius: 2px;
  }
`

const SELECT_STYLES = {
  control: styles => ({
    ...styles,
    backgroundColor: 'white',
    ':active': {
      ...styles[':active'],
      outline: 'none'
    },
    '&:hover': { borderColor: 'grey' }
  }),
  option: (styles, { isDisabled, isSelected, isFocused }) => ({
    ...styles,
    border: 'none',
    padding: '6px',
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    color: 'black',
    backgroundColor: isSelected || isFocused ? 'rgba(40,40,40,.20)' : 'white',
    ':active': {
      ...styles[':active'],
      outline: 'none',
      backgroundColor: 'white'
    }
  })
}

const formatToSelect = value => ({ value, label: value })

const BasicSelect = ({ name, isLoading, value, options, onChange }) => (
  <Select
    className='basic-single'
    classNamePrefix='select'
    styles={SELECT_STYLES}
    isLoading={isLoading}
    isClearable
    isSearchable
    name={name}
    options={options}
    onChange={option => onChange(option ? option.value : null)}
    value={value ? formatToSelect(value) : undefined}
  />
)

const colorConnector = connect(
  state => ({
    name: 'color',
    value: state.color,
    isLoading: isLoading(state.list),
    options: getColors(state).map(formatToSelect)
  }),
  dispatch => ({
    onChange: (option) => dispatch(setSelectedColor(option))
  })
)

const typeConnector = connect(
  state => ({
    value: state.type,
    isLoading: isLoading(state.list),
    options: getTypes(state).map(formatToSelect)
  }),
  dispatch => ({
    onChange: (option) => dispatch(setSelectedType(option))
  })
)

const brandConnector = connect(
  state => ({
    value: state.brand,
    isLoading: isLoading(state.list),
    options: getBrands(state).map(formatToSelect)
  }),
  dispatch => ({
    onChange: (option) => dispatch(setSelectedBrand(option))
  })
)

const TypeSelect = typeConnector(BasicSelect)
const ColorSelect = colorConnector(BasicSelect)
const BrandSelect = brandConnector(BasicSelect)

const Filters = () => {
  return (
    <Wrapper>
      <TypeSelect />
      <ColorSelect />
      <BrandSelect />
    </Wrapper>
  )
}

export default Filters
