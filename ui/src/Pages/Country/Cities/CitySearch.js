import React from 'react'
import { FaSearch } from 'react-icons/fa'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
} from 'reactstrap'

const CitySearch = ({ value, onChange }) => (
  <InputGroup>
    <InputGroupAddon addonType="prepend">
      <InputGroupText>
        <FaSearch />
      </InputGroupText>
    </InputGroupAddon>
    <Input
      placeholder="Search Cities"
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  </InputGroup>
)

export default CitySearch