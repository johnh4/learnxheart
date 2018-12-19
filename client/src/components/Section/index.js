import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

function Section({
  headerText,
  headerItem,
  children,
  classes,
  dataTestId
}) {
  return (
    <section className={`Section ${classes}`} data-testid={dataTestId}>
      <div className="Section__header">
        <div className="Section__header-title">
         <span className="Section__header-brand"></span>
         <span className="Section__header-text">{headerText}</span>
        </div>
        <div className="Section__header-item">{headerItem}</div>
      </div>
      <div className="Section__content">
        {children}
      </div>
    </section>
  )
}

Section.propTypes = {
  headerText: PropTypes.string,
  headerItem: PropTypes.node,
  classes: PropTypes.string,
  dataTestId: PropTypes.string
}

Section.defaultProps = {
  headerText: '',
  headerItem: null,
  classes: '',
  dataTestId: ''
}

export default Section;
