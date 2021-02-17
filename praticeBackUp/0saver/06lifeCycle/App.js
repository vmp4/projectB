import React from 'react'

import LifeCycle from './components/LifeCycle'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      isShow: true,
    }
  }

  render() {
    let dispaly = <LifeCycle />
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
      </>
    )
  }
}

export default App
