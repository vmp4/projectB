import React from 'react'

import SelectBox from './components/SelectBox'
import Clock from './components/Clock'
import ClockFunc from './components/ClockFunc'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      isShow: true,
    }
  }

  render() {
    let dispaly = <SelectBox />
    return (
      <>
        {this.state.isShow ? dispaly : <h1>已消失</h1>}
        <button
          onClick={() => {
            this.setState({ isShow: !this.state.isShow })
          }}
        >
          {this.state.isShow ? 'GoodBye~' : 'Comeback~'}
        </button>
        <button
          onClick={() => {
            this.setState({ isShow: true })
          }}
        >
          ComeBack~
        </button>
        <Clock />
        <ClockFunc />
      </>
    )
  }
}

export default App
