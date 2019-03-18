import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

function Card({ size, children, classes, dataTestId, ...otherProps }) {
  return (
    <div className={`Card ${classes}`} data-testid={dataTestId} {...otherProps}>
      {children}
    </div>
  );
}

Card.propTypes = {
  size: PropTypes.oneOf(["s", "m"]),
  classes: PropTypes.string,
  dataTestId: PropTypes.string
}

Card.defaultProps = {
  size: "m",
  classes: "",
  dataTestId: ""
}

export default Card;