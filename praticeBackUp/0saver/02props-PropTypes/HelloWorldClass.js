import React from 'react'
import PropTypes from 'prop-types'

class HelloWorldClass extends React.Component {
  constructor() {
    super()
    this.state = {}
  }
  render() {
    return (
      <>
        <h1>類別元件:</h1>
        <h2>父母傳了一個props給我: {this.props.text}</h2>
        <h2>這是預設props: {this.props.newArr}</h2>
      </>
    )
  }
}

HelloWorldClass.propTypes = {
  text: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
}
HelloWorldClass.defaultProps = {
  newArr: [1, 2],
}

export default HelloWorldClass
