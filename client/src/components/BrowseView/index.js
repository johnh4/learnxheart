import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import { NavLink, Switch, Route } from 'react-router-dom';
import BrowseCourses from '../../containers/BrowseCourses';
import BrowseEducators from '../../containers/BrowseEducators';
import BrowseIndexEmpty from './BrowseIndexEmpty';

function BrowseView({ match }) {
  return (
    <div className="BrowseView" data-testid="browse-view">
      <div className="PageHeader BrowseView__page-header">
        <div className="PageHeader__headings">
          <h1 className="PageHeader__headline">Browse</h1>
          <h6 className="PageHeader__subtext">
            Find the right Educator. Find the right Course.
          </h6>
        </div>
        <div
          className="PageHeader__content BrowseView__browse-links"
          data-testid="browse-links"
        >
          <NavLink
            to={`${match.url}/courses`}
            className="BrowseView__browse-link"
          >
            Courses
          </NavLink>
          <NavLink
            to={`${match.url}/educators`}
            className="BrowseView__browse-link"
          >
            Educators
          </NavLink>
        </div>
      </div>

      <section className="BrowseView__browse-section">
        <Switch>
          <Route path={`${match.url}/courses`} component={BrowseCourses} />
          <Route path={`${match.url}/educators`} component={BrowseEducators} />
          <Route component={BrowseIndexEmpty} />
        </Switch>
      </section>
    </div>
  )
}

BrowseView.propTypes = {
  match: PropTypes.object
}

BrowseView.defaultProps = {
  match: {}
}

export default BrowseView;