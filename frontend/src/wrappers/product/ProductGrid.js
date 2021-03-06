import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import ProductGridSingle from '../../components/product/ProductGridSingle'

const ProductGrid = ({ category, sliderClassName, spaceBottomClass }) => {
  const { products } = useSelector((state) => state.listProduct)
  return (
    <Fragment>
      {products?.map((product, key) => (
        <ProductGridSingle
          key={key}
          sliderClassName={sliderClassName}
          spaceBottomClass={spaceBottomClass}
          product={product}
        />
      ))}
    </Fragment>
  )
}

export default ProductGrid
