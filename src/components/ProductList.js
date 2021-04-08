import React from 'react'
import { Link } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

function ProductList() {
  return (
    <>
      {/* 品牌選單 */}
      <div className="mb-2 droplist">
        <DropdownButton
          id="dropdown-button-drop-right"
          size="lg"
          drop="right"
          variant="secondary"
          title="品牌"
        >
          {/* 增加品牌加入下方陣列 */}
          {['Apple', '三星', 'NIKE', '大同', 'LG'].map((brand, index) => (
            <Dropdown.Item
              as={Link}
              key={index}
              eventKey={index}
              to={
                brand === 'Apple' || brand === '三星'
                  ? `/products/3C/${brand}`
                  : brand === 'NIKE'
                  ? `/products/服裝/${brand}`
                  : `/products/家電/${brand}`
              }
            >
              {brand}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </div>

      {/* 類別選單 */}
      <div className="mb-2">
        <DropdownButton
          id="dropdown-button-drop-right"
          size="lg"
          drop="right"
          variant="secondary"
          title="類別"
        >
          {/* 增加類別加入下方陣列 */}
          {['3C', '家電', '書籍', '服裝', '家具'].map((type, index) => (
            <Dropdown.Item
              as={Link}
              key={index}
              eventKey={index}
              to={`/products/${type}`}
            >
              {type}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </div>
    </>
  )
}

export default ProductList
