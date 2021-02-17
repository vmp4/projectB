import React, { useState } from 'react'

function HelloWorldFunc(props) {
  const [inputText, setInputText] = useState('')
  return (
    <>
      <h1>函式元件:</h1>
      <input
        type="text"
        value={inputText}
        onChange={(event) => {
          setInputText(event.target.value)
        }}
      />
      <button
        onClick={() => {
          props.send(inputText)
        }}
      >
        送資料回App(父母元件)
      </button>
    </>
  )
}

export default HelloWorldFunc
