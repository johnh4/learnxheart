import React, { useState, useEffect } from 'react';
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

export function BrowseCourses({
  courseIds,
  courseFilters,
  loadCoursesRequest,
  addCourseFilter,
  removeCourseFilter,
  match
}) {

  const [filterInputText, setFilterInputText] = useState('');

  useEffect(() => {
    loadCoursesRequest();
  }, []);

  function renderCourseListItem(courseId) {
    return <CourseListItem courseId={courseId} />;
  };

  function renderFilter() {
    return <Filter
              classes="List__filter BrowseCourses__filter"
              inputText={filterInputText}
              placeholder="Filter courses"
              handleAddFilter={handleAddFilter}
              handleRemoveFilter={handleRemoveFilter}
              handleFilterChange={handleFilterChange}
              activeFilters={courseFilters}
            />;
  }

  function handleAddFilter() {
    addCourseFilter(filterInputText);
    setFilterInputText('');
  }

  function handleRemoveFilter(filter) {
    removeCourseFilter(filter);
  }

  function handleFilterChange(text) {
    setFilterInputText(text);
  }

  const routes = {
    detail: <Route path={`${match.url}/:courseId`} component={CourseDetail} />,
    empty: <Route exact path={`${match.url}`} component={CourseDetailEmpty} />
  };

  return (
    <BrowsableIndex
      dataTestId="browse-courses"
      itemIds={courseIds}
      renderListItem={renderCourseListItem}
      routes={routes}
      renderFilter={renderFilter}
    />
  )
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