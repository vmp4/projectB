import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import Table from 'react-bootstrap/Table'
import { FaUserEdit, FaTrashAlt } from 'react-icons/fa'

function UserList() {
  const [usersList, setUsersList] = useState([])
  // const [userId, setUserId] = useState('')
  // const [name, setName] = useState('')
  // const [username, setUsername] = useState('')
  // const [password, setPassword] = useState('')
  // const [birthday, setBirthday] = useState('')
  // const [sex, setSex] = useState('')
  // const [mail, setMail] = useState('')
  // const [tel, setTel] = useState('')
  // const [add, setAdd] = useState('')
  const [loading, setLoading] = useState(false)

  async function getDataFromServer() {
    const request = new Request('http://localhost:5555/user', {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })

    const response = await fetch(request)
    const data = await response.json()
    setUsersList(data)
  }

  useEffect(() => {
    setLoading(true)
    getDataFromServer()
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [usersList])

  const spinner = (
    <>
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </>
  )

  const display = (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>暱稱</th>
          <th>姓名</th>
          <th>編輯/刪除</th>
        </tr>
      </thead>
      <tbody>
        {usersList.map((obj, index) => {
          return (
            <tr key={index}>
              <td>{obj.id}</td>
              <td>{obj.username}</td>
              <td>{obj.name}</td>
              <td>
                <Button variant="primary">
                  <FaUserEdit />
                  編輯
                </Button>{' '}
                <Button variant="danger">
                  <FaTrashAlt />
                  刪除
                </Button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  )

  return <>{loading ? spinner : display}</>
}

export default UserList
