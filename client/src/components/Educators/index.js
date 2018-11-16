import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectThing, toggleSelect } from '../../reducers/views';
import { loadEducatorsRequest, loadEducatorRequest } from '../../actions/educators';
import { signInRequest, signOutRequest } from '../../actions/sessions';
import { getEducators, getEducatorIds } from '../../reducers/educators';
import { currentUser, userSignedIn } from '../../reducers/sessions';

class Educators extends Component {
  componentDidMount() {
    this.getEducators();
  }

  handleGetEducators = () => {
    this.getEducators();
  }

  handleGetEducator = () => {
    this.getEducator("1");
  }

  handleSignIn = () => {
    this.props.signInRequest("jehowl4+educator@gmail.com", "password");
  }

  handleSignOut = () => {
    const { currentUser, signOutRequest } = this.props;
    signOutRequest(currentUser);
  }

  async getEducators() {
    this.props.loadEducatorsRequest();
  }

  async getEducator(educatorId) {
    this.props.loadEducatorRequest(educatorId);
  }

  renderEducators() {
    const { educatorIds, educators } = this.props;

    return (
      <div>
        Educator count: {educators.length}
        { educatorIds.map((educatorId) => {
            const educator = educators[educatorId];

            return (
              <div key={educator.id}>
                <div>
                  email: {educator.email}
                </div>
                <div>
                  name: {`${educator.firstName} ${educator.lastName}`}
                </div>
              </div>
            )
            }
          )}
      </div>
    )
  }

  render() {
    const { educatorIds, currentUser, userSignedIn } = this.props;

    return (
      <div data-testid="educators-view">
        <div onClick={this.handleSignIn}>
          { !userSignedIn &&
            <span>Sign in</span>
          }
        </div>
        <div>
          { userSignedIn &&
            <span onClick={this.handleSignOut}>Sign Out</span>
          }
        </div>
        <div>
          { !userSignedIn
              ? <div>Not signed in.</div>
              : <div>
                  Signed in as {`${currentUser.firstName} ${currentUser.lastName}`}.
                </div>
          }
        </div>
        <div onClick={this.handleGetEducators}>
          Get Educators
        </div>
        <div onClick={this.handleGetEducator}>
          Get Educator 1
        </div>
        <div>
          { educatorIds.length > 0
            ? this.renderEducators()
            : <div>There aren't any Educators yet.</div>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  selected: state.views.selected,
  educators: getEducators(state),
  educatorIds: getEducatorIds(state),
  currentUser: currentUser(state),
  userSignedIn: userSignedIn(state)
});

export default connect(mapStateToProps, {
  selectThing,
  toggleSelect,
  loadEducatorsRequest,
  loadEducatorRequest,
  signInRequest,
  signOutRequest
})(Educators);
