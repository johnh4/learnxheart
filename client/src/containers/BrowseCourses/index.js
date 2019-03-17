import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import {
  selectCourseFilters,
  selectFilteredCourses
} from '../../selectors/views';
import { loadCoursesRequest } from '../../actions/courses';
import {
  addCourseFilter,
  removeCourseFilter
} from '../../actions/views';
import Filter from '../../components/Filter';
import BrowsableIndex from '../../components/BrowsableIndex';
import CourseListItem from './CourseListItem';
import CourseDetail from '../CourseDetail';
import CourseDetailEmpty from './CourseDetailEmpty';

export class BrowseCourses extends React.Component {
  constructor(props) {
    super(props);
    this.renderCourseListItem = this.renderCourseListItem.bind(this);
    this.renderFilter = this.renderFilter.bind(this);
    this.handleAddFilter = this.handleAddFilter.bind(this);
    this.handleRemoveFilter = this.handleRemoveFilter.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.state = { filterInputText: '' }
  }

  componentDidMount() {
    this.props.loadCoursesRequest();
  }

  renderCourseListItem(courseId) {
    return <CourseListItem courseId={courseId} />;
  }

  renderFilter() {
    const { courseFilters } = this.props;
    return <Filter
              classes="List__filter BrowseCourses__filter"
              inputText={this.state.filterInputText}
              placeholder="Filter courses"
              handleAddFilter={this.handleAddFilter}
              handleRemoveFilter={this.handleRemoveFilter}
              handleFilterChange={this.handleFilterChange}
              activeFilters={courseFilters}
            />;
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
    const { courseIds, match, courseFilters } = this.props;
    const routes = {
      detail: <Route path={`${match.url}/:courseId`} component={CourseDetail} />,
      empty: <Route exact path={`${match.url}`} component={CourseDetailEmpty} />
    };

    return (
      <BrowsableIndex
        dataTestId="browse-courses"
        itemIds={courseIds}
        renderListItem={this.renderCourseListItem}
        routes={routes}
        renderFilter={this.renderFilter}
      />
    )
  }
}

BrowseCourses.propTypes = {
  courseIds: PropTypes.arrayOf(PropTypes.number),
  match: PropTypes.object.isRequired,
  loadCoursesRequest: PropTypes.func,
  addCourseFilter: PropTypes.func,
  removeCourseFilter: PropTypes.func,
  courseFilters: PropTypes.arrayOf(PropTypes.string),
}

BrowseCourses.defaultProps = {
  courseIds: [],
  courseFilters: [],
  loadCoursesRequest: () => {},
  addCourseFilter: () => {},
  removeCourseFilter: () => {},
}

const mapStateToProps = (state) => ({
  courseIds: selectFilteredCourses(state),
  courseFilters: selectCourseFilters(state)
});

const mapDispatchToProps = ({
  loadCoursesRequest: loadCoursesRequest,
  addCourseFilter: addCourseFilter,
  removeCourseFilter: removeCourseFilter
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BrowseCourses);