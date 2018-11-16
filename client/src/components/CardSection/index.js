import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import NoticeCard from '../NoticeCard';

export function CardSection({
  entityIds,
  renderCard,
  emptyNotice,
  classes,
  dataTestId
}) {

  function renderCards() {
    return entityIds.map(renderCard);
  }

  function renderNotice() {
    if (emptyNotice) {
      return (
        <NoticeCard
          noticeText={emptyNotice.noticeText}
          linkPath={emptyNotice.linkPath}
          linkText={emptyNotice.linkText}
        />
      )
    } else {
      return null;
    }
  }

  return (
    <div className={`CardSection ${classes}`} data-testid={dataTestId}>
      <div className="CardSection__cards">
        { entityIds.length > 0
            ? renderCards()
            : renderNotice()
        }
      </div>
    </div>
  )
}

CardSection.propTypes = {
  entityIds: PropTypes.array,
  renderCard: PropTypes.func.isRequired,
  emptyNotice: PropTypes.shape({
    noticeText: PropTypes.string.isRequired,
    linkPath: PropTypes.string.isRequired,
    linkText: PropTypes.string.isRequired
  }),
  classes: PropTypes.string,
  dataTestId: PropTypes.string
}

CardSection.defaultProps = {
  entityIds: [],
  classes: "",
  dataTestId: "",
  emptyNotice: null
}

export default CardSection;
