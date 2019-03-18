import React from 'react';
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

export class BrowseEducators extends React.Component {
  constructor(props) {
    super(props);
    this.renderEducatorListItem = this.renderEducatorListItem.bind(this);
    this.renderFilter = this.renderFilter.bind(this);
    this.handleAddFilter = this.handleAddFilter.bind(this);
    this.handleRemoveFilter = this.handleRemoveFilter.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.state = { filterInputText: '' }
  }

  componentDidMount() {
    this.props.loadEducatorsRequest();
  }

  renderEducatorListItem(educatorId) {
    return <EducatorListItem educatorId={educatorId} />;
  }

  renderFilter() {
    const { educatorFilters } = this.props;
    return <Filter
              classes="List__filter BrowseEducators__filter"
              inputText={this.state.filterInputText}
              placeholder="Filter educators"
              handleAddFilter={this.handleAddFilter}
              handleRemoveFilter={this.handleRemoveFilter}
              handleFilterChange={this.handleFilterChange}
              activeFilters={educatorFilters}
            />;
  }

  handleAddFilter() {
    const { addEducatorFilter } = this.props;
    addEducatorFilter(this.state.filterInputText);
    this.setState(() => ({ filterInputText: '' }));
  }

  handleRemoveFilter(filter) {
    const { removeEducatorFilter } = this.props;
    removeEducatorFilter(filter);
  }

  handleFilterChange(text) {
    this.setState(() => ({ filterInputText: text }));
  }

  render() {
    const { educatorIds, match } = this.props;
    const routes = {
      detail: <Route path={`${match.url}/:educatorId`} component={EducatorDetail} />,
      empty: <Route exact path={`${match.url}`} component={EducatorDetailEmpty} />
    };

    return (
      <BrowsableIndex
        dataTestId="browse-educators"
        itemIds={educatorIds}
        renderListItem={this.renderEducatorListItem}
        routes={routes}
        renderFilter={this.renderFilter}
      />
    )
  }
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