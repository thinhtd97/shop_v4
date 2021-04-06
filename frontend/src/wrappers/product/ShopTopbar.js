import PropTypes from "prop-types";
import React, { Fragment } from "react";
import ShopTopAction from "../../components/product/ShopTopAction";

const ShopTopbar = ({
  getLayout,
  getFilterSortParams,
  getDiscountFilterParams
}) => {
  return (
    <Fragment>
      {/* shop top action */}
      <ShopTopAction
        getFilterSortParams={getFilterSortParams}
        getLayout={getLayout}
        getDiscountFilterParams={getDiscountFilterParams}
      />
      
    </Fragment>
  );
};

ShopTopbar.propTypes = {
  getFilterSortParams: PropTypes.func,
  getLayout: PropTypes.func,
  productCount: PropTypes.number,
  sortedProductCount: PropTypes.number
};

export default ShopTopbar;
