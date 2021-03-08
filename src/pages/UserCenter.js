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

function UserCenter(props) {
  const id = props.id
  const [loading, setLoading] = useState(true)
  // 顯示打勾或是錯誤
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
    let firstCity = arrCity[0]
    // setCity(firstCity)

    // 鄉鎮陣列 For初始下拉選單
    let arrTown = []
    for (let i in CityTownData[firstCity]) {
      arrTown.push(i)
    }
    setTownOption(arrTown)
    // let firstTown = arrTown[0]
    // setTown(firstTown)

    // For初始郵遞區號
    // let firstZip = CityTownData[firstCity][firstTown]
    // setZip(firstZip)
  }

  // 讀取資料函式
  async function getDataFromServer() {
    const request = new Request('http://localhost:5555/user/' + id, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })

    const response = await fetch(request)
    const data = await response.json()

    setUserInfo({
      name: data.name,
      username: data.username,
      password: data.password,
      sex: data.sex,
      birthday: data.birthday,
      mail: data.mail,
      tel: data.tel,
      city: data.city,
      town: data.town,
      zip: data.zip,
      add: data.add,
    })
  }

  // 送出資料函式
  async function updateToServer() {
    setLoading(true)

    const request = new Request('http://localhost:5555/user/' + id, {
      method: 'PUT',
      body: JSON.stringify(userInfo),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })

    const response = await fetch(request)
    const data = await response.json()

    setTimeout(() => {
      setLoading(false)
      alert('儲存完成')
      props.setName(data.name)
      props.setSex(data.sex)

      // 將新的狀態存在localStorage以免重整後錯誤
      const local = JSON.parse(localStorage.getItem('logoUser'))
      const newLocal = local.map((obj) => {
        return { name: data.name, sex: data.sex, id: obj.id }
      })
      localStorage.setItem('logoUser', JSON.stringify(newLocal))

      setUserInfo({
        name: data.name,
        username: data.username,
        password: data.password,
        sex: data.sex,
        birthday: data.birthday,
        mail: data.mail,
        tel: data.tel,
        city: data.city,
        town: data.town,
        zip: data.zip,
        add: data.add,
      })
      setValidated(false)
    })
  }

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
      updateToServer()
    }

    setValidated(true)
  }

  // 一開始讀取資料 當讀取資料時設置時停
  useEffect(() => {
    setAddCTArr()

    getDataFromServer()

    setTimeout(() => {
      setLoading(false)
    }, 500)
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
        town: arrTown[0],
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
        <Form.Group as={Col} md="6" controlId="username">
          <Form.Label>帳號</Form.Label>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroupUsername">
                <FaUserLock />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              readOnly
              defaultValue={userInfo.username}
              aria-describedby="inputGroupUsername"
            />
          </InputGroup>
        </Form.Group>

        {/* 第２欄－姓名 */}
        <Form.Group as={Col} md="4" controlId="name">
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
              onChange={handleChange}
              placeholder="請輸入姓名"
              value={userInfo.name}
              aria-describedby="inputGroupName"
              maxLength="32"
            />
            <Form.Control.Feedback type="invalid">
              　　　　沒有輸入姓名！
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        {/* 第３欄－性別 */}
        <Form.Group as={Col} md="2" controlId="sex">
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
              onChange={handleChange}
              value={userInfo.sex}
              aria-describedby="inputGroupSex"
            >
              <option value="" disabled>
                請選擇
              </option>
              <option>男</option>
              <option>女</option>
            </Form.Control>
          </InputGroup>
        </Form.Group>
      </Form.Row>

      {/* 第２行 */}
      <Form.Row>
        {/* 第１欄－生日 */}
        <Form.Group as={Col} md="4" controlId="birthday">
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
              onChange={handleChange}
              placeholder="請輸入生日"
              value={userInfo.birthday}
              aria-describedby="inputGroupBirthday"
            />
            {/* <Form.Control.Feedback type="invalid">
              沒有輸入生日！
            </Form.Control.Feedback> */}
          </InputGroup>
        </Form.Group>

        {/* 第２欄－手機 */}
        <Form.Group as={Col} md="4" controlId="tel">
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
              onChange={handleChange}
              placeholder="請輸入手機號碼"
              value={userInfo.tel}
              aria-describedby="inputGroupTel"
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
          </InputGroup>
        </Form.Group>

        {/* 第３欄－信箱 */}
        <Form.Group as={Col} md="4" controlId="mail">
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
              onChange={handleChange}
              value={userInfo.mail}
              maxLength="256"
              aria-describedby="inputGroupMail"
              pattern="([a-zA-Z0-9_\.\-]+)@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+"
            />
            {!userInfo.mail ? (
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
        <Form.Group as={Col} md="2" controlId="city">
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
              value={userInfo.city}
              onChange={handleChange}
              aria-describedby="inputGroupCity"
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
          </InputGroup>
        </Form.Group>

        {/* 第２欄－鄉鎮 */}
        <Form.Group as={Col} md="2" controlId="town">
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
              value={userInfo.town}
              onChange={handleChange}
              aria-describedby="inputGroupTown"
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
          </InputGroup>
        </Form.Group>

        {/* 第３欄－郵遞區號 */}
        <Form.Group as={Col} md="2" controlId="zip">
          <Form.Label>郵遞區號</Form.Label>
          <Form.Control
            required
            type="text"
            value={userInfo.zip}
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

        {/* 第４欄－位址 */}
        <Form.Group as={Col} md="6" controlId="add">
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
              value={userInfo.add}
              onChange={handleChange}
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

      {/* <Form.Group>
        <Form.Check
          required
          label="Agree to terms and conditions"
          feedback="You must agree before submitting."
        />
      </Form.Group> */}
      <Button type="submit">確認更改</Button>
    </Form>
  )

  return <>{loading ? spinner : display}</>
}

export default UserCenter
