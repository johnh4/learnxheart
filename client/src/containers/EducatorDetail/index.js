import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import { connect } from 'react-redux';
import {
  selectEducatorByEducatorIdProp
} from '../../selectors/educators';
import {
  selectCourseIdsByEducatorIdProp
} from '../../selectors/courses';
import { loadEducatorRequest } from '../../actions/educators';
import DetailCard from '../../components/DetailCard';
import CourseListItem from '../../containers/BrowseCourses/CourseListItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStickyNote } from '@fortawesome/free-regular-svg-icons';
import { faUser, faPlus } from '@fortawesome/free-solid-svg-icons';

export class EducatorDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {
      loadEducatorRequest,
      match: { params: { educatorId } }
    } = this.props;
    console.log('this.props.match', this.props.match);
    loadEducatorRequest(educatorId);
  }

  componentDidUpdate(prevProps) {
    const {
      loadEducatorRequest,
      match: { params: { educatorId } }
    } = this.props;
    if(educatorId !== prevProps.match.params.educatorId) {
      loadEducatorRequest(educatorId);
    }
  }

  render() {
    const { educator, courseIds  } = this.props;
    console.log('educator in render', educator);
    const educatorName = `${educator.firstName} ${educator.lastName}`;

    return (
      <DetailCard
        classes="EducatorDetail"
        dataTestId={`educator-detail-${educator.id}`}
      >
        <div className="EducatorDetail__header">
          <div className="EducatorDetail__educator-name">
            by {educatorName}
          </div>
          <div className="EducatorDetail__follow-button LightButton">
            <FontAwesomeIcon icon={faPlus} className="LightButton__icon"/>
            <span className="LightButton__text">FOLLOW</span>
          </div>
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
}

const mapStateToProps = (state, ownProps) => ({
  educator: selectEducatorByEducatorIdProp(state, ownProps.match.params),
  courseIds: selectCourseIdsByEducatorIdProp(state, ownProps.match.params)
});

EducatorDetail.propTypes = {
  educator: PropTypes.object,
  courseIds: PropTypes.arrayOf(PropTypes.string),
  loadEducatorRequest: PropTypes.func
}

EducatorDetail.defaultProps = {
  educator: {},
  courseIds: [],
  loadEducatorRequest: () => {}
}

export default connect(
  mapStateToProps,
  { loadEducatorRequest }
)(EducatorDetail);

function CourseItem({ courseId }) {
  return (
    <div>
      {courseId}
    </div>
  )
}

CourseItem.propTypes = {
  courseId: PropTypes.number
}

CourseItem.defaultProps = {
  courseId: null
}
