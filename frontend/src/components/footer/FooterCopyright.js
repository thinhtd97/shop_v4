import React from 'react'
import { Link } from 'react-router-dom'

const FooterCopyright = ({ spaceBottomClass }) => {
  return (
    <div className={`copyright ${spaceBottomClass ? spaceBottomClass : ''}`}>
      <p>
        © 2020{' '}
        <Link
          to="//hasthemes.com"
          rel="noopener noreferrer"
          target="_blank"
        ></Link>
        .<br /> All Rights Reserved
      </p>
    </div>
  )
}

export default FooterCopyright
