import PropTypes from 'prop-types'
import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductGridSingleTwo from '../../components/product/ProductGridSingleTwo'
import { listNewProductAction } from '../../redux/actions/productActions'
const ProductGridTwo = ({ sliderClassName, spaceBottomClass, category }) => {
  const dispatch = useDispatch()
  const { products } = useSelector((state) => state.listNewProduct)
  useEffect(() => {
    dispatch(listNewProductAction())
  }, [dispatch])

  return (
    <Fragment>
      {category === 'new' ? (
        <>
          {products &&
            products.map((product, key) => (
              <ProductGridSingleTwo
                key={key}
                sliderClassName={sliderClassName}
                spaceBottomClass={spaceBottomClass}
                product={product}
                category={category}
              />
            ))}
        </>
      ) : (
        ''
      )}
    </Fragment>
  )
}

ProductGridTwo.propTypes = {
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
}

export default ProductGridTwo
