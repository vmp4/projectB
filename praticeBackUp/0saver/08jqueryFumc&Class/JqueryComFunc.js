import React, { useEffect, useState } from 'react'
import $ from 'jquery'

function JqueryComFunc(props) {
  const [messageHide, setMessageHide] = useState('動畫結束，隱藏')
  const [messageShow, setMessageShow] = useState('動畫結束，呈現')
  const [total, setTotal] = useState(0)

  useEffect(() => {
    $('#click').click(function () {
      $('#photo').hide('slow', function () {
        alert(messageHide)
        setTotal(555)
      })
    })
    $('#click2').click(function () {
      $('#photo').show('slow', function () {
        alert(messageShow)
        setTotal(777)
      })
    })
  }, [])

  return (
    <>
      <div>{total}</div>
      <div id="click">隱藏</div>
      <div id="click2">顯示</div>
      <img
        id="photo"
        src="https://images.chinatimes.com/newsphoto/2020-07-05/656/20200705002812.jpg"
        alt=""
        width="auto"
        height="auto"
      />
    </>
  )
}

export default JqueryComFunc
