import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import './styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFilter,
  faPlus,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

function Filter({
  inputText,
  placeholder,
  handleAddFilter,
  handleRemoveFilter,
  handleFilterChange,
  activeFilters
}) {
  function onAddFilter(e) {
    e.preventDefault();
    e.stopPropagation();
    handleAddFilter();
  }

  function onFilterChange(e) {
    handleFilterChange(e.target.value);
  }

  return (
    <div className="Filter" data-testid="filter">
      {!!activeFilters &&
        <div className="Filter__items">
          {activeFilters.map(filter => (
            <FilterItem 
              filter={filter}
              handleRemoveFilter={handleRemoveFilter}
              key={filter}
            />
          ))}
        </div>
      }
      <form onSubmit={onAddFilter} className="Filter__form">
        <FontAwesomeIcon icon={faFilter} className="Filter__icon"/>
        <input
          type="text"
          name="filter"
          value={inputText}
          aria-label="filter"
          placeholder={placeholder}
          onChange={onFilterChange}
          required
          className="Filter__input"
        />
        <Button
          type="submit"
          classes="Button_style_blank Filter__submit-button"
        >
          <FontAwesomeIcon icon={faPlus} className="Filter__icon"/>
        </Button>
      </form>
    </div>
  )
}

Filter.propTypes = {
  classes: PropTypes.string,
  inputText: PropTypes.string,
  placeholder: PropTypes.string,
  handleAddFilter: PropTypes.func,
  handleRemoveFilter: PropTypes.func,
  handleFilterChange: PropTypes.func,
  activeFilters: PropTypes.arrayOf(PropTypes.string)
}

Filter.defaultProps = {
  classes: '',
  inputText: '',
  placeholder: 'Follow courses',
  handleAddFilter: () => {},
  handleRemoveFilter: () => {},
  handleFilterChange: () => {},
  activeFilters: []
}

export default Filter;

export function FilterItem({ filter, handleRemoveFilter }) {
  function onRemoveFilter() {
    handleRemoveFilter(filter);
  }

  return (
    <Button
      classes="Filter__item Button_style_empty"
      dataTestId="active-filter"
      onClick={onRemoveFilter}
      key={filter}
    >
      <span className="Filter__text">{filter}</span>
      <span className="Filter__close">
        <FontAwesomeIcon icon={faTimes} className="Filter__icon"/>
      </span>
    </Button>
  )
}

FilterItem.propTypes = {
  filter: PropTypes.string,
  handleRemoveFilter: PropTypes.func
}

FilterItem.defaultProps = {
  filter: '',
  handleRemoveFilter: () => {}
}