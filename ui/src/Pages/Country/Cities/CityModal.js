import React from 'react'
import { FaTimes, FaTrash, FaCheck } from 'react-icons/fa'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  Input,
  Label,
  FormGroup,
} from 'reactstrap'

class CityModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      city: null
    }
    this.changeField = this.changeField.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.city && this.props.city) this.setState({ city: this.props.city })
  }

  changeField(field, val) {
    this.setState({
      city: {
        ...this.state.city,
        [field]: val
      }
    })
  }

  render() {
    const { city } = this.state
    const { toggle, saveCity, deleteCity } = this.props

    return (
      <Modal isOpen={this.props.city ? true : false} toggle={toggle}>
        <ModalHeader>{this.props.city ? this.props.city.name || 'New City' : 'Edit City'}</ModalHeader>
        <ModalBody>
          {city ? (
            <Form>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="City Name"
                  value={city.name || ''}
                  onChange={e => this.changeField('name', e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="district">District</Label>
                <Input
                  type="text"
                  name="district"
                  id="district"
                  placeholder="City District"
                  value={city.district || ''}
                  onChange={e => this.changeField('district', e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="population">Population</Label>
                <Input
                  type="number"
                  name="population"
                  id="population"
                  placeholder="City Population"
                  value={city.population || ''}
                  onChange={e => this.changeField('population', e.target.value)}
                />
              </FormGroup>
            </Form>
          ) : null}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => saveCity(city)}><FaCheck/> Save</Button>
          {city && city.id ? <Button color="danger" onClick={() => deleteCity(city)}><FaTrash/> Delete</Button> : null}
          <Button color="secondary" onClick={toggle}><FaTimes/> Cancel</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default CityModal