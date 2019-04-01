import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import {
  selectCourseFilters,
  selectFilteredEducators
} from '../../selectors/views';
import { loadEducatorsRequest } from '../../actions/educators';
import {
  addCourseFilter,
  removeCourseFilter
} from '../../actions/views';
import Filter from '../../components/Filter';
import BrowsableIndex from '../../components/BrowsableIndex';
import EducatorListItem from './EducatorListItem';
import EducatorDetail from '../EducatorDetail';
import EducatorDetailEmpty from './EducatorDetailEmpty';

export function BrowseEducators({
  educatorIds,
  educatorFilters,
  loadEducatorsRequest,
  addEducatorFilter,
  removeEducatorFilter,
  match
}) {

  const [filterInputText, setFilterInputText] = useState('');

  useEffect(()=> {
    loadEducatorsRequest();
  }, []);

  function renderEducatorListItem(educatorId) {
    return <EducatorListItem educatorId={educatorId} />;
  }

  function renderFilter() {
    return <Filter
              classes="List__filter BrowseEducators__filter"
              inputText={filterInputText}
              placeholder="Filter educators"
              handleAddFilter={handleAddFilter}
              handleRemoveFilter={handleRemoveFilter}
              handleFilterChange={handleFilterChange}
              activeFilters={educatorFilters}
            />;
  }

  function handleAddFilter() {
    addEducatorFilter(filterInputText);
    setFilterInputText('');
  }

  function handleRemoveFilter(filter) {
    removeEducatorFilter(filter);
  }

  function handleFilterChange(text) {
    setFilterInputText(text);
  }

  const routes = {
    detail: <Route path={`${match.url}/:educatorId`} component={EducatorDetail} />,
    empty: <Route exact path={`${match.url}`} component={EducatorDetailEmpty} />
  };

  return (
    <BrowsableIndex
      dataTestId="browse-educators"
      itemIds={educatorIds}
      renderListItem={renderEducatorListItem}
      routes={routes}
      renderFilter={renderFilter}
    />
  )
}

BrowseEducators.propTypes = {
  educatorIds: PropTypes.arrayOf(PropTypes.number),
  match: PropTypes.object.isRequired,
  loadEducatorsRequest: PropTypes.func,
  addEducatorFilter: PropTypes.func,
  removeEducatorFilter: PropTypes.func,
  educatorFilters: PropTypes.arrayOf(PropTypes.string),
}

BrowseEducators.defaultProps = {
  educatorIds: [],
  educatorFilters: [],
  loadEducatorsRequest: () => {},
  addEducatorFilter: () => {},
  removeEducatorFilter: () => {},
}

const mapStateToProps = (state) => ({
  educatorIds: selectFilteredEducators(state),
  educatorFilters: selectCourseFilters(state)
});

const mapDispatchToProps = ({
  loadEducatorsRequest: loadEducatorsRequest,
  addEducatorFilter: addCourseFilter,
  removeEducatorFilter: removeCourseFilter
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BrowseEducators);