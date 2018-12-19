import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../Button/styles.scss';
import './styles.scss';

function LinkButton({ children, classes, ...otherProps }) {
  return (
    <Link {...otherProps}>
      <button className={`LinkButton Button Button_size_default Button_style_raised ${classes}`}>
        {children}
      </button>
    </Link>
  )
}

LinkButton.propTypes = {
  classes: PropTypes.string
}

LinkButton.defaultProps = {
  classes: ''
}

export default LinkButton;