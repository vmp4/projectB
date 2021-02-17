import React from 'react'

class SelectBox extends React.Component {
  constructor() {
    super()
    this.state = { value: '' }
  }
  handleChange = (e) => {
    this.setState({ value: e.target.value }, () => {
      console.log('setState保證已經完成更新: ', this.state.value)
    })
  }

  componentDidUpdate() {
    console.log('componentDidUpdate時(this.state.value)', this.state.value)
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
