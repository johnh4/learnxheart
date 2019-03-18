import React from 'react';
import PropTypes from 'prop-types';
import {
  faHeart
} from '@fortawesome/free-solid-svg-icons';
import {
  FontAwesomeIcon
} from '@fortawesome/react-fontawesome';
import './styles.scss';

export default function Footer({ classes }) {
  return (
    <div className={`Footer ${classes}`}>
      <div className="Footer__attributions">
        <div>
          Illustrations by <a href="http://undraw.co" title="undraw.co">undraw.co</a> and <a href="http://www.humaaans.com" title="Humaaans">Humaaans</a>
        </div>
        <div>
          Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="http://www.flaticon.com" title="Freepik">Flaticon</a>
        </div>
      </div>
      <div className="Footer__heart">
        Made with <FontAwesomeIcon icon={faHeart} className="Footer__heart-icon"/> by&nbsp;
        <a
          href="http://www.linkedin.com/in/johnhowlett4"
          title="Freepik"
        >
          John Howlett
        </a>
      </div>
    </div>
  );
}

Footer.propTypes = {
  classes: PropTypes.string
}

Footer.defaultProps = {
  classes: ''
}
