import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { connect } from 'react-redux';
import './styles.scss';
import '../../components/App/App.scss';
import { signOutRequest } from '../../actions/sessions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStickyNote, faCheckSquare, faUser, } from '@fortawesome/free-regular-svg-icons';
import { faBoxes, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';
import {
  userSignedIn,
  educatorSignedIn,
  studentSignedIn,
  currentUser,
  currentUserName
} from '../../selectors/sessions';

export function Header(props) {
  const {
    userSignedIn,
    currentUser,
    signOutRequest,
    studentSignedIn,
    educatorSignedIn
  } = props;
  let { classes } = props;

  const handleSignOut = () => {
    signOutRequest(currentUser);
  }

  const signedInContent = () => {
    return (
      <React.Fragment>
        <div className='Header__user-name user-name'>
          {currentUser.firstName}
        </div>
        { educatorSignedIn &&
          <FontAwesomeIcon
            icon={faChalkboardTeacher}
            className='Header__icon'
            data-testid='educator-header-icon'
          />
        }
        { studentSignedIn &&
          <FontAwesomeIcon
            icon={faUser}
            className='Header__icon'
            data-testid='student-header-icon'
          />
        }
        <Link to='#' className='Link sign-out' onClick={handleSignOut} data-testid='header-sign-out'>
            Sign Out
        </Link>
      </React.Fragment>
    )
  }

  return (
    <header className={`Header ${classes}`} data-testid='header'>
      <div className='Header__brand'>
        <Link to='/' className='Link'>Learn X Heart</Link>
      </div>

      <ul className='Header__nav Nav'>
        <li className='Nav__item'>
          <Link to='/educators' className='Link Nav__link'>
            <FontAwesomeIcon icon={faChalkboardTeacher} className='Nav__icon' />
            Educators
          </Link>
        </li>
        <li className='Nav__item'>
          <Link to='/courses' className='Link Nav__link'>
            <FontAwesomeIcon icon={faBoxes} className='Nav__icon' />
            Courses
          </Link>
        </li>
        <li className='Nav__item'>
          <Link to='/decks' className='Link Nav__link'>
            <FontAwesomeIcon icon={faStickyNote} className='Nav__icon' />
            Decks
          </Link>
        </li>
        <li className='Nav__item'>
          <Link to='/study' className='Link Nav__link'>
            <FontAwesomeIcon icon={faCheckSquare} className='Nav__icon' />
            Study
          </Link>
        </li>
      </ul>

      <div className='Header__session'>
        { userSignedIn === true
          ? signedInContent()
          : <Link to='/sign-in' className='Link sign-in'>Sign In</Link>
        }
      </div>
    </header>
  )
}

Header.propTypes = {
  userSignedIn: PropTypes.bool,
  educatorSignedIn: PropTypes.bool,
  studentSignedIn: PropTypes.bool,
  currentUserName: PropTypes.string,
  currentUser: PropTypes.object,
  signOutRequest: PropTypes.func
}

Header.defaultProps = {
  userSignedIn: false,
  educatorSignedIn: false,
  studentSignedIn: false,
  currentUserName: null,
  currentUser: null,
  classes: ""
}

const mapStateToProps = (state) => ({
  userSignedIn: userSignedIn(state),
  educatorSignedIn: educatorSignedIn(state),
  studentSignedIn: studentSignedIn(state),
  currentUserName: currentUserName(state),
  currentUser: currentUser(state)
});

const mapDispatchToProps = {
  signOutRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);