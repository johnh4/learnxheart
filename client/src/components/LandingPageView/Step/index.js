import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';


export default function Step({
  number,
  stepText,
  headline,
  subheadline,
  illustration,
  alt,
  classes
}) {
  const alternate = number % 2 === 0;

  return (
    <div className={`Step ${alternate ? 'Step__alternate' : ''} ${classes}`}>
      <div className={`Step__content ${alternate ? 'Step__alternate' : ''}`}>
        <img src={illustration} className="Step__illustration Step__section" alt={alt} />
        <div className="Step__copy Step__section">
          <div className="Step__topline">
            <span className="Step__circle">
              <div className="Step__number">{number}</div>
            </span>
            <span className="Step__stepText">{stepText}</span>
          </div>
          <div className="Step__headline">
            {headline}
          </div>
          <div className="Step__subheadline">
            {subheadline}
          </div>
        </div>
      </div>
    </div>
  )
}

Step.propTypes = {
  number: PropTypes.number,
  stepText: PropTypes.string,
  headline: PropTypes.string,
  subheadline: PropTypes.string,
  reverse: PropTypes.bool,
  illustration: PropTypes.any,
  alt: PropTypes.string,
  classes: PropTypes.string
}

Step.defaultProps = {
  number: 0,
  stepText: '',
  headline: '',
  subheadline: '',
  reverse: false,
  alt: '',
  classes: ''
}
