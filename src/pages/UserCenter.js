import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import { Col, Button, InputGroup } from 'react-bootstrap'
import {
  FaTransgender,
  FaBirthdayCake,
  FaUserLock,
  FaUserEdit,
  FaCity,
} from 'react-icons/fa'
import { GiSmartphone, GiModernCity, GiHouse } from 'react-icons/gi'
import { GoMail } from 'react-icons/go'

import CityData from '../data/CityData'
import CityTownData from '../data/CityTownData'

function UserCenter() {
  const [loading, setLoading] = useState(true)
  const [validated, setValidated] = useState(false)

  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [sex, setSex] = useState('')
  const [birthday, setBirthday] = useState('')
  const [mail, setMail] = useState('')
  const [tel, setTel] = useState('')
  const [city, setCity] = useState('')
  const [cityOption, setCityOption] = useState([])
  const [town, setTown] = useState('')
  const [townOption, setTownOption] = useState([])
  const [zip, setZip] = useState('')
  const [address, setAddress] = useState('')

  // 一開始的地址陣列函式
  function setAddCTArr() {
    // 城市陣列 For初始下拉選單
    let arrCity = []
    for (let i in CityData) {
      arrCity.push(i)
    }
    setCityOption(arrCity)
    setCity(arrCity[0])

    // 鄉鎮陣列 For初始下拉選單
    let arrTown = []
    for (let i in CityTownData[arrCity[0]]) {
      arrTown.push(i)
    }
    setTownOption(arrTown)
  }

  // 讀取資料函式
  async function getDataFromServer() {
    const request = new Request('http://localhost:5555/user/1', {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })

    const response = await fetch(request)
    const data = await response.json()
    // console.log(data)
    setName(data.name)
    setUsername(data.username)
    setSex(data.sex)
    setBirthday(data.birthday)
    setTel(data.tel)
    setMail(data.mail)
    setCity(data.city)
    setTown(data.town)
    setZip(data.zip)
    setAddress(data.add)
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }

    setValidated(true)
  }

  // 一開始讀取資料
  // 當讀取資料時設置時停
  useEffect(() => {
    setAddCTArr()

    getDataFromServer()

    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [])

  useEffect(() => {
    // 當城市改變時改變鄉鎮陣列
    let arrTown = []
    for (let i in CityTownData[city]) {
      arrTown.push(i)
    }
    setTownOption(arrTown)
    setTown(arrTown[0])
  }, [city])

  // 當鄉鎮改變時改變郵遞區號
  // useEffect(() => {
  //   let arrZip = CityTownData[city][town]
  //   console.log(arrZip)
  //   setZip(arrZip)
  // }, [town])

  console.log('這是城市: ', city)
  console.log('這是鄉鎮: ', town)
  console.log('這是區號: ', zip)
  console.log(cityOption)
  console.log(townOption)

  const spinner = (
    <div className="d-flex justify-content-center">
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )

  const display = (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      {/* 第１行 */}
      <Form.Row>
        {/* 第１欄－帳號 */}
        <Form.Group as={Col} md="6" controlId="validationCustom02">
          <Form.Label>帳號</Form.Label>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroupUsername">
                <FaUserLock />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              disabled
              defaultValue={username}
              aria-describedby="inputGroupUsername"
            />
          </InputGroup>
        </Form.Group>

        {/* 第２欄－姓名 */}
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>姓名</Form.Label>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroupName">
                <FaUserEdit />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              required
              type="text"
              onChange={
                // 姓名輸入時及時改變
                (event) => {
                  setName(event.target.value)
                }
              }
              placeholder="請輸入姓名"
              value={name}
              aria-describedby="inputGroupName"
              maxLength="32"
            />
          </InputGroup>
          <Form.Control.Feedback type="invalid">
            沒有輸入姓名！
          </Form.Control.Feedback>
        </Form.Group>

        {/* 第３欄－性別 */}
        <Form.Group as={Col} md="2" controlId="validationCustomUsername">
          <Form.Label>性別</Form.Label>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroupSex">
                <FaTransgender />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              custom
              required
              as="select"
              onChange={
                // 性別輸入時及時改變
                (event) => {
                  setSex(event.target.value)
                }
              }
              value={sex}
              aria-describedby="inputGroupSex"
            >
              <option disabled>請選擇</option>
              <option>男</option>
              <option>女</option>
            </Form.Control>
          </InputGroup>
        </Form.Group>
      </Form.Row>

      {/* 第２行 */}
      <Form.Row>
        {/* 第１欄－生日 */}
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>生日</Form.Label>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroupBirthday">
                <FaBirthdayCake />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              required
              type="date"
              onChange={
                // 生日輸入時及時改變
                (event) => {
                  setBirthday(event.target.value)
                }
              }
              placeholder="請輸入生日"
              value={birthday}
              aria-describedby="inputGroupBirthday"
            />
            {/* <Form.Control.Feedback type="invalid">
              沒有輸入生日！
            </Form.Control.Feedback> */}
          </InputGroup>
        </Form.Group>

        {/* 第２欄－手機 */}
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>手機</Form.Label>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroupTel">
                <GiSmartphone />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              required
              type="tel"
              onChange={
                // 電話輸入時及時改變
                (event) => {
                  setTel(event.target.value)
                }
              }
              placeholder="請輸入手機號碼"
              value={tel}
              aria-describedby="inputGroupTel"
              pattern="09\d{2}-?\d{3}-?\d{3}"
            />
            {!tel ? (
              <Form.Control.Feedback type="invalid">
                沒有輸入號碼！
              </Form.Control.Feedback>
            ) : (
              <Form.Control.Feedback type="invalid">
                號碼格式輸入錯誤！
              </Form.Control.Feedback>
            )}
          </InputGroup>
        </Form.Group>

        {/* 第３欄－信箱 */}
        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          <Form.Label>信箱</Form.Label>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroupMail">
                <GoMail />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              required
              type="email"
              onChange={
                // 信箱輸入時及時改變
                (event) => {
                  setMail(event.target.value)
                }
              }
              value={mail}
              maxLength="256"
              aria-describedby="inputGroupMail"
              pattern="([a-zA-Z0-9_\.\-]+)@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+"
            />
            {!mail ? (
              <Form.Control.Feedback type="invalid">
                請輸入信箱！
              </Form.Control.Feedback>
            ) : (
              <Form.Control.Feedback type="invalid">
                您輸入的信箱格式錯誤！
              </Form.Control.Feedback>
            )}
          </InputGroup>
        </Form.Group>
      </Form.Row>

      {/* 第３行－地址 */}
      <Form.Row>
        {/* 第１欄－縣市 */}
        <Form.Group as={Col} md="2" controlId="validationCustom04">
          <Form.Label>縣市</Form.Label>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroupCity">
                <GiModernCity />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              custom
              required
              as="select"
              value={city}
              onChange={
                // 城市及時改變
                (event) => {
                  setCity(event.target.value)
                }
              }
              aria-describedby="inputGroupCity"
            >
              <option disabled>請選擇</option>
              {cityOption.map((obj, index) => {
                return <option key={index}>{obj}</option>
              })}
            </Form.Control>
          </InputGroup>
        </Form.Group>

        {/* 第２欄－鄉鎮 */}
        <Form.Group as={Col} md="2" controlId="validationCustom04">
          <Form.Label>鄉鎮</Form.Label>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroupTown">
                <FaCity />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              custom
              required
              as="select"
              value={town}
              onChange={
                // 鄉鎮及時改變
                (event) => {
                  // let lastestValue = town
                  // lastestValue = event.target.value
                  setTown(event.target.value)
                }
              }
              aria-describedby="inputGroupTown"
            >
              <option disabled>請選擇</option>
              {townOption.map((obj, index) => {
                return <option key={index}>{obj}</option>
              })}
            </Form.Control>
          </InputGroup>
        </Form.Group>

        {/* 第３欄－郵遞區號 */}
        <Form.Group as={Col} md="2" controlId="validationCustom05">
          <Form.Label>郵遞區號</Form.Label>
          <Form.Control
            required
            type="text"
            value={zip}
            onChange={
              // 郵遞區號輸入時及時改變
              (event) => {
                setZip(event.target.value)
              }
            }
            placeholder="請輸入"
            pattern="\d{3}"
          />
          {!zip ? (
            <Form.Control.Feedback type="invalid">
              請輸入郵遞區號！
            </Form.Control.Feedback>
          ) : (
            <Form.Control.Feedback type="invalid">
              郵遞區號格式輸入錯誤！
            </Form.Control.Feedback>
          )}
        </Form.Group>

        {/* 第４欄－位址 */}
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>地址</Form.Label>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroupAdd">
                <GiHouse />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              required
              type="text"
              defaultValue={address}
              onChange={
                // 地址輸入時及時改變
                (event) => {
                  setAddress(event.target.value)
                }
              }
              placeholder="請輸入地址"
              maxLength="128"
              aria-describedby="inputGroupAdd"
            />
            <Form.Control.Feedback type="invalid">
              沒有輸入地址！
            </Form.Control.Feedback>
          </InputGroup>
          <Form.Text id="inputGroupAdd" style={{ color: 'blue' }}>
            注意：如地址不正確將導致商品無法送達，請務必確認清楚！
          </Form.Text>
        </Form.Group>
      </Form.Row>

      <Form.Group>
        <Form.Check
          required
          label="Agree to terms and conditions"
          feedback="You must agree before submitting."
        />
      </Form.Group>
      <Button type="submit">Submit form</Button>
    </Form>
  )

  return <>{loading ? spinner : display}</>
}

export default UserCenter
