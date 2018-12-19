import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import { Switch } from 'react-router-dom';

function BrowsableIndex({
  itemIds,
  renderListItem,
  routes,
  renderFilter,
  classes,
  dataTestId
}) {
  return (
    <div className="BrowsableIndex" data-testid={dataTestId}>
      <ul className="BrowsableIndex__list List">
        {renderFilter()}
        {itemIds.length > 0
          ? itemIds.map(itemId =>
              <li className="List__item" key={itemId}>
                {renderListItem(itemId)}
              </li>
            )
          : <div>No items :(</div>
        }
      </ul>
      <div className="BrowsableIndex__detail Detail">
        <Switch>
          {routes.detail}
          {routes.empty}
        </Switch>
      </div>
    </div>
  )
}

BrowsableIndex.propTypes = {
  itemIds: PropTypes.arrayOf(PropTypes.number),
  routes: PropTypes.shape({
    detail: PropTypes.object,
    empty: PropTypes.object
  }),
  renderListItem: PropTypes.func,
  renderFilter: PropTypes.func
}

BrowsableIndex.defaultProps = {
  itemIds: [],
  routes: {},
  renderListItem: () => {},
  renderFilter: () => {}
}

export default BrowsableIndex;