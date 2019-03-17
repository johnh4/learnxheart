import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import {
  selectEducatorByEducatorIdProp
} from '../../../selectors/educators';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStickyNote } from '@fortawesome/free-regular-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import ListCard from '../../../components/ListCard';

export function EducatorListItem({
  educator,
  match
}) {
  const [deckCount, studentCount] = [5, 20];

  return (
    <ListCard classes="EducatorListItem" dataTestId={`educator-list-item-${educator.id}`} >
      <div className="EducatorListItem__details">
        <span className="EducatorListItem__educator-name">
          <NavLink
            to={`${match.url}/${educator.id}`}
            className="EducatorListItem__educator-name"
          >
            {`${educator.firstName} ${educator.lastName}`}
          </NavLink>
        </span>
        <span className="EducatorListItem__spacer"></span>
        <div className="EducatorListItem__stats">
          <div className="EducatorListItem__stat-group">
            <span className="EducatorListItem__stat-icon">
              <FontAwesomeIcon icon={faStickyNote} />
            </span>
            <span className="EducatorListItem__stat-value">
              {deckCount}
            </span>
          </div>
          <div className="EducatorListItem__stat-group">
            <span className="EducatorListItem__stat-icon">
              <FontAwesomeIcon icon={faUser} />
            </span>
            <span className="EducatorListItem__stat-value">
              {studentCount}
            </span>
          </div>
        </div>
      </div>
    </ListCard>
  )
}

EducatorListItem.propTypes = {
  educator: PropTypes.object,
}

EducatorListItem.defaultProps = {
  educator: {},
}

const mapStateToProps = (state, ownProps) => ({
  educator: selectEducatorByEducatorIdProp(state, ownProps)
});

const WithRouter = withRouter(EducatorListItem);
export default connect(mapStateToProps)(WithRouter);