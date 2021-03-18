import PropTypes from "prop-types";
import React from "react";
import { multilanguage } from "redux-multilanguage";
import { connect } from "react-redux";
import { changeCurrency } from "../../redux/actions/currencyActions";
import LanguageCurrencyChanger from "./sub-components/LanguageCurrencyChanger";
import { Link } from 'react-router-dom';

const HeaderTop = ({
  currency,
  changeCurrency,
  currentLanguageCode,
  dispatch,
  borderStyle
}) => {
  return (
    <div
      className={`header-top-wap ${
        borderStyle === "fluid-border" ? "border-bottom" : ""
      }`}
    >
      <LanguageCurrencyChanger
        currency={currency}
        changeCurrency={changeCurrency}
        currentLanguageCode={currentLanguageCode}
        dispatch={dispatch}
      />
      <div className="header-offer">
          <Link to="/login-register">Login / Register</Link>
      </div>
    </div>
  );
};

HeaderTop.propTypes = {
  borderStyle: PropTypes.string,
  changeCurrency: PropTypes.func,
  currency: PropTypes.object,
  currentLanguageCode: PropTypes.string,
  dispatch: PropTypes.func
};

const mapStateToProps = state => {
  return {
    currency: state.currencyData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeCurrency: currencyName => {
      dispatch(changeCurrency(currencyName));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(multilanguage(HeaderTop));
