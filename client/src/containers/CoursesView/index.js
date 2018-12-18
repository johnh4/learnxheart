import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import { connect } from 'react-redux';
import CardSection from '../../components/CardSection';
import CourseCard from '../../components/CourseCard';
import Filter from '../../components/Filter';
import PageHeader from '../../components/PageHeader';
import LinkButton from '../../components/LinkButton';
import Section from '../../components/Section';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faStickyNote } from '@fortawesome/free-solid-svg-icons';
import { loadCoursesRequest } from '../../actions/courses';
import {
  addCourseFilter,
  removeCourseFilter
} from '../../actions/views';
import {
  selectCourseFilters,
  selectFilteredCourses,
  selectFilteredCoursesCurrentStudentIsFollowing
} from '../../selectors/views';

export class CoursesView extends React.Component {
  componentDidMount() {
    this.props.loadCoursesRequest();
  }

  render() {
    const {
      courseIds,
      tab,
      addCourseFilter,
      removeCourseFilter,
      courseFilters
    } = this.props;

    return (
      <CoursesViewComponent
        courseIds={courseIds}
        tab={tab}
        addCourseFilter={addCourseFilter}
        removeCourseFilter={removeCourseFilter}
        courseFilters={courseFilters}
      />
    )
  }
}

CoursesView.propTypes = {
  courseIds: PropTypes.arrayOf(PropTypes.number),
  tab: PropTypes.string.isRequired,
  addCourseFilter: PropTypes.func,
  removeCourseFilter: PropTypes.func,
  courseFilters: PropTypes.arrayOf(PropTypes.string)
}

CoursesView.defaultProps = {
  courseIds: [],
  addCourseFilter: () => {},
  removeCourseFilter: () => {},
  courseFilters: [],
}

const mapStateToProps = (state, ownProps) => {
  const courseIds = ownProps.tab === "My Courses"
    ? selectFilteredCoursesCurrentStudentIsFollowing(state, ownProps)
    : selectFilteredCourses(state)

  return {
    courseIds,
    courseFilters: selectCourseFilters(state)
  }
};

const mapDispatchToProps = {
  loadCoursesRequest,
  addCourseFilter,
  removeCourseFilter
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesView);


export class CoursesViewComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddFilter = this.handleAddFilter.bind(this);
    this.handleRemoveFilter = this.handleRemoveFilter.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.state = { filterInputText: '' };
  }

  handleAddFilter() {
    const { addCourseFilter } = this.props;
    addCourseFilter(this.state.filterInputText);
    this.setState(() => ({ filterInputText: '' }));
  }

  handleRemoveFilter(filter) {
    const { removeCourseFilter } = this.props;
    removeCourseFilter(filter);
  }

  handleFilterChange(text) {
    this.setState(() => ({ filterInputText: text }));
  }

  render() {
    const { courseIds, tab, classes, courseFilters } = this.props;

    const dataTestId = tab === 'Browse Courses'
      ? 'browse-courses-view'
      : 'my-courses-view'

    const myCoursesNotice = {
      noticeText: "Find great courses to follow",
      linkPath: "browse",
      linkText: "Browse Courses"
    }

    const smallIcons = [
      {
        icon: <FontAwesomeIcon icon={faBook} />,
        label: courseIds.length,
        key: 'courses-icon'
      },
      {
        icon: <FontAwesomeIcon icon={faStickyNote} />,
        label: 40,
        key: 'decks-icon'
      }
    ];
    const courseLink = tab === 'My Courses'
      ? <LinkButton to="/courses/browse">Browse Courses</LinkButton>
      : <LinkButton to="/courses">My Courses</LinkButton>
    const buttons = [
      {
        button: <LinkButton to="/study">Study Now</LinkButton>,
        key: 'study-button'
      },
      {
        button: courseLink,
        key: 'course-link'
      }
    ];
    const message = 'You have 5 important tasks today, some messages and notification. Finish them all! Or, you can also Edit Task.';

    const filter = (
      <Filter
        classes="CoursesView__filter"
        inputText={this.state.filterInputText}
        placeholder="Filter courses"
        handleAddFilter={this.handleAddFilter}
        handleRemoveFilter={this.handleRemoveFilter}
        handleFilterChange={this.handleFilterChange}
        activeFilters={courseFilters}
      />
    );

    return (
      <div className="CoursesView" data-testid={dataTestId}>
        <PageHeader
          mainIcon={<FontAwesomeIcon icon={faBook} />}
          smallIcons={smallIcons}
          title={tab}
          message={message}
          buttons={buttons}
          classes="CoursesView__page-header"
        />

        <Section
          headerText="Courses"
          headerItem={filter}
        >
          <CardSection
            entityIds={courseIds}
            classes={`CoursesView__card-section ${classes}`}
            dataTestId={dataTestId}
            renderCard={(courseId) => (
              <CourseCard
                key={courseId}
                courseId={courseId}
                size="m"
                classes="CardSection__card"
              />
            )}
            emptyNotice={tab === "My Courses" ? myCoursesNotice : null}
          />
        </Section>
      </div>
    )
  }
}

CoursesViewComponent.propTypes = {
  courseIds: PropTypes.arrayOf(PropTypes.number),
  tab: PropTypes.string,
  classes: PropTypes.string,
  addCourseFilter: PropTypes.func,
  removeCourseFilter: PropTypes.func,
  courseFilters: PropTypes.arrayOf(PropTypes.string)
}

CoursesViewComponent.defaultProps = {
  courseIds: [],
  tab: "My Courses",
  classes: "",
  addCourseFilter: () => {},
  removeCourseFilter: () => {},
  courseFilters: []
}
