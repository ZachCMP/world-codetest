import React from 'react'
import deepEqual from 'deep-equal'

class CachedData extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: props.data
    }
  }

  static getDerivedStateFromProps(props, state) {
    return !deepEqual(props.data, state.data) ? { data: props.data } : null
  }

  render() {
    if (this.state.data) return this.props.children(this.state.data)
    if (this.props.onNull) return this.props.onNull()
    return null
  }
}

export default CachedData