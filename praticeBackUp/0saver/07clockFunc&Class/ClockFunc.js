import React, { useEffect, useState } from 'react'

function ClockFunc(props) {
  const [date, setDate] = useState(new Date())

  // 取代componentDidMount 與 componentWillUnmount
  useEffect(() => {
    // componentDidMount要執行的部分
    let timerID = setInterval(() => tick(), 1000)

    // 回傳的函式裡是componentWillUnmount
    return function cleanup() {
      clearInterval(timerID)
    }
  })

  function tick() {
    setDate(new Date())
  }

  return (
    <>
      <div>
        <h2>{date.toLocaleTimeString()}</h2>
      </div>
    </>
  )
}

export default ClockFunc
