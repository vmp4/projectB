import React from 'react'

import HelloWorldFunc from './components/HelloWorldFunc'
import HelloWorldClass from './components/HelloWorldClass'
import HelloWorldText from './components/HelloWorldText'

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
        <HelloWorldText text={this.state.testNow} />
      </>
    )
  }
}

export default App
