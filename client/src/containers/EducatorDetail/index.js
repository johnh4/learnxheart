import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import { connect } from 'react-redux';
import {
  selectEducatorByEducatorIdProp
} from '../../selectors/educators';
import {
  selectCourseIdsByEducatorIdProp
} from '../../selectors/courses';
import {
  selectStudentIsFollowingEducator
} from '../../selectors/students';
import {
  createEducatorStudentRelationshipRequest,
  destroyEducatorStudentRelationshipRequest
} from '../../actions/educatorStudentRelationships';
import {
  selectEsrIdFromEducatorAndStudentIds
} from '../../selectors/educatorStudentRelationships';
import { loadEducatorRequest } from '../../actions/educators';
import { currentUser } from '../../selectors/sessions';
import DetailCard from '../../components/DetailCard';
import CourseListItem from '../../containers/BrowseCourses/CourseListItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStickyNote } from '@fortawesome/free-regular-svg-icons';
import { faUser, faPlus } from '@fortawesome/free-solid-svg-icons';

export function EducatorDetail({
  educator,
  courseIds,
  loadEducatorRequest,
  currentUser,
  createEducatorStudentRelationshipRequest,
  destroyEducatorStudentRelationshipRequest,
  educatorStudentRelationshipId,
  following,
  match: { params: { educatorId } }
}) {

  useEffect(() => {
    loadEducatorRequest(educatorId);
  }, [educatorId]);

  function handleFollow() {
    const esr = { educatorId: educator.id, studentId: currentUser.id }
    createEducatorStudentRelationshipRequest(esr);
  }

  function handleUnfollow() {
    destroyEducatorStudentRelationshipRequest(
      educatorStudentRelationshipId
    );
  }

  function renderFollowButton() {
    return (
      <div
        className="EducatorDetail__follow-button LightButton"
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
        className="EducatorDetail__follow-button LightButton"
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


  const educatorName = `${educator.firstName} ${educator.lastName}`;

  return (
    <DetailCard
      classes="EducatorDetail"
      dataTestId={`educator-detail-${educator.id}`}
    >
      <div className="EducatorDetail__header">
        <div></div>
        {renderCorrectButton()}
      </div>
      <div className="Nameplate">
        <div className="EducatorDetail__name DetailCard__name">
          {educatorName}
        </div>
        <div className="Nameplate__stats">
          <div className="Nameplate__stat-group">
            <span className="Nameplate__stat-icon">
              <FontAwesomeIcon icon={faUser} className="EducatorCard__icon"/>
            </span>
            <span className="Nameplate__stat-value">20</span>
            <span className="Nameplate__stat-label">Students</span>
          </div>
          <div className="Nameplate__stat-group">
            <span className="Nameplate__stat-icon">
              <FontAwesomeIcon icon={faStickyNote} className="EducatorCard__icon"/>
            </span>
            <span className="Nameplate__stat-value">5</span>
            <span className="Nameplate__stat-label">Cards</span>
          </div>
        </div>
      </div>
      <div className="DetailCard__section">
        <div className="DetailCard__headline">Bio</div>
        <div className="EducatorDetail__description DetailCard__body-text">
          I love to teach. I especially love to teach philosophy, because it enables people to treat each other better.
        </div>
      </div>
      {courseIds.length > 0 &&
        <div className="DetailCard__section">
          <div className="DetailCard__headline">Courses</div>
          <div className="EducatorDetail__course-items">
            {courseIds.map(courseId => (
              <CourseListItem
                courseId={courseId}
                key={courseId}
                classes="EducatorDetail__course-list-item"
              />
            ))}
          </div>
        </div>
      }
    </DetailCard>
  )
}

const mapStateToProps = (state, ownProps) => ({
  educator: selectEducatorByEducatorIdProp(state, ownProps.match.params),
  courseIds: selectCourseIdsByEducatorIdProp(state, ownProps.match.params),
  currentUser: currentUser(state),
  educatorStudentRelationshipId: selectEsrIdFromEducatorAndStudentIds(
    state,
    ownProps.match.params
  ),
  following: selectStudentIsFollowingEducator(
    state,
    ownProps.match.params
  ),
});

const mapDispatchToProps = {
  createEducatorStudentRelationshipRequest,
  destroyEducatorStudentRelationshipRequest,
  loadEducatorRequest
}

EducatorDetail.propTypes = {
  educator: PropTypes.object,
  courseIds: PropTypes.arrayOf(PropTypes.number),
  currentUser: PropTypes.object,
  loadEducatorRequest: PropTypes.func,
  educatorStudentRelationshipId: PropTypes.number,
  following: PropTypes.bool
}

EducatorDetail.defaultProps = {
  educator: {},
  courseIds: [],
  currentUser: null,
  loadEducatorRequest: () => {},
  createEducatorStudentRelationshipRequest: () => {},
  destroyEducatorStudentRelationshipRequest: () => {},
  following: false,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EducatorDetail);