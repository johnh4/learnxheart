import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from '../Card';
import './styles.scss';
import Button from '../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStickyNote } from '@fortawesome/free-regular-svg-icons';
import { selectEducatorNameByCourseIdProp } from '../../selectors/educators';
import { selectCourseByCourseIdProp, } from '../../selectors/courses';
import { selectStudentIsFollowingCourse } from '../../selectors/students';
import {
  faUser,
  faAngleDown,
  faAngleUp
} from '@fortawesome/free-solid-svg-icons';
import LinkButton from '../LinkButton';
import { currentUser } from '../../selectors/sessions';
import {
  createCourseStudentRelationshipRequest,
  destroyCourseStudentRelationshipRequest
} from '../../actions/courseStudentRelationships';
import {
  selectCsrIdFromCourseAndStudentIds
} from '../../selectors/courseStudentRelationships';

class CourseCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
    this.toggleContent = this.toggleContent.bind(this);
    this.handleFollow = this.handleFollow.bind(this);
    this.handleUnfollow = this.handleUnfollow.bind(this);
  }

  handleFollow() {
    const {
      courseId,
      currentUser,
      createCourseStudentRelationshipRequest
    } = this.props;
    const csr = { courseId, studentId: currentUser.id };
    createCourseStudentRelationshipRequest(csr);
  }

  handleUnfollow() {
    const { 
      destroyCourseStudentRelationshipRequest,
      courseStudentRelationshipId: csrId
    } = this.props;
    destroyCourseStudentRelationshipRequest(csrId);
  }

  toggleContent() {
    this.setState(prevState => ({ expanded: !prevState.expanded }));
  }

  render() {
    const { size, course, educatorName, following, classes } = this.props;
    const studentCount = 0;
    const cardCount = 0;

    return (
      <CourseCardComponent
        courseId={course.id}
        name={course.name}
        size={size}
        educatorName={educatorName}
        description={course.description}
        cardCount={cardCount}
        studentCount={studentCount}
        following={following}
        handleFollow={this.handleFollow}
        handleUnfollow={this.handleUnfollow}
        expanded={this.state.expanded}
        classes={classes}
        toggleExpandedContent={this.toggleContent}
        dataTestId="course-card"
      />
    )
  }
}

CourseCard.propTypes = {
  courseId: PropTypes.number.isRequired,
  size: PropTypes.string,
  currentUser: PropTypes.object,
  following: PropTypes.bool,
  courseStudentRelationshipId: PropTypes.number
}

const mapStateToProps = (state, ownProps) => ({
  educatorName: selectEducatorNameByCourseIdProp(state, ownProps),
  currentUser: currentUser(state),
  course: selectCourseByCourseIdProp(state, ownProps),
  following: selectStudentIsFollowingCourse(state, ownProps),
  courseStudentRelationshipId: selectCsrIdFromCourseAndStudentIds(state, ownProps)
});

const mapDispatchToProps = {
  createCourseStudentRelationshipRequest,
  destroyCourseStudentRelationshipRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseCard);


export function CourseCardComponent(props) {
  const {
    courseId,
    name,
    educatorName,
    description,
    cardCount,
    studentCount,
    size,
    following,
    handleFollow,
    handleUnfollow,
    toggleExpandedContent,
    classes,
    expanded,
    dataTestId
  } = props;

  function followButton() {
    return (
      <Button
        classes={`Button_size_default Button_style_raised CourseCard__button CourseCard__button_${size}`}
        type="submit"
        dataTestId="follow-button"
        onClick={handleFollow}
      >
        Follow
      </Button>
    )
  }

  function followingButton() {
    return (
      <Button
        classes={`Button_size_default Button_style_empty CourseCard__button CourseCard__button_${size}`}
        type="submit"
        dataTestId="following-button"
        onClick={handleUnfollow}
      >
        Following
      </Button>
    )
  }

  function renderCorrectButton() {
    if (following) {
      return followingButton();
    } else {
      return followButton();
    }
  }

  function handleToggle() {
    toggleExpandedContent();
  }

  return (
    <Card
      size={size}
      classes={`CourseCard ${classes}`}
      dataTestId={dataTestId}
    >
      <div className="CourseCard__main" onClick={handleToggle}>
        <div className="CourseCard__names">
          <div className="CourseCard__name">{name}</div>
          <div className="CourseCard__educator">{educatorName}</div>
        </div>
        <div className="CourseCard__details">
          <div className="CourseCard__icons">
            <FontAwesomeIcon icon={faStickyNote} className="CourseCard__icon"/>
            <FontAwesomeIcon icon={faUser} className="CourseCard__icon"/>
          </div>
          <div className="CourseCard__numbers">
            <div className="CourseCard__number">{cardCount}</div>
            <div className="CourseCard__number">{studentCount}</div>
          </div>
        </div>
      </div>
      <div className={`CourseCard__expanded-area ${expanded ? 'CourseCard__expanded-area_expanded' : ''}`}
      >
        <div className="CourseCard__description" onClick={handleToggle}>
          {description}
        </div>
        <div className="CourseCard__buttons">
          {renderCorrectButton()}
          <LinkButton to={`/courses/${courseId}`}>View</LinkButton>
        </div>
      </div>
      <div className="CourseCard__toggle" onClick={handleToggle}>
        {expanded
          ? <FontAwesomeIcon icon={faAngleUp} />
          : <FontAwesomeIcon icon={faAngleDown} />
        }
      </div>
    </Card>
  );
}

CourseCardComponent.propTypes = {
  courseId: PropTypes.number.isRequired,
  name: PropTypes.string,
  educatorName: PropTypes.string,
  description: PropTypes.string,
  cardCount: PropTypes.number,
  studentCount: PropTypes.number,
  size: PropTypes.oneOf(["s", "m"]),
  following: PropTypes.bool,
  handleFollow: PropTypes.func,
  handleUnfollow: PropTypes.func,
  toggleExpandedContent: PropTypes.func,
  classes: PropTypes.string,
  expanded: PropTypes.bool,
  dataTestId: PropTypes.string
}

CourseCardComponent.defaultProps = {
  name: '',
  educatorName: '',
  description: 'This course has no description',
  cardCount: 0,
  studentCount: 0,
  size: 'm',
  following: false,
  handleFollow: () => {},
  handleUnfollow: () => {},
  toggleExpandedContent: () => {},
  classes: '',
  expanded: false,
  dataTestId: ""
}