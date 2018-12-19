import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import Card from '../../components/Card';

function DetailCard({ children, classes, dataTestId }) {
  return (
    <Card classes={`DetailCard ${classes}`} data-testid={dataTestId}>
      {children}
    </Card>
  )
}

DetailCard.propTypes = {
  classes: PropTypes.string,
  dataTestId: PropTypes.string
}

DetailCard.defaultProps = {
  classes: '',
  dataTestId: ''
}

export default DetailCard;
