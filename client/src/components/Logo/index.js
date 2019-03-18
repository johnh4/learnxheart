import React from 'react';
import PropTypes from 'prop-types';
import logo from '../../images/logo.svg';
import './styles.scss';

function Logo({ classes }) {
  return (
    <div className={`Logo Header__logo ${classes}`}>
      <img src={logo} className="Logo__image" alt="logo" />
      <div className="Logo__text">
        <div className="Logo__top">
          <div className="Logo__learn">Learn</div>
          <div className="Logo__by">by</div>
        </div>
        <div className="Logo__heart">Heart</div>
      </div>
    </div>
  )
}

Logo.propTypes = {
  classes: PropTypes.string
}

Logo.defaultProps = {
  classes: ''
}

export default Logo;