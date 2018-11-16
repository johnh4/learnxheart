import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import { connect } from 'react-redux';
import CardSection from '../../components/CardSection';
import CourseCard from '../../components/CourseCard';
import Filter from '../../components/Filter';
import Tabs from '../../components/Tabs';
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

    const tabs = [
      { name: "My Courses", path: "/courses" },
      { name: "Browse Courses", path: "/courses/browse" }
    ];

    const myCoursesNotice = {
      noticeText: "Find great courses to follow",
      linkPath: "browse",
      linkText: "Browse Courses"
    }

    return (
      <div className="CoursesView" data-testid={dataTestId}>
        <div className="CoursesView__header">
          <Tabs
            activeTab={tab}
            tabs={tabs}
            classes="CoursesView__tabs"
            dataTestId="courses-view-tabs"
          />
          <Filter
            classes="CoursesView__filter"
            inputText={this.state.filterInputText}
            placeholder="Filter courses"
            handleAddFilter={this.handleAddFilter}
            handleRemoveFilter={this.handleRemoveFilter}
            handleFilterChange={this.handleFilterChange}
            activeFilters={courseFilters}
          />
        </div>

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
