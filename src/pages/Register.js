import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import { Col, Button } from 'react-bootstrap'

import CityData from '../data/CityData'
import CityTownData from '../data/CityTownData'

function Register(props) {
  const [validated, setValidated] = useState(false)

  const [userInfo, setUserInfo] = useState({
    name: '',
    username: '',
    password: '',
    sex: '',
    birthday: '',
    mail: '',
    tel: '',
    city: '',
    town: '',
    zip: '',
    add: '',
  })
  const [cityOption, setCityOption] = useState([])
  const [cityTown, setCityTown] = useState({})
  const [townOption, setTownOption] = useState([])

  // 一開始的地址函式
  const setAddCTArr = () => {
    // 城市陣列 For初始下拉選單
    let arrCity = []
    for (let i in CityData) {
      arrCity.push(i)
    }
    setCityOption(arrCity)
  }

  // 確認帳號重複與否
  const checkUsername = (v) => {
    return props.userData.some((value) => {
      return v === value.username ? true : false
    })
  }

  // 設是否有帳號為true false
  const forUsername = checkUsername(userInfo.username)

  async function upNewDataToServer() {}

  // 資料輸入及時改變
  const handleChange = (e) => {
    const { id, value } = e.target
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [id]: value,
    }))
  }

  // 確認資料及送出
  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      upNewDataToServer()
    }

    setValidated(true)
  }

  // 一開始讀取鄉鎮資料
  useEffect(() => {
    setAddCTArr()
  }, [])

  // 當城市改變時改變鄉鎮陣列
  useEffect(() => {
    if (userInfo.city !== '') {
      let arrTown = []
      for (let i in CityTownData[userInfo.city]) {
        arrTown.push(i)
      }
      setTownOption(arrTown)
      setCityTown(CityTownData[userInfo.city])
      setUserInfo((userInfo) => ({
        ...userInfo,
        town: '',
        zip: '',
      }))
    }
  }, [userInfo.city])

  // 當鄉鎮改變時改變郵遞區號
  useEffect(() => {
    if (cityTown !== undefined && userInfo.town !== '') {
      let arrZip = cityTown[userInfo.town]
      setUserInfo((userInfo) => ({
        ...userInfo,
        zip: arrZip,
      }))
    }
  }, [cityTown, userInfo.town])

  // console.log(userInfo.sex)

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        {/* 第１行 */}
        <Form.Row>
          {/* 第１欄－帳號 */}
          <Form.Group as={Col} md="6" controlId="username">
            <Form.Label>帳號</Form.Label>
            <Form.Control
              required
              type="text"
              value={userInfo.username}
              title="請輸入最長64字元不含中文及特殊符號之英文數字"
              onChange={handleChange}
              placeholder="請輸入帳號"
              maxLength="64"
              pattern={forUsername ? '' : '[a-zA-z0-9]+'}
            />
            {!userInfo.username ? (
              <Form.Control.Feedback type="invalid">
                沒有輸入帳號！
              </Form.Control.Feedback>
            ) : forUsername ? (
              <Form.Control.Feedback type="invalid">
                此帳號已存在！
              </Form.Control.Feedback>
            ) : (
              <Form.Control.Feedback type="invalid">
                請勿輸入中文及特殊符號！
              </Form.Control.Feedback>
            )}
          </Form.Group>
        </Form.Row>

        {/* 第２行－密碼 */}
        <Form.Row></Form.Row>

        {/* 第３行－密碼 */}
        <Form.Row></Form.Row>

        {/* 第４行－姓名、性別 */}
        <Form.Row>
          {/* 第１欄－姓名 */}
          <Form.Group as={Col} md="4" controlId="name">
            <Form.Label>姓名</Form.Label>
            <Form.Control
              required
              type="text"
              value={userInfo.name}
              title="長度最長為32字元"
              onChange={handleChange}
              placeholder="請輸入姓名"
              maxLength="32"
            />
            <Form.Control.Feedback type="invalid">
              沒有輸入姓名！
            </Form.Control.Feedback>
          </Form.Group>

          {/* 第２欄－性別 */}
          <Form.Group as={Col} md="2" controlId="sex">
            <Form.Label>性別</Form.Label>
            <Form.Control
              custom
              required
              as="select"
              title="請選擇性別"
              onChange={handleChange}
              value={userInfo.sex}
            >
              <option value="" disabled>
                請選擇
              </option>
              <option value="男">男</option>
              <option value="女">女</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              請選擇性別！
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>

        {/* 第５行－生日、手機 */}
        <Form.Row>
          {/* 第１欄－生日 */}
          <Form.Group as={Col} md="3" controlId="birthday">
            <Form.Label>生日</Form.Label>
            <Form.Control
              required
              min="1850-01-01"
              max="2040-12-31"
              type="date"
              name="birthday"
              value={userInfo.birthday}
              title="請輸入生日"
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              沒有輸入生日！
            </Form.Control.Feedback>
          </Form.Group>

          {/* 第２欄－手機 */}
          <Form.Group as={Col} md="3" controlId="tel">
            <Form.Label>手機</Form.Label>
            <Form.Control
              required
              type="tel"
              value={userInfo.tel}
              title="請輸入正確號碼以便聯絡"
              onChange={handleChange}
              placeholder="請輸入手機號碼"
              pattern="09\d{2}-?\d{3}-?\d{3}"
            />
            {!userInfo.tel ? (
              <Form.Control.Feedback type="invalid">
                沒有輸入號碼！
              </Form.Control.Feedback>
            ) : (
              <Form.Control.Feedback type="invalid">
                號碼格式輸入錯誤！
              </Form.Control.Feedback>
            )}
          </Form.Group>
        </Form.Row>

        {/* 第６行－信箱 */}
        <Form.Row>
          {/* 第１欄－信箱 */}
          <Form.Group as={Col} md="6" controlId="mail">
            <Form.Label>信箱</Form.Label>
            <Form.Control
              required
              type="email"
              value={userInfo.mail}
              title="請輸入正確信箱以便驗證"
              onChange={handleChange}
              maxLength="256"
              placeholder="請輸入信箱"
              pattern="([a-zA-Z0-9_\.\-]+)@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+"
            />
            {!userInfo.mail ? (
              <Form.Control.Feedback type="invalid">
                請輸入信箱！
              </Form.Control.Feedback>
            ) : (
              <Form.Control.Feedback type="invalid">
                輸入的信箱格式錯誤！
              </Form.Control.Feedback>
            )}
          </Form.Group>
        </Form.Row>

        {/* 第７行－縣市、鄉鎮、郵遞區號 */}
        <Form.Row>
          {/* 第１欄－縣市 */}
          <Form.Group as={Col} md="2" controlId="city">
            <Form.Label>縣市</Form.Label>
            <Form.Control
              custom
              required
              as="select"
              value={userInfo.city}
              title="請選擇縣市"
              onChange={handleChange}
            >
              <option value="" disabled>
                請選擇
              </option>
              {cityOption.map((obj, index) => {
                return (
                  <option value={obj} key={index}>
                    {obj}
                  </option>
                )
              })}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              請選擇縣市！
            </Form.Control.Feedback>
          </Form.Group>

          {/* 第２欄－鄉鎮 */}
          <Form.Group as={Col} md="2" controlId="town">
            <Form.Label>鄉鎮</Form.Label>
            <Form.Control
              custom
              required
              as="select"
              value={userInfo.town}
              title="請選擇鄉鎮"
              onChange={handleChange}
            >
              <option value="" disabled>
                請選擇
              </option>
              {townOption.map((obj, index) => {
                return (
                  <option value={obj} key={index}>
                    {obj}
                  </option>
                )
              })}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              請選擇鄉鎮！
            </Form.Control.Feedback>
          </Form.Group>

          {/* 第３欄－郵遞區號 */}
          <Form.Group as={Col} md="2" controlId="zip">
            <Form.Label>郵遞區號</Form.Label>
            <Form.Control
              required
              type="text"
              value={userInfo.zip}
              title="請確認"
              onChange={handleChange}
              placeholder="請輸入"
              pattern="\d{3}"
            />
            {!userInfo.zip ? (
              <Form.Control.Feedback type="invalid">
                請輸入郵遞區號！
              </Form.Control.Feedback>
            ) : (
              <Form.Control.Feedback type="invalid">
                郵遞區號格式輸入錯誤！
              </Form.Control.Feedback>
            )}
          </Form.Group>
        </Form.Row>

        {/* 第８行－地址 */}
        <Form.Row>
          {/* 第１欄－位址 */}
          <Form.Group as={Col} md="6" controlId="add">
            <Form.Label>地址</Form.Label>
            <Form.Control
              required
              type="text"
              value={userInfo.add}
              title="請輸入方便收件地址"
              onChange={handleChange}
              placeholder="請輸入地址"
              aria-describedby="inputGroupAdd"
              maxLength="128"
            />
            <Form.Control.Feedback type="invalid">
              沒有輸入地址！
            </Form.Control.Feedback>
            <Form.Text id="inputGroupAdd" style={{ color: 'blue' }}>
              注意：如地址不正確將導致商品無法送達，請務必確認清楚！
            </Form.Text>
          </Form.Group>
        </Form.Row>

        <Form.Group>
          <Form.Check
            required
            label="我同意用戶條款"
            feedback="您必須同意才能註冊"
          />
        </Form.Group>
        <Button type="submit">確認註冊</Button>
      </Form>
    </>
  )
}

export default Register
