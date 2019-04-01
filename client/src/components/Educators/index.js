import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { selectThing, toggleSelect } from '../../reducers/views';
import { loadEducatorsRequest, loadEducatorRequest } from '../../actions/educators';
import { signInRequest, signOutRequest } from '../../actions/sessions';
import { getEducators, getEducatorIds } from '../../reducers/educators';
import { currentUser, userSignedIn } from '../../selectors/sessions';

function Educators({
  loadEducatorsRequest,
  loadEducatorRequest,
  educatorIds,
  educators,
  signInRequest,
  currentUser,
  userSignedIn,
  signOutRequest,
}) {

  useEffect(() => {
    getEducators();
  }, []);

  const handleGetEducators = () => {
    getEducators();
  }

  const handleGetEducator = () => {
    getEducator("1");
  }

  const handleSignIn = () => {
    signInRequest("jehowl4+educator@gmail.com", "password");
  }

  const handleSignOut = () => {
    signOutRequest(currentUser);
  }

  function getEducators() {
    loadEducatorsRequest();
  }

  function getEducator(educatorId) {
    loadEducatorRequest(educatorId);
  }

  function renderEducators() {
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

  return (
    <div data-testid="educators-view">
      <div onClick={handleSignIn}>
        { !userSignedIn &&
          <span>Sign in</span>
        }
      </div>
      <div>
        { userSignedIn &&
          <span onClick={handleSignOut}>Sign Out</span>
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
      <div onClick={handleGetEducators}>
        Get Educators
      </div>
      <div onClick={handleGetEducator}>
        Get Educator 1
      </div>
      <div>
        { educatorIds.length > 0
          ? renderEducators()
          : <div>There aren't any Educators yet.</div>
        }
      </div>
    </div>
  );
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
