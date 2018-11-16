import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

function Button({ classes, children, onClick, dataTestId }) {
  return (
    <button
      className={`Button ${classes}`}
      type="submit"
      onClick={onClick}
      data-testid={dataTestId}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  classes: PropTypes.string,
  onClick: PropTypes.func,
  dataTestId: PropTypes.string,
}

Button.defaultProps = {
  classes: "",
  onClick: () => {},
  dataTestId: ""
}

export default Button;