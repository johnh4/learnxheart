import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './styles.scss';
import { connect } from 'react-redux';
import {
  selectCourseByCourseIdProp
} from '../../selectors/courses';
import {
  selectEducatorNameByCourseIdProp
} from '../../selectors/educators';
import {
  selectStudentIsFollowingCourse
} from '../../selectors/students';
import {
  createCourseStudentRelationshipRequest,
  destroyCourseStudentRelationshipRequest
} from '../../actions/courseStudentRelationships';
import {
  selectCsrIdFromCourseAndStudentIds
} from '../../selectors/courseStudentRelationships';
import { currentUser } from '../../selectors/sessions';
import DetailCard from '../../components/DetailCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStickyNote } from '@fortawesome/free-regular-svg-icons';
import { faUser, faPlus } from '@fortawesome/free-solid-svg-icons';

export function CourseDetail({
  course,
  educatorName,
  currentUser,
  createCourseStudentRelationshipRequest,
  destroyCourseStudentRelationshipRequest,
  courseStudentRelationshipId,
  following
}) {

  function handleFollow() {
    const csr = { courseId: course.id, studentId: currentUser.id }
    createCourseStudentRelationshipRequest(csr);
  }

  function handleUnfollow() {
    destroyCourseStudentRelationshipRequest(
      courseStudentRelationshipId
    );
  }

  function renderFollowButton() {
    return (
      <div
        className="CourseDetail__follow-button LightButton"
        onClick={handleFollow}
      >
        <FontAwesomeIcon icon={faPlus} className="LightButton__icon"/>
        <span className="LightButton__text">FOLLOW</span>
      </div>
    )
  }

  function renderUnfollowButton() {
    return (
      <div
        className="CourseDetail__follow-button LightButton"
        onClick={handleUnfollow}
      >
        <FontAwesomeIcon icon={faPlus} className="LightButton__icon"/>
        <span className="LightButton__text">FOLLOWING</span>
      </div>
    )
  }

  function renderCorrectButton() {
    if (following) {
      return renderUnfollowButton();
    } else {
      return renderFollowButton();
    }
  }

  return (
    <DetailCard
      classes="CourseDetail"
      dataTestId={`course-detail-${course.id}`}
    >
      <div className="CourseDetail__header">
        <div className="CourseDetail__educator-name">
          by <NavLink
            to={`/browse/educators/${course.educatorId}`}
            className="CourseListItem__course-name"
          >
            {educatorName}
          </NavLink>
        </div>
        {renderCorrectButton()}
      </div>
      <div className="Nameplate">
        <div className="CourseDetail__name DetailCard__name">
          {course.name}
        </div>
        <div className="Nameplate__stats">
          <div className="Nameplate__stat-group">
            <span className="Nameplate__stat-icon">
              <FontAwesomeIcon icon={faUser} className="CourseCard__icon"/>
            </span>
            <span className="Nameplate__stat-value">20</span>
            <span className="Nameplate__stat-label">Students</span>
          </div>
          <div className="Nameplate__stat-group">
            <span className="Nameplate__stat-icon">
              <FontAwesomeIcon icon={faStickyNote} className="CourseCard__icon"/>
            </span>
            <span className="Nameplate__stat-value">5</span>
            <span className="Nameplate__stat-label">Cards</span>
          </div>
        </div>
      </div>
      <div className="DetailCard__headline">Description</div>
      <div className="CourseDetail__description DetailCard__body-text">
        {course.description}
      </div>
      <div className="Card__divider"></div>
    </DetailCard>
  )
}

const mapStateToProps = (state, ownProps) => ({
  course: selectCourseByCourseIdProp(state, ownProps.match.params),
  currentUser: currentUser(state),
  educatorName: selectEducatorNameByCourseIdProp(
    state,
    ownProps.match.params
  ),
  courseStudentRelationshipId: selectCsrIdFromCourseAndStudentIds(
    state,
    ownProps.match.params
  ),
  following: selectStudentIsFollowingCourse(
    state,
    ownProps.match.params
  ),
});

const mapDispatchToProps = {
  createCourseStudentRelationshipRequest,
  destroyCourseStudentRelationshipRequest
}

CourseDetail.propTypes = {
  course: PropTypes.object,
  currentUser: PropTypes.object,
  educatorName: PropTypes.string,
  courseStudentRelationshipId: PropTypes.number,
  following: PropTypes.bool
}

CourseDetail.defaultProps = {
  course: {},
  currentUser: null,
  educatorName: '',
  following: false,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CourseDetail);