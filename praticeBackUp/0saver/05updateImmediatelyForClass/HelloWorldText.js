import React from 'react'

function HelloWorldText(props) {
  return (
    <>
      <h1>從其他子女元件傳過來的資料: {props.text}</h1>
    </>
  )
}

export default HelloWorldText
