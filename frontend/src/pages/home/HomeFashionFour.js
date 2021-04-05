import React, { Fragment } from 'react'
import MetaTags from 'react-meta-tags'
import { useSelector } from 'react-redux'
import LayoutFive from '../../layouts/LayoutFive'
import HeroSliderTwelve from '../../wrappers/hero-slider/HeroSliderTwelve'
import NewsletterTwo from '../../wrappers/newsletter/NewsletterTwo'
import ProductGridFiveContainer from '../../wrappers/product/ProductGridFiveContainer'

const HomeFashionFour = () => {
  const { products, loading } = useSelector((state) => state.listProduct)
  return (
    <Fragment>
      <MetaTags>
        <title>Flone | Fashion Home</title>
        <meta
          name="description"
          content="Fashion home of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <LayoutFive>
        {/* hero slider */}
        <HeroSliderTwelve />
        {/* product grid */}
        
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {loading ? (
            <div
              style={{ margin: '60px' }}
              className="spinner-border"
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <ProductGridFiveContainer
              spaceTopClass="pt-100"
              spaceBottomClass="pb-100"
              category="accessories"
              products={products}
            />
          )}
        </div>

        {/* newsletter */}
        <NewsletterTwo spaceBottomClass="pb-100" />
      </LayoutFive>
    </Fragment>
  )
}

export default HomeFashionFour
