import React from 'react'

import HelloWorldFunc from './components/HelloWorldFunc'
import HelloWorldClass from './components/HelloWorldClass'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      testNow: '',
    }
  }

  sendDataToMe = (value) => {
    this.setState({ testNow: value })
  }

  render() {
    return (
      <>
        <HelloWorldClass sendMe={this.sendDataToMe} />
        <HelloWorldFunc send={this.sendDataToMe} />
      </>
    )
  }
}

export default App
