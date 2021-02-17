import React from 'react'

class HelloWorldClass extends React.Component {
  constructor() {
    super()
    this.state = {
      inputText: '',
    }
  }
  render() {
    return (
      <>
        <h1>類別元件:</h1>
        <input
          type="text"
          value={this.state.inputText}
          onChange={(event) => {
            this.setState({ inputText: event.target.value })
          }}
        />
        <button
          onClick={() => {
            this.props.sendMe(this.state.inputText)
          }}
        >
          送資料回App(父母元件)
        </button>
      </>
    )
  }
}

export default HelloWorldClass
