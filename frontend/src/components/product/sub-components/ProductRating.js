import PropTypes from 'prop-types'
import React, { Fragment } from 'react'

const ProductRating = ({ value }) => {
  return (
    <Fragment>
      <i
        className={
          value >= 1
            ? 'fa fa-star yellow'
            : value >= 0.5
            ? 'fa fa-star-half-o yellow'
            : 'fa fa-star-o yellow'
        }
      ></i>
      <i
        className={
          value >= 2
            ? 'fa fa-star yellow'
            : value >= 1.5
            ? 'fa fa-star-half-o yellow'
            : 'fa fa-star-o yellow'
        }
      ></i>
      <i
        className={
          value >= 3
            ? 'fa fa-star yellow'
            : value >= 2.5
            ? 'fa fa-star-half-o yellow'
            : 'fa fa-star-o yellow'
        }
      ></i>
      <i
        className={
          value >= 4
            ? 'fa fa-star yellow'
            : value >= 3.5
            ? 'fa fa-star-half-o yellow'
            : 'fa fa-star-o yellow'
        }
      ></i>
      <i
        className={
          value >= 5
            ? 'fa fa-star yellow'
            : value >= 4.5
            ? 'fa fa-star-half-o yellow'
            : 'fa fa-star-o yellow'
        }
      ></i>
    </Fragment>
  )
}

ProductRating.propTypes = {
  value: PropTypes.number,
}

export default ProductRating
