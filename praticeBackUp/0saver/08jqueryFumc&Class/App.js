import React from 'react'

// import LifeCycle from './components/LifeCycle'
// import LifeCycleFunc from './components/LifeCycleFunc'
import JqueryComClass from './components/JqueryComClass'
import JqueryComFunc from './components/JqueryComFunc'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      isShow: true,
    }
  }

  render() {
    return (
      <>
        <JqueryComClass />
        <JqueryComFunc />
      </>
    )
  }
}

export default App
