import React from 'react'
import { Button, Modal } from 'react-bootstrap'

function CheckModal(props) {
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">註冊成功</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>感謝您的註冊</h4>
          <p>
            您可以選擇返回首頁繼續瀏覽。<br></br>
            或是登入進行結帳。
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              props.onHide()
              props.history.push('/')
            }}
          >
            返回首頁
          </Button>
          <Button
            onClick={() => {
              props.onHide()
              props.history.push('/login')
            }}
          >
            登入
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default CheckModal
