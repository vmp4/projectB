import React from 'react'
import $ from 'jquery'

class JqueryComClass extends React.Component {
  constructor() {
    super()
    this.state = {
      messageHide: '動畫結束，隱藏',
      messageShow: '動畫結束，呈現',
      total: 0,
    }
  }

  componentDidMount() {
    const messageHide = this.state.messageHide
    const messageShow = this.state.messageShow
    const changeState = (value) => {
      this.setState({ total: value })
    }
    // jquery的程式碼需要寫在這裡，確保dom元素已經出現在網頁上
    $('#clickme').click(function () {
      $('#book').hide('slow', function () {
        alert(messageHide)
        changeState(555)
      })
    })
    $('#clickme2').click(function () {
      $('#book').show('slow', function () {
        alert(messageShow)
        changeState(777)
      })
    })
  }

  render() {
    return (
      <>
        <div>{this.state.total}</div>
        <div id="clickme">點我隱藏</div>
        <div id="clickme2">點我呈現</div>
        <img
          id="book"
          src="https://images.chinatimes.com/newsphoto/2020-07-05/656/20200705002812.jpg"
          alt=""
          width="auto"
          height="auto"
        />
      </>
    )
  }
}
export default JqueryComClass
