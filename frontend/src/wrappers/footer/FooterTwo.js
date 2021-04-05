import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { animateScroll } from 'react-scroll'

const FooterTwo = ({
  backgroundColorClass,
  copyrightColorClass,
  spaceLeftClass,
  spaceRightClass,
  footerTopBackgroundColorClass,
  footerTopSpaceTopClass,
  footerTopSpaceBottomClass,
}) => {
  const [scroll, setScroll] = useState(0)
  const [top, setTop] = useState(0)

  useEffect(() => {
    setTop(100)
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    animateScroll.scrollToTop()
  }

  const handleScroll = () => {
    setScroll(window.scrollY)
  }
  return (
    <footer
      className={`footer-area ${
        backgroundColorClass ? backgroundColorClass : ''
      } ${spaceLeftClass ? spaceLeftClass : ''} ${
        spaceRightClass ? spaceRightClass : ''
      }`}
    >
      <div
        className={`footer-top text-center ${
          footerTopBackgroundColorClass ? footerTopBackgroundColorClass : ''
        } ${footerTopSpaceTopClass ? footerTopSpaceTopClass : ''}  ${
          footerTopSpaceBottomClass ? footerTopSpaceBottomClass : ''
        }`}
      >
        <div className="container">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim
          </p>
          <div className="footer-social">
            <ul>
              <li>
                <Link to="//www.facebook.com">
                  <i className="fa fa-facebook" />
                </Link>
              </li>
              <li>
                <Link to="//www.dribbble.com">
                  <i className="fa fa-dribbble" />
                </Link>
              </li>
              <li>
                <Link to="//www.pinterest.com">
                  <i className="fa fa-pinterest-p" />
                </Link>
              </li>
              <li>
                <Link to="//www.twitter.com">
                  <i className="fa fa-twitter" />
                </Link>
              </li>
              <li>
                <Link to="//www.linkedin.com">
                  <i className="fa fa-linkedin" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom text-center">
        <div className="container">
          <div
            className={`copyright-2 ${
              copyrightColorClass ? copyrightColorClass : ''
            }`}
          >
            <p>
              © 2020{' '}
              <Link
                to="//www.hasthemes.com"
                rel="noopener noreferrer"
                target="_blank"
              ></Link>
              . All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
      <button
        className={`scroll-top ${scroll > top ? 'show' : ''}`}
        onClick={() => scrollToTop()}
      >
        <i className="fa fa-angle-double-up"></i>
      </button>
    </footer>
  )
}

FooterTwo.propTypes = {
  backgroundColorClass: PropTypes.string,
  copyrightColorClass: PropTypes.string,
  footerLogo: PropTypes.string,
  footerTopBackgroundColorClass: PropTypes.string,
  footerTopSpaceBottomClass: PropTypes.string,
  footerTopSpaceTopClass: PropTypes.string,
  spaceLeftClass: PropTypes.string,
  spaceRightClass: PropTypes.string,
}

export default FooterTwo
