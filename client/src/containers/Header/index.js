import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './styles.scss';
import '../../components/App/App.scss';
import { signOutRequest } from '../../actions/sessions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStickyNote, faCheckSquare, faUser, } from '@fortawesome/free-regular-svg-icons';
import { faBoxes, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';
import { slide as Menu } from 'react-burger-menu';
import Media from 'react-media';
import {
  userSignedIn,
  educatorSignedIn,
  studentSignedIn,
  currentUser,
  currentUserName
} from '../../selectors/sessions';

export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.state = { menuOpen: false };
  }

  handleSignOut() {
    const { signOutRequest, currentUser } = this.props;
    signOutRequest(currentUser);
  }

  closeMenu() {
    this.setState(() => ({ menuOpen: false }));
  }

  render() {
    const {
      userSignedIn,
      currentUser,
      studentSignedIn,
      educatorSignedIn,
      classes
    } = this.props;

    return (
      <React.Fragment>
        <Media query="(min-width: 768px)">
          {matches =>
            matches
              ? <DesktopHeader
                  classes={classes}
                  userSignedIn={userSignedIn}
                  currentUser={currentUser}
                  studentSignedIn={studentSignedIn}
                  educatorSignedIn={educatorSignedIn}
                  handleSignOut={this.handleSignOut}
                />
              : <MobileHeader
                  menuOpen={this.state.menuOpen}
                  closeMenu={this.closeMenu}
                />
          }
        </Media>
      </React.Fragment>
    )
  }
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


function DesktopHeader({
  classes,
  userSignedIn,
  currentUser,
  studentSignedIn,
  educatorSignedIn,
  handleSignOut
}) {
  function signedInContent() {
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
    <header className={`Header Header__desktop ${classes}`} data-testid='header'>
      <Link to='/' className='Link Header__brand'>
        <span className='BrandIcon Header__brand-icon'></span>
        <span className='Header__brand-text'>learnxheart</span>
      </Link>

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
          <Link to='/courses/browse' className='Link Nav__link'>
            <FontAwesomeIcon icon={faBoxes} className='Nav__icon' />
            Browse
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

DesktopHeader.propTypes = {
  classes: PropTypes.string,
  userSignedIn: PropTypes.bool,
  currentUser: PropTypes.object,
  studentSignedIn: PropTypes.bool,
  educatorSignedIn: PropTypes.bool
}

function MobileHeader({ menuOpen, closeMenu }) {
  return (
    <Menu isOpen={menuOpen} className="Header__mobile">
      <Link to='/' className='Link menu-item' onClick={closeMenu}>
        Learn X Heart
      </Link>
      <Link to='/educators' className='Link Nav__link' onClick={closeMenu}>
        <FontAwesomeIcon icon={faChalkboardTeacher} className='Nav__icon' />
        Educators
      </Link>
      <Link to='/courses' className='Link Nav__link' onClick={closeMenu}>
        <FontAwesomeIcon icon={faBoxes} className='Nav__icon' />
        Courses
      </Link>
      <Link to='/decks' className='Link Nav__link' onClick={closeMenu}>
        <FontAwesomeIcon icon={faStickyNote} className='Nav__icon' />
        Decks
      </Link>
      <Link to='/study' className='Link Nav__link' onClick={closeMenu}>
        <FontAwesomeIcon icon={faCheckSquare} className='Nav__icon' />
        Study
      </Link>
    </Menu>
  );
}

MobileHeader.propTypes = {
  menuOpen: PropTypes.bool,
  closeMenu: PropTypes.func
}

MobileHeader.defaultProps = {
  menuOpen: false,
  closeMenu: () => {}
}