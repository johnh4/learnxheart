import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import { connect } from 'react-redux';
import {
  selectCourseByCourseIdProp
} from '../../selectors/courses';
import {
  selectEducatorNameByCourseIdProp
} from '../../selectors/educators';
import DetailCard from '../../components/DetailCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStickyNote } from '@fortawesome/free-regular-svg-icons';
import { faUser, faPlus } from '@fortawesome/free-solid-svg-icons';

export class CourseDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { course, educatorName } = this.props;

    return (
      <DetailCard
        classes="CourseDetail"
        dataTestId={`course-detail-${course.id}`}
      >
        <div className="CourseDetail__header">
          <div className="CourseDetail__educator-name">
            by {educatorName}
          </div>
          <div className="CourseDetail__follow-button LightButton">
            <FontAwesomeIcon icon={faPlus} className="LightButton__icon"/>
            <span className="LightButton__text">FOLLOW</span>
          </div>
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
}

const mapStateToProps = (state, ownProps) => ({
  course: selectCourseByCourseIdProp(state, ownProps.match.params),
  educatorName: selectEducatorNameByCourseIdProp(state, ownProps.match.params),
});

CourseDetail.propTypes = {
  course: PropTypes.object,
  educatorName: PropTypes.string
}

CourseDetail.defaultProps = {
  course: {},
  educatorName: ''
}

export default connect(mapStateToProps)(CourseDetail);