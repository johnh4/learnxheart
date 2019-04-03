import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { selectCourseByCourseIdProp } from '../../../selectors/courses';
import {
  selectEducatorNameByCourseIdProp
} from '../../../selectors/educators';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStickyNote } from '@fortawesome/free-regular-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import ListCard from '../../../components/ListCard';

export function CourseListItem({
  course,
  educatorName,
  dataTestId,
  classes,
  match
}) {
  const [deckCount, studentCount] = [5, 20];

  return (
    <ListCard
      classes={`CourseListItem ${classes}`}
      dataTestId={`course-list-item-${course.id}`}
    >
      <NavLink
        to={`/browse/courses/${course.id}`}
        className="CourseListItem__course-name"
      >
        {course.name}
      </NavLink>
      <div className="CourseListItem__details">
        <span className="CourseListItem__educator-name">
          {educatorName}
        </span>
        <span className="CourseListItem__spacer"></span>
        <div className="CourseListItem__stats">
          <div className="CourseListItem__stat-group">
            <span className="CourseListItem__stat-icon">
              <FontAwesomeIcon icon={faStickyNote} />
            </span>
            <span className="CourseListItem__stat-value">
              {deckCount}
            </span>
          </div>
          <div className="CourseListItem__stat-group">
            <span className="CourseListItem__stat-icon">
              <FontAwesomeIcon icon={faUser} />
            </span>
            <span className="CourseListItem__stat-value">
              {studentCount}
            </span>
          </div>
        </div>
      </div>
    </ListCard>
  )
}

CourseListItem.propTypes = {
  course: PropTypes.object,
  classes: PropTypes.string
}

CourseListItem.defaultProps = {
  course: {},
  classes: ''
}

const mapStateToProps = (state, ownProps) => ({
  course: selectCourseByCourseIdProp(state, ownProps),
  educatorName: selectEducatorNameByCourseIdProp(state, ownProps)
});

const WithRouter = withRouter(CourseListItem);
export default connect(mapStateToProps)(WithRouter);