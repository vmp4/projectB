import React from 'react'

class SelectBox extends React.Component {
  constructor() {
    super()
    this.state = { value: '' }
  }
  handleChange = (e) => {
    let lastValue = this.state.value
    lastValue = e.target.value
    console.log('before setState(this.state.value): ', this.state.value)
    console.log('before setState(lastValue): ', lastValue)
    this.setState({ value: lastValue })
    console.log('after setState(this.state.value): ', this.state.value)
    console.log('after setState(lastValue): ', lastValue)
  }
  render() {
    return (
      <>
        <div>
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="星期一" key={1}>
              星期一
            </option>
            <option value="星期三" key={2}>
              星期三
            </option>
            <option value="星期日" key={3}>
              星期日
            </option>
          </select>
        </div>
      </>
    )
  }
}

export default SelectBox
