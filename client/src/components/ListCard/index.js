import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import Card from '../Card';

function ListCard({ classes, dataTestId, children }) {
  return (
    <Card classes={`ListCard ${classes}`} data-testid={dataTestId}>
      {children}
    </Card>
  )
}

ListCard.propTypes = {
  dataTestId: PropTypes.string,
  classes: PropTypes.string
}

ListCard.defaultProps = {
  dataTestId: '',
  classes: ''
}

export default ListCard;