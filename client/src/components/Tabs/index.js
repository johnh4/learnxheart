import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './styles.scss';

export function Tabs({ activeTab, tabs, classes, dataTestId }) {
  return (
    <div className={`Tabs ${classes}`} data-testid={dataTestId}>
      {tabs.map(tab => (
        <Link
          key={tab.name}
          to={tab.path}
          className={`Tabs__tab ${activeTab === tab.name ? 'Tab_active' : ''}`}
        >
          {tab.name}
        </Link>
      ))}
    </div>
  )
}

Tabs.propTypes = {
  activeTab: PropTypes.string,
  tabs: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired
  })),
  classes: PropTypes.string,
  dataTestId: PropTypes.string
}

Tabs.defaultProps = {
  activeTab: "",
  tabs: [],
  classes: "",
  dataTestId: ""
}

export default Tabs;