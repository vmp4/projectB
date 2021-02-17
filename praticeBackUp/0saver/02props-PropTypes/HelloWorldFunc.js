import React from 'react'
import PropTypes from 'prop-types'

function HelloWorldFunc(props) {
  return (
    <>
      <h1>函式元件:</h1>
      <h2>父母傳了一個props給我: {props.text}</h2>
      <h2>這是預設props: {props.total}</h2>
    </>
  )
}

HelloWorldFunc.propTypes = {
  text: PropTypes.string.isRequired,
}
HelloWorldFunc.defaultProps = {
  total: 0,
}

export default HelloWorldFunc
