import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

export function Headline({ text, classes }) {
  return (
    <div className={`Headline ${classes}`}>
      {text}
    </div>
  )
}

Headline.propTypes = {
  text: PropTypes.string,
  classes: PropTypes.string
}

Headline.defaultProps = {
  text: "",
  classes: ""
}

export default Headline;