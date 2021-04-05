import React, { useState } from 'react'

const ShopPrice = ({ getFilterPriceParams }) => {
  const [clear, setClear] = useState(false)
  const clearOption = () => {
    getFilterPriceParams('filterPrice', '')
    setClear(false)
  }
  return (
    <div className="sidebar-widget mt-50">
      <h4 className="pro-sidebar-title">Price</h4>
      <div className="sidebar-widget-tag mt-25">
        {clear && (
          <span onClick={clearOption} className="clearOption">
            <i
              style={{ fontSize: '18px', marginRight: '6px' }}
              className="fa fa-angle-left"
            ></i>
            Clear
          </span>
        )}
        <ul>
          <li>
            <button
              onClick={() => {
                getFilterPriceParams('filterPrice', '')
              }}
            >
              All Price
            </button>
          </li>
          <br />
          <li>
            <button
              onClick={() => {
                getFilterPriceParams('filterPrice', '0to200')
                setClear(true)
              }}
            >
              From 0 To 200
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                getFilterPriceParams('filterPrice', '201to400')
                setClear(true)
              }}
            >
              From 201 To 400
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                getFilterPriceParams('filterPrice', '401to800')
                setClear(true)
              }}
            >
              From 401 To 800
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                getFilterPriceParams('filterPrice', '800tomax')
                setClear(true)
              }}
            >
              Over 800
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default ShopPrice
