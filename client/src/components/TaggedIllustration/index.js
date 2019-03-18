import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

export default function TaggedIllustration({
  tag,
  children,
  classes
}) {
  return (
    <div className={`TaggedIllustration ${classes}`}>
      <div className="TaggedIllustration__main-container">
        {children}
      </div>
      <img src={tag} className="TaggedIllustration__tag" alt={"Tag"} />
    </div>
  )
}

TaggedIllustration.propTypes = {
  tag: PropTypes.any.isRequired,
  children: PropTypes.node,
  classes: PropTypes.string
}

TaggedIllustration.defaultProps = {
  classes: ''
}